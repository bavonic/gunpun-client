"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAddress = exports.addressZero = exports.signTypedData = exports.getAccountFromPrivateKey = exports.ERC721InterfaceId = exports.ERC1155InterfaceId = exports.detectContractInterface = exports.getNameOfContract = exports.getTokenMetadata = exports.isURL = exports.parseEvent = exports.rootAddress = exports.wait = exports.getBalanceOfEth = exports.randomInt = exports.getTokenUnitFromDecimals = exports.getIsHasMetamask = exports.getAvailableWeb3 = exports.onBlockChainError = exports.parseBlockchainError = void 0;
const web3_1 = __importDefault(require("web3"));
const web3_eth_abi_1 = __importDefault(require("web3-eth-abi"));
const ERC165_json_1 = __importDefault(require("./abis/ERC165.json"));
const ERC721_json_1 = __importDefault(require("./abis/ERC721.json"));
const chains_1 = require("./chains");
const core_1 = require("./contracts/core");
const types_1 = require("./types");
function parseBlockchainError(data) {
    const { error, transactionHash, web3, type, method, wallet, args } = data;
    let code = types_1.BlockchainErrorCode.UNKNOW_ERROR;
    if (typeof error === 'object') {
        if (error.code === -32700)
            code = types_1.BlockchainErrorCode.INVALID_JSON_WAS_RECEIVED_BY_THE_SERVER;
        else if (error.code === -32600)
            code = types_1.BlockchainErrorCode.INVALID_PAYLOAD_REQUEST;
        else if (error.code === -32601)
            code = types_1.BlockchainErrorCode.METHOD_DOES_NOT_EXISTED_OR_NOT_AVAILBALE;
        else if (error.code === -32602)
            code = types_1.BlockchainErrorCode.INVALID_METHOD_PARAMETERS;
        else if (error.code === -32603)
            code = types_1.BlockchainErrorCode.INVALID_JSON_RPC_ERROR;
        else if (error.code === -32000)
            code = types_1.BlockchainErrorCode.INVALID_INPUT;
        else if (error.code === -32001)
            code = types_1.BlockchainErrorCode.RESOURCE_NOT_FOUND;
        else if (error.code === -32002)
            code = types_1.BlockchainErrorCode.RESOURCE_UNAVAILABLE;
        else if (error.code === -32003)
            code = types_1.BlockchainErrorCode.TRANSACTION_REJECTED;
        else if (error.code === -32004)
            code = types_1.BlockchainErrorCode.METHOD_NOT_SUPPORTED;
        else if (error.code === -32005)
            code = types_1.BlockchainErrorCode.REQUEST_LIMIT_EXCEEDED;
        else if (error.code === 4001)
            code = types_1.BlockchainErrorCode.USER_REJECTED;
        else if (error.code === 4100)
            code = types_1.BlockchainErrorCode.THE_REQUEST_ACCOUNT_OR_METHOD_HAS_NOT_BEEN_AUTHORIZED;
        else if (error.code === 4200)
            code = types_1.BlockchainErrorCode.THE_REQUEST_METHOD_IS_NOT_SUPPORTED_BY_THIS_ETHEREUM_PROVIDER;
        else if (error.code === 4900)
            code = types_1.BlockchainErrorCode.THE_PROVIDER_IS_DISCONNECTED_FROM_ALL_CHAINS;
        else if (error.code === 4901)
            code = types_1.BlockchainErrorCode.THE_PROVIDER_IS_DISCONNECTED_FROM_THE_SPECIFIED_CHAIN;
        else if (`${error.message}`.indexOf("not mined within 50 blocks") >= 0)
            code = types_1.BlockchainErrorCode.TRANSACTION_TIME_OUT;
        else if (`${error.message}`.indexOf("insufficient funds for gas * price + value") >= 0)
            code = types_1.BlockchainErrorCode.NOT_ENOUGH_BALANCE_FOR_GAS_FEE;
        else if (`${error.message}`.indexOf("Transaction has been reverted by the EVM") >= 0)
            code = types_1.BlockchainErrorCode.TRANSACTION_REVERTED_BY_THE_EVM;
        else if (`${error.message}`.indexOf("Transaction underpriced") >= 0)
            code = types_1.BlockchainErrorCode.TRANSACTION_UNDER_PRICED;
        else if (`${error.message}`.indexOf("nonce too low") >= 0)
            code = types_1.BlockchainErrorCode.NONCE_TOO_LOW;
        else if (`${error.message}`.indexOf("trouble connecting to the network") >= 0
            || `${error.message}`.indexOf("timeout") >= 0
            || `${error.message}`.indexOf("CONNECTION ERROR") >= 0
            || `${error.message}`.indexOf("Too Many Requests") >= 0
            || `${error.message}`.indexOf("limit exceeded") >= 0
            || `${error.message}`.indexOf("more requests than are allowed") >= 0
            || `${error.message}`.indexOf("Invalid JSON RPC response") >= 0) {
            code = types_1.BlockchainErrorCode.AR_CANNOT_CONNECT_RPC_URL;
        }
    }
    let message = '';
    let transaction = undefined;
    try {
        const errorStr = `${error}`;
        // Parse error from metamask
        const errorStringtify = errorStr.slice(errorStr.indexOf('{'), errorStr.lastIndexOf('}') + 1).trim();
        if (errorStringtify) {
            const errorObj = JSON.parse(errorStringtify);
            if (errorObj.message)
                message = `${errorObj.message}`.replace("execution reverted:", "").trim();
            if (errorObj.transactionHash)
                transaction = errorObj;
        }
        else {
            // Parse string error
            if (errorStr.indexOf("execution reverted:") !== -1) {
                const strCut = 'execution reverted:';
                message = errorStr.slice(errorStr.indexOf(strCut), errorStr.length).replace(strCut, '').trim();
            }
            else if (errorStr.indexOf("Returned error:") !== -1) {
                const strCut = 'Returned error:';
                message = errorStr.slice(errorStr.indexOf(strCut), errorStr.length).replace(strCut, '').trim();
            }
            else {
                message = errorStr;
            }
        }
    }
    catch (parseError) {
        console.error(`Error > parseBlockchainError`, `${error}`, parseError);
    }
    let provider = 'Unknown';
    if (web3) {
        try {
            if (web3.currentProvider.isMetaMask) {
                provider = 'Metamask';
            }
            else if (typeof web3.currentProvider === 'object') {
                const host = web3.currentProvider.host || JSON.stringify(web3.currentProvider);
                provider = `HttpProvider > ${host}`;
            }
        }
        catch (error) {
            provider = `Unknown ${JSON.stringify(error)}`;
        }
    }
    return new types_1.BlockchainError({
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
exports.parseBlockchainError = parseBlockchainError;
const onBlockChainError = (e) => {
    throw parseBlockchainError(e);
};
exports.onBlockChainError = onBlockChainError;
function getAvailableWeb3(chainId, ignoreRpcURL) {
    var _a;
    const maxtLoop = 30;
    let currentLoop = 0;
    let rpcUrl = ignoreRpcURL || '';
    const rpcURLs = (((_a = chains_1.chains.find(v => v.chainId === chainId)) === null || _a === void 0 ? void 0 : _a.rpcURLs) || []);
    if (!rpcURLs.length)
        throw new types_1.BlockchainError({ code: types_1.BlockchainErrorCode.CHAIN_NOT_SUPPORTED });
    return new Promise((resolve, reject) => {
        const action = () => __awaiter(this, void 0, void 0, function* () {
            let availableRpcUrls = rpcURLs.filter(v => v !== rpcUrl);
            rpcUrl = availableRpcUrls[randomInt(0, availableRpcUrls.length - 1)];
            const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(rpcUrl));
            yield web3.eth.getBlockNumber()
                .then(() => resolve({ web3, rpc: rpcUrl }))
                .catch(() => {
                if (currentLoop >= maxtLoop)
                    reject(new types_1.BlockchainError({ code: types_1.BlockchainErrorCode.CANNOT_CONNECT_RPC_URL }));
                currentLoop += 1;
                action();
            });
        });
        action();
    });
}
exports.getAvailableWeb3 = getAvailableWeb3;
const getIsHasMetamask = () => {
    // @ts-ignore
    const temp = window;
    return !!temp && temp.ethereum;
};
exports.getIsHasMetamask = getIsHasMetamask;
const getTokenUnitFromDecimals = (decimals) => {
    if (+decimals === 9)
        return 'gwei';
    if (+decimals === 6)
        return 'mwei';
    return 'ether';
};
exports.getTokenUnitFromDecimals = getTokenUnitFromDecimals;
function randomInt(min, max) {
    if (min === max)
        return min;
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randomInt = randomInt;
const getBalanceOfEth = (chainId, wallet) => {
    return new Promise((resolve, reject) => {
        const chain = chains_1.chains.find(v => v.chainId === chainId);
        if (!chain || !wallet || !web3_1.default.utils.isAddress(wallet))
            return resolve(0);
        let rpcURL = '';
        const action = () => __awaiter(void 0, void 0, void 0, function* () {
            if (!rpcURL)
                rpcURL = chain.rpcURLs[0];
            else
                rpcURL = chain.rpcURLs.filter(v => v !== rpcURL)[randomInt(0, chain.rpcURLs.length - 2)];
            const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(rpcURL));
            yield web3.eth.getBalance(wallet)
                .then((balance) => {
                resolve(+web3_1.default.utils.fromWei(balance));
            })
                .catch((error) => {
                const e = parseBlockchainError({ error, method: `web3.eth.getBalance(${wallet})`, type: 'READ', web3 });
                if (e.code === types_1.BlockchainErrorCode.AR_CANNOT_CONNECT_RPC_URL) {
                    action();
                }
                else {
                    reject(e);
                }
            });
        });
        action();
    });
};
exports.getBalanceOfEth = getBalanceOfEth;
const wait = (time) => __awaiter(void 0, void 0, void 0, function* () { return new Promise(r => setTimeout(r, time)); });
exports.wait = wait;
exports.rootAddress = "0x0000000000000000000000000000000000000000";
function parseEvent(abi, address, receipt) {
    try {
        let events = [];
        if (receipt.logs) {
            // debug('Parsing logs into events')
            receipt.events = {};
            receipt.logs.forEach(function (log) {
                log.returnValues = {};
                log.signature = null;
                log.raw = {
                    data: log.data,
                    topics: log.topics
                };
                delete log.data;
                delete log.topics;
                const eventNumber = log.logIndex;
                receipt.events[eventNumber] = log;
            });
            // debug('Parsed %s logs', receipt.logs.length)
            delete receipt.logs;
        }
        // debug('Parsing contract events')
        Object.keys(receipt.events).forEach(function (n) {
            const event = receipt.events[n];
            if (web3_1.default.utils.toChecksumAddress(event.address)
                !== web3_1.default.utils.toChecksumAddress(address) || event.signature) {
                return;
            }
            const descriptor = abi
                .filter(desc => desc.type === 'event')
                .map(desc => (Object.assign(Object.assign({}, desc), { signature: desc.signature || web3_eth_abi_1.default.encodeEventSignature(desc) })))
                .find(desc => {
                return desc.signature === event.raw.topics[0];
            });
            if (descriptor) {
                event.event = descriptor.name;
                event.signature = descriptor.signature;
                event.returnValues = web3_eth_abi_1.default.decodeLog(descriptor.inputs, event.raw.data, event.raw.topics.slice(1));
                delete event.returnValues.__length__;
                events.push(event);
            }
            delete receipt.events[n];
        });
        let count = 0;
        events.forEach(function (ev) {
            if (ev.event) {
                if (receipt.events[ev.event]) {
                    if (Array.isArray(receipt.events[ev.event])) {
                        receipt.events[ev.event].push(ev);
                    }
                    else {
                        receipt.events[ev.event] = [receipt.events[ev.event], ev];
                    }
                }
                else {
                    receipt.events[ev.event] = ev;
                }
            }
            else {
                receipt.events[count] = ev;
                count++;
            }
        });
        return receipt;
    }
    catch (error) {
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
exports.parseEvent = parseEvent;
function isURL(str) {
    var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    var url = new RegExp(urlRegex, 'i');
    return str.length < 2083 && url.test(str);
}
exports.isURL = isURL;
function getTokenMetadata(tokenUri) {
    return __awaiter(this, void 0, void 0, function* () {
        let nftRespone = {};
        let type = 'unknown';
        // Base64
        if (!tokenUri) {
            type = 'empty';
        }
        else if (tokenUri.includes('base64')) {
            const json = atob(tokenUri.substring(29));
            nftRespone = JSON.parse(json);
            type = 'base64';
        }
        else if (isURL(tokenUri)) {
            // URL
            type = 'uri';
            yield fetch(tokenUri)
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                const json = yield res.json();
                nftRespone = json || {};
            }))
                .catch(() => false);
            // Handle image is ipfs
            if (nftRespone && typeof nftRespone.image === 'string' && nftRespone.image.includes('ipfs')) {
                nftRespone.image = nftRespone.image.replace("ipfs://", "https://ipfs.io/ipfs/");
            }
        }
        else if (tokenUri.includes('ipfs')) {
            type = 'ipfs';
            const url = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/");
            yield fetch(url)
                .then((res) => __awaiter(this, void 0, void 0, function* () {
                const json = yield res.json();
                nftRespone = {
                    name: json.name,
                    image: json.image.replace("ipfs://", "https://ipfs.io/ipfs/"),
                    description: json.description,
                    attributes: json.attributes
                };
            }))
                .catch(() => false);
        }
        return {
            type,
            name: (nftRespone === null || nftRespone === void 0 ? void 0 : nftRespone.name) || '',
            image: (nftRespone === null || nftRespone === void 0 ? void 0 : nftRespone.image) || '',
            description: (nftRespone === null || nftRespone === void 0 ? void 0 : nftRespone.description) || '',
            external_link: (nftRespone === null || nftRespone === void 0 ? void 0 : nftRespone.external_link) || '',
            attributes: ((nftRespone === null || nftRespone === void 0 ? void 0 : nftRespone.attributes) || []),
            traits: ((nftRespone === null || nftRespone === void 0 ? void 0 : nftRespone.traits) || []),
            tokenURI: tokenUri,
        };
    });
}
exports.getTokenMetadata = getTokenMetadata;
function getNameOfContract(chainId, address) {
    return __awaiter(this, void 0, void 0, function* () {
        const contract = new core_1.Contract({ chainId, address, abi: ERC721_json_1.default, name: 'GET_NAME' });
        return contract.call({ method: 'name' })
            .catch(() => '');
    });
}
exports.getNameOfContract = getNameOfContract;
function detectContractInterface(chainId, address) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const contract = new core_1.Contract({
                name: "DETECT_TOKEN_TYPE",
                abi: ERC165_json_1.default,
                address: address,
                chainId,
            });
            const [isErc721, isErc1155] = yield Promise.all([
                contract.call({ method: "supportsInterface", args: [exports.ERC721InterfaceId] }),
                contract.call({ method: "supportsInterface", args: [exports.ERC1155InterfaceId] }),
            ]);
            if (isErc721)
                return types_1.TokenType.ERC721;
            if (isErc1155)
                return types_1.TokenType.ERC1155;
            return 'UNKNOWN';
        }
        catch (error) {
            return 'UNKNOWN';
        }
    });
}
exports.detectContractInterface = detectContractInterface;
exports.ERC1155InterfaceId = "0xd9b67a26";
exports.ERC721InterfaceId = "0x80ac58cd";
function getAccountFromPrivateKey(privateKey) {
    return __awaiter(this, void 0, void 0, function* () {
        const { web3 } = yield getAvailableWeb3(types_1.ChainId.BSC);
        const account = web3.eth.accounts.privateKeyToAccount(privateKey);
        return web3_1.default.utils.toChecksumAddress(account.address);
    });
}
exports.getAccountFromPrivateKey = getAccountFromPrivateKey;
function signTypedData(payload) {
    const { domain, privateKey, data } = payload;
    const web3 = new web3_1.default();
    const domainHash = web3_1.default.utils.soliditySha3(web3.eth.abi.encodeParameters(["string", "string"], [domain.name, domain.version]));
    const types = data.map(v => v.type);
    const values = data.map(v => v.value);
    const dataHash = web3_1.default.utils.soliditySha3(web3.eth.abi.encodeParameters(types, values));
    const hash = web3_1.default.utils.soliditySha3({ type: "bytes32", value: domainHash }, { type: "bytes32", value: dataHash });
    return web3.eth.accounts.sign(hash, privateKey);
}
exports.signTypedData = signTypedData;
exports.addressZero = "0x0000000000000000000000000000000000000000";
const validateAddress = (rawAddress, invalidMsg) => {
    if (!web3_1.default.utils.isAddress(rawAddress))
        throw Error(invalidMsg || "Invalid address");
    return web3_1.default.utils.toChecksumAddress(rawAddress);
};
exports.validateAddress = validateAddress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2hhcmVkL2Jsb2NrY2hhaW4vdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLGdFQUFzQztBQUN0QyxxRUFBNEM7QUFDNUMscUVBQTRDO0FBQzVDLHFDQUFrQztBQUNsQywyQ0FBNEM7QUFDNUMsbUNBQXdKO0FBRXhKLFNBQWdCLG9CQUFvQixDQUFDLElBVXBDO0lBQ0MsTUFBTSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztJQUMxRSxJQUFJLElBQUksR0FBd0IsMkJBQW1CLENBQUMsWUFBWSxDQUFDO0lBRWpFLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzdCLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUs7WUFBRSxJQUFJLEdBQUcsMkJBQW1CLENBQUMsdUNBQXVDLENBQUM7YUFDekYsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSztZQUFFLElBQUksR0FBRywyQkFBbUIsQ0FBQyx1QkFBdUIsQ0FBQzthQUM5RSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLO1lBQUUsSUFBSSxHQUFHLDJCQUFtQixDQUFDLHdDQUF3QyxDQUFDO2FBQy9GLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUs7WUFBRSxJQUFJLEdBQUcsMkJBQW1CLENBQUMseUJBQXlCLENBQUM7YUFDaEYsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSztZQUFFLElBQUksR0FBRywyQkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQzthQUM3RSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLO1lBQUUsSUFBSSxHQUFHLDJCQUFt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