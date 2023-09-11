import Web3 from "web3";
import { ErrorMessage, logger, ServerError } from "../../utils";
import { ChainId } from "./types";
import ERC721_ABI from './abis/ERC721.json';
import { bscChainConfigs, ethwChainConfigs, fantomChainConfigs, bscTestnetChainConfigs } from "../chain-configs/chains/_networks.chainConfigs";
import { Contract, getAvailableWeb3, validateAddress } from "../../shared/blockchain";

export class Blockchain {
  static getWeb3(chainId: any) {
    if (chainId === ChainId.BSC) {
      return new Web3(new Web3.providers.HttpProvider(bscChainConfigs.rpcUrl));
    }

    if (chainId === ChainId.BSC_TESTNET) {
      return new Web3(new Web3.providers.HttpProvider(bscTestnetChainConfigs.rpcUrl));
    }

    if (chainId === ChainId.ETHW) {
      return new Web3(new Web3.providers.HttpProvider(ethwChainConfigs.rpcUrl));
    }

    if (chainId === ChainId.FANTOM) {
      return new Web3(new Web3.providers.HttpProvider(fantomChainConfigs.rpcUrl));
    }

    if (chainId === ChainId.FANTOM) {
      return new Web3(new Web3.providers.HttpProvider(fantomChainConfigs.rpcUrl));
    }

    throw new ServerError('Chain not supported!', 400);
  }

  static async getContract(chainId: any, abi: any[], address: string) {
    const { web3 } = await getAvailableWeb3(chainId);
    const contract = new Contract({ name: `ERC-721-${chainId}-${address}`, abi, address, chainId });
    return {
      web3,
      contract
    }
  }

  static async getContractERC721(chainId: ChainId, address: string, isOnValid?: boolean) {
    const contractAddress = validateAddress(address, ErrorMessage.INVALID_CONTRACT_ADDRESS);

    const { web3, contract } = await this.getContract(chainId, ERC721_ABI, contractAddress);

    // Validate contract
    const totalSupply = !isOnValid ? 0 : await contract.call({ method: 'totalSupply' })
      .catch((error) => {
        if (typeof error === 'object') {
          if (`${error.message}`.indexOf('Returned values aren\'t valid') !== -1) {
            throw new ServerError(ErrorMessage.INVALID_CONTRACT_ERC721_ADDRESS, 400);
          }
        }

        logger('ERROR', 'getContractERC721 error >', error)
        throw new ServerError(ErrorMessage.INVALID_CONTRACT_ERC721_ADDRESS, 400);
      })

    const name = await contract.call({ method: 'name' })

    const parseTransaction = async (transactionHash: string) => {
      const receipt = await web3.eth.getTransactionReceipt(transactionHash);
      const parseEvent = require('web3-parse-receipt-events');
      const transaction = parseEvent(ERC721_ABI, contract.address, receipt);
      return transaction;
    }

    return {
      name,
      web3,
      contract,
      parseTransaction,
      totalSupply: +totalSupply,
    }
  }
}