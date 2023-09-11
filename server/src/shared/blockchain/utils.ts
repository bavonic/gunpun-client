import Web3 from "web3";
import web3EthAbi from 'web3-eth-abi';
import ERC165_ABI from "./abis/ERC165.json";
import ERC721_ABI from "./abis/ERC721.json";
import { chains } from "./chains";
import { Contract } from "./contracts/core";
import { BlockchainError, BlockchainErrorCode, ChainId, ContractActionType, SignTypedDataPayload, TokenType, TokenUriType, Transaction } from "./types";

export function parseBlockchainError(data: {
  type: ContractActionType,
  error: any,
  method: string,
  transactionHash?: string,
  web3?: Web3,
  wallet?: string,
  args?: string,
  contractName?: string,
  contractAddress?: string,
}) {
  const { error, transactionHash, web3, type, method, wallet, args } = data;
  let code: BlockchainErrorCode = BlockchainErrorCode.UNKNOW_ERROR;

  if (typeof error === 'object') {
    if (error.code === -32700) code = BlockchainErrorCode.INVALID_JSON_WAS_RECEIVED_BY_THE_SERVER;
    else if (error.code === -32600) code = BlockchainErrorCode.INVALID_PAYLOAD_REQUEST;
    else if (error.code === -32601) code = BlockchainErrorCode.METHOD_DOES_NOT_EXISTED_OR_NOT_AVAILBALE;
    else if (error.code === -32602) code = BlockchainErrorCode.INVALID_METHOD_PARAMETERS;
    else if (error.code === -32603) code = BlockchainErrorCode.INVALID_JSON_RPC_ERROR;
    else if (error.code === -32000) code = BlockchainErrorCode.INVALID_INPUT;
    else if (error.code === -32001) code = BlockchainErrorCode.RESOURCE_NOT_FOUND;
    else if (error.code === -32002) code = BlockchainErrorCode.RESOURCE_UNAVAILABLE;
    else if (error.code === -32003) code = BlockchainErrorCode.TRANSACTION_REJECTED;
    else if (error.code === -32004) code = BlockchainErrorCode.METHOD_NOT_SUPPORTED;
    else if (error.code === -32005) code = BlockchainErrorCode.REQUEST_LIMIT_EXCEEDED;
    else if (error.code === 4001) code = BlockchainErrorCode.USER_REJECTED;
    else if (error.code === 4100) code = BlockchainErrorCode.THE_REQUEST_ACCOUNT_OR_METHOD_HAS_NOT_BEEN_AUTHORIZED;
    else if (error.code === 4200) code = BlockchainErrorCode.THE_REQUEST_METHOD_IS_NOT_SUPPORTED_BY_THIS_ETHEREUM_PROVIDER;
    else if (error.code === 4900) code = BlockchainErrorCode.THE_PROVIDER_IS_DISCONNECTED_FROM_ALL_CHAINS;
    else if (error.code === 4901) code = BlockchainErrorCode.THE_PROVIDER_IS_DISCONNECTED_FROM_THE_SPECIFIED_CHAIN;
    else if (`${error.message}`.indexOf("not mined within 50 blocks") >= 0) code = BlockchainErrorCode.TRANSACTION_TIME_OUT;
    else if (`${error.message}`.indexOf("insufficient funds for gas * price + value") >= 0) code = BlockchainErrorCode.NOT_ENOUGH_BALANCE_FOR_GAS_FEE;
    else if (`${error.message}`.indexOf("Transaction has been reverted by the EVM") >= 0) code = BlockchainErrorCode.TRANSACTION_REVERTED_BY_THE_EVM;
    else if (`${error.message}`.indexOf("Transaction underpriced") >= 0) code = BlockchainErrorCode.TRANSACTION_UNDER_PRICED;
    else if (`${error.message}`.indexOf("nonce too low") >= 0) code = BlockchainErrorCode.NONCE_TOO_LOW;
    else if (
      `${error.message}`.indexOf("trouble connecting to the network") >= 0
      || `${error.message}`.indexOf("timeout") >= 0
      || `${error.message}`.indexOf("CONNECTION ERROR") >= 0
      || `${error.message}`.indexOf("Too Many Requests") >= 0
      || `${error.message}`.indexOf("limit exceeded") >= 0
      || `${error.message}`.indexOf("more requests than are allowed") >= 0
      || `${error.message}`.indexOf("Invalid JSON RPC response") >= 0
    ) {
      code = BlockchainErrorCode.AR_CANNOT_CONNECT_RPC_URL;
    }
  }

  let message = '';
  let transaction: Transaction | undefined = undefined;

  try {
    const errorStr = `${error}`;

    // Parse error from metamask
    const errorStringtify = errorStr.slice(errorStr.indexOf('{'), errorStr.lastIndexOf('}') + 1).trim();
    if (errorStringtify) {
      const errorObj = JSON.parse(errorStringtify);
      if (errorObj.message) message = `${errorObj.message}`.replace("execution reverted:", "").trim();
      if (errorObj.transactionHash) transaction = errorObj;
    } else {
      // Parse string error
      if (errorStr.indexOf("execution reverted:") !== -1) {
        const strCut = 'execution reverted:';
        message = errorStr.slice(errorStr.indexOf(strCut), errorStr.length).replace(strCut, '').trim();
      } else if (errorStr.indexOf("Returned error:") !== -1) {
        const strCut = 'Returned error:';
        message = errorStr.slice(errorStr.indexOf(strCut), errorStr.length).replace(strCut, '').trim();
      } else {
        message = errorStr;
      }
    }
  } catch (parseError) {
    console.error(`Error > parseBlockchainError`, `${error}`, parseError);
  }

  let provider = 'Unknown';

  if (web3) {
    try {
      if ((web3.currentProvider as any).isMetaMask) {
        provider = 'Metamask';
      } else if (typeof web3.currentProvider === 'object') {
        const host = (web3.currentProvider as any).host || JSON.stringify(web3.currentProvider);
        provider = `HttpProvider > ${host}`;
      }
    } catch (error) {
      provider = `Unknown ${JSON.stringify(error)}`;
    }
  }

  return new BlockchainError({
    error,
    code,
    transactionHash,
    transaction,
    provider,
    type,
    method,
    wallet,
    args,
    message,
    contractAddress: data.contractAddress,
    contractName: data.contractName,
  });
}

export const onBlockChainError = (e: any) => {
  throw parseBlockchainError(e);
}

export function getAvailableWeb3(chainId: ChainId, ignoreRpcURL?: string): Promise<{ web3: Web3, rpc: string }> {
  const maxtLoop = 30;
  let currentLoop = 0;

  let rpcUrl = ignoreRpcURL || '';
  const rpcURLs = (chains.find(v => v.chainId === chainId)?.rpcURLs || []);
  if (!rpcURLs.length) throw new BlockchainError({ code: BlockchainErrorCode.CHAIN_NOT_SUPPORTED });

  return new Promise((resolve, reject) => {
    const action = async () => {
      let availableRpcUrls = rpcURLs.filter(v => v !== rpcUrl);
      rpcUrl = availableRpcUrls[randomInt(0, availableRpcUrls.length - 1)];

      const web3 = new Web3(new Web3.providers.HttpProvider(rpcUrl));

      await web3.eth.getBlockNumber()
        .then(() => resolve({ web3, rpc: rpcUrl }))
        .catch(() => {
          if (currentLoop >= maxtLoop) reject(new BlockchainError({ code: BlockchainErrorCode.CANNOT_CONNECT_RPC_URL }))

          currentLoop += 1;
          action();
        })
    }

    action();
  })
}

export const getIsHasMetamask = () => {
  // @ts-ignore
  const temp = window as any;
  return !!temp && temp.ethereum;
}

export const getTokenUnitFromDecimals = (decimals: any) => {
  if (+decimals === 9) return 'gwei';
  if (+decimals === 6) return 'mwei';
  return 'ether';
}

export function randomInt(min: number, max: number) { // min and max included 
  if (min === max) return min;
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getBalanceOfEth = (chainId: ChainId, wallet: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    const chain = chains.find(v => v.chainId === chainId);
    if (!chain || !wallet || !Web3.utils.isAddress(wallet)) return resolve(0);
    let rpcURL = '';

    const action = async () => {
      if (!rpcURL) rpcURL = chain.rpcURLs[0];
      else rpcURL = chain.rpcURLs.filter(v => v !== rpcURL)[randomInt(0, chain.rpcURLs.length - 2)];
      const web3 = new Web3(new Web3.providers.HttpProvider(rpcURL));

      await web3.eth.getBalance(wallet)
        .then((balance) => {
          resolve(+Web3.utils.fromWei(balance))
        })
        .catch((error) => {
          const e = parseBlockchainError({ error, method: `web3.eth.getBalance(${wallet})`, type: 'READ', web3 });
          if (e.code === BlockchainErrorCode.AR_CANNOT_CONNECT_RPC_URL) {
            action();
          } else {
            reject(e);
          }
        })
    }

    action();
  })
}

export const wait = async (time: number) => new Promise(r => setTimeout(r, time));
export const rootAddress = "0x0000000000000000000000000000000000000000";

export function parseEvent(abi: any[], address: string, receipt: any) {
  try {
    let events: any[] = []

    if (receipt.logs) {
      // debug('Parsing logs into events')

      receipt.events = {}

      receipt.logs.forEach(function (log: any) {
        log.returnValues = {}
        log.signature = null
        log.raw = {
          data: log.data,
          topics: log.topics
        }
        delete log.data
        delete log.topics

        const eventNumber = log.logIndex
        receipt.events[eventNumber] = log
      })

      // debug('Parsed %s logs', receipt.logs.length)
      delete receipt.logs
    }

    // debug('Parsing contract events')
    Object.keys(receipt.events).forEach(function (n) {
      const event = receipt.events[n]

      if (Web3.utils.toChecksumAddress(event.address)
        !== Web3.utils.toChecksumAddress(address) || event.signature) {
        return
      }

      const descriptor = abi
        .filter(desc => desc.type === 'event')
        .map(desc => ({
          ...desc,
          signature: desc.signature || web3EthAbi.encodeEventSignature(desc)
        }))
        .find(desc => {
          return desc.signature === event.raw.topics[0];
        })

      if (descriptor) {
        event.event = descriptor.name
        event.signature = descriptor.signature
        event.returnValues = web3EthAbi.decodeLog(
          descriptor.inputs,
          event.raw.data,
          event.raw.topics.slice(1)
        )

        delete event.returnValues.__length__
        events.push(event)
      }

      delete receipt.events[n]
    })

    let count = 0
    events.forEach(function (ev) {
      if (ev.event) {
        if (receipt.events[ev.event]) {
          if (Array.isArray(receipt.events[ev.event])) {
            receipt.events[ev.event].push(ev)
          } else {
            receipt.events[ev.event] = [receipt.events[ev.event], ev]
          }
        } else {
          receipt.events[ev.event] = ev
        }
      } else {
        receipt.events[count] = ev
        count++
      }
    })

    return receipt as Transaction
  } catch (error) {
    // ======================= Start log =======================
    console.warn("======================= Parse receipt error =======================");
    console.warn("Address: ", address);
    console.warn("ABI: ", JSON.stringify(abi));
    console.warn("Receipt: ", JSON.stringify(receipt));
    console.warn("Error: ", error);
    console.warn("======================= End Parse receipt error =======================\n");
    throw Error(`Parse receipt error`);
  }
}

export function isURL(str: string) {
  var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
  var url = new RegExp(urlRegex, 'i');
  return str.length < 2083 && url.test(str);
}

export async function getTokenMetadata(tokenUri: string) {
  let nftRespone: any = {};
  let type: TokenUriType = 'unknown';

  // Base64
  if (!tokenUri) {
    type = 'empty';
  } else if (tokenUri.includes('base64')) {
    const json = atob(tokenUri.substring(29));
    nftRespone = JSON.parse(json);
    type = 'base64';
  } else if (isURL(tokenUri)) {
    // URL
    type = 'uri';

    await fetch(tokenUri)
      .then(async res => {
        const json = await res.json();
        nftRespone = json || {};
      })
      .catch(() => false)

    // Handle image is ipfs
    if (nftRespone && typeof nftRespone.image === 'string' && nftRespone.image.includes('ipfs')) {
      nftRespone.image = nftRespone.image.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
  } else if (tokenUri.includes('ipfs')) {
    type = 'ipfs';
    const url = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");

    await fetch(url)
      .then(async res => {
        const json = await res.json();
        nftRespone = {
          name: json.name,
          image: json.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
          description: json.description,
          attributes: json.attributes
        };
      })
      .catch(() => false)
  }

  return {
    type,
    name: nftRespone?.name || '',
    image: nftRespone?.image || '',
    description: nftRespone?.description || '',
    external_link: nftRespone?.external_link || '',
    attributes: (nftRespone?.attributes || []) as any[],
    traits: (nftRespone?.traits || []) as any[],
    tokenURI: tokenUri,
  }
}

export async function getNameOfContract(chainId: ChainId, address: string) {
  const contract = new Contract({ chainId, address, abi: ERC721_ABI, name: 'GET_NAME' })
  return contract.call({ method: 'name' })
    .catch(() => '');
}

export async function detectContractInterface(chainId: ChainId, address: string) {
  try {
    const contract = new Contract({
      name: "DETECT_TOKEN_TYPE",
      abi: ERC165_ABI,
      address: address,
      chainId,
    })

    const [isErc721, isErc1155] = await Promise.all([
      contract.call({ method: "supportsInterface", args: [ERC721InterfaceId] }),
      contract.call({ method: "supportsInterface", args: [ERC1155InterfaceId] }),
    ])

    if (isErc721) return TokenType.ERC721;
    if (isErc1155) return TokenType.ERC1155;
    return 'UNKNOWN';
  } catch (error) {
    return 'UNKNOWN';
  }
}

export const ERC1155InterfaceId: string = "0xd9b67a26";
export const ERC721InterfaceId: string = "0x80ac58cd";

export async function getAccountFromPrivateKey(privateKey: string) {
  const { web3 } = await getAvailableWeb3(ChainId.BSC);
  const account = web3.eth.accounts.privateKeyToAccount(privateKey)
  return Web3.utils.toChecksumAddress(account.address);
}

export function signTypedData(payload: SignTypedDataPayload) {
  const { domain, privateKey, data } = payload;
  const web3 = new Web3();
  const domainHash = Web3.utils.soliditySha3(web3.eth.abi.encodeParameters(["string", "string"], [domain.name, domain.version]))!;

  const types = data.map(v => v.type);
  const values = data.map(v => v.value);
  const dataHash = Web3.utils.soliditySha3(web3.eth.abi.encodeParameters(types, values))!;
  const hash = Web3.utils.soliditySha3({ type: "bytes32", value: domainHash }, { type: "bytes32", value: dataHash })!;
  return web3.eth.accounts.sign(hash, privateKey);
}

export const addressZero = "0x0000000000000000000000000000000000000000"

export const validateAddress = (rawAddress: string, invalidMsg?: string) => {
  if (!Web3.utils.isAddress(rawAddress)) throw Error(invalidMsg || "Invalid address");
  return Web3.utils.toChecksumAddress(rawAddress);
}
