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
exports.Blockchain = void 0;
const web3_1 = __importDefault(require("web3"));
const utils_1 = require("../../utils");
const types_1 = require("./types");
const ERC721_json_1 = __importDefault(require("./abis/ERC721.json"));
const _networks_chainConfigs_1 = require("../chain-configs/chains/_networks.chainConfigs");
const blockchain_1 = require("../../shared/blockchain");
class Blockchain {
    static getWeb3(chainId) {
        if (chainId === types_1.ChainId.BSC) {
            return new web3_1.default(new web3_1.default.providers.HttpProvider(_networks_chainConfigs_1.bscChainConfigs.rpcUrl));
        }
        if (chainId === types_1.ChainId.BSC_TESTNET) {
            return new web3_1.default(new web3_1.default.providers.HttpProvider(_networks_chainConfigs_1.bscTestnetChainConfigs.rpcUrl));
        }
        if (chainId === types_1.ChainId.ETHW) {
            return new web3_1.default(new web3_1.default.providers.HttpProvider(_networks_chainConfigs_1.ethwChainConfigs.rpcUrl));
        }
        if (chainId === types_1.ChainId.FANTOM) {
            return new web3_1.default(new web3_1.default.providers.HttpProvider(_networks_chainConfigs_1.fantomChainConfigs.rpcUrl));
        }
        if (chainId === types_1.ChainId.FANTOM) {
            return new web3_1.default(new web3_1.default.providers.HttpProvider(_networks_chainConfigs_1.fantomChainConfigs.rpcUrl));
        }
        throw new utils_1.ServerError('Chain not supported!', 400);
    }
    static getContract(chainId, abi, address) {
        return __awaiter(this, void 0, void 0, function* () {
            const { web3 } = yield (0, blockchain_1.getAvailableWeb3)(chainId);
            const contract = new blockchain_1.Contract({ name: `ERC-721-${chainId}-${address}`, abi, address, chainId });
            return {
                web3,
                contract
            };
        });
    }
    static getContractERC721(chainId, address, isOnValid) {
        return __awaiter(this, void 0, void 0, function* () {
            const contractAddress = (0, blockchain_1.validateAddress)(address, utils_1.ErrorMessage.INVALID_CONTRACT_ADDRESS);
            const { web3, contract } = yield this.getContract(chainId, ERC721_json_1.default, contractAddress);
            // Validate contract
            const totalSupply = !isOnValid ? 0 : yield contract.call({ method: 'totalSupply' })
                .catch((error) => {
                if (typeof error === 'object') {
                    if (`${error.message}`.indexOf('Returned values aren\'t valid') !== -1) {
                        throw new utils_1.ServerError(utils_1.ErrorMessage.INVALID_CONTRACT_ERC721_ADDRESS, 400);
                    }
                }
                (0, utils_1.logger)('ERROR', 'getContractERC721 error >', error);
                throw new utils_1.ServerError(utils_1.ErrorMessage.INVALID_CONTRACT_ERC721_ADDRESS, 400);
            });
            const name = yield contract.call({ method: 'name' });
            const parseTransaction = (transactionHash) => __awaiter(this, void 0, void 0, function* () {
                const receipt = yield web3.eth.getTransactionReceipt(transactionHash);
                const parseEvent = require('web3-parse-receipt-events');
                const transaction = parseEvent(ERC721_json_1.default, contract.address, receipt);
                return transaction;
            });
            return {
                name,
                web3,
                contract,
                parseTransaction,
                totalSupply: +totalSupply,
            };
        });
    }
}
exports.Blockchain = Blockchain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9ibG9ja2NoYWluL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF3QjtBQUN4Qix1Q0FBZ0U7QUFDaEUsbUNBQWtDO0FBQ2xDLHFFQUE0QztBQUM1QywyRkFBK0k7QUFDL0ksd0RBQXNGO0FBRXRGLE1BQWEsVUFBVTtJQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLE9BQVk7UUFDekIsSUFBSSxPQUFPLEtBQUssZUFBTyxDQUFDLEdBQUcsRUFBRTtZQUMzQixPQUFPLElBQUksY0FBSSxDQUFDLElBQUksY0FBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsd0NBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQzFFO1FBRUQsSUFBSSxPQUFPLEtBQUssZUFBTyxDQUFDLFdBQVcsRUFBRTtZQUNuQyxPQUFPLElBQUksY0FBSSxDQUFDLElBQUksY0FBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsK0NBQXNCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUNqRjtRQUVELElBQUksT0FBTyxLQUFLLGVBQU8sQ0FBQyxJQUFJLEVBQUU7WUFDNUIsT0FBTyxJQUFJLGNBQUksQ0FBQyxJQUFJLGNBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLHlDQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7U0FDM0U7UUFFRCxJQUFJLE9BQU8sS0FBSyxlQUFPLENBQUMsTUFBTSxFQUFFO1lBQzlCLE9BQU8sSUFBSSxjQUFJLENBQUMsSUFBSSxjQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQywyQ0FBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1NBQzdFO1FBRUQsSUFBSSxPQUFPLEtBQUssZUFBTyxDQUFDLE1BQU0sRUFBRTtZQUM5QixPQUFPLElBQUksY0FBSSxDQUFDLElBQUksY0FBSSxDQUFD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