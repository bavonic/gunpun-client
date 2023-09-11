"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractType = exports.TokenType = exports.ChainId = exports.TokenUnit = exports.BlockchainError = exports.BlockchainErrorCode = void 0;
var BlockchainErrorCode;
(function (BlockchainErrorCode) {
    BlockchainErrorCode["UNKNOW_ERROR"] = "Unknow error";
    BlockchainErrorCode["USER_REJECTED"] = "You declined the transaction";
    BlockchainErrorCode["INVALID_JSON_WAS_RECEIVED_BY_THE_SERVER"] = "Invalid json was received by the server";
    BlockchainErrorCode["INVALID_PAYLOAD_REQUEST"] = "Invalid payload request";
    BlockchainErrorCode["REQUEST_LIMIT_EXCEEDED"] = "Request limit exceeded";
    BlockchainErrorCode["METHOD_DOES_NOT_EXISTED_OR_NOT_AVAILBALE"] = "Method does not existed or not available";
    BlockchainErrorCode["METHOD_NOT_SUPPORTED"] = "Method not supported";
    BlockchainErrorCode["INVALID_JSON_RPC_ERROR"] = "Invalid json RPC error";
    BlockchainErrorCode["INVALID_METHOD_PARAMETERS"] = "Invalid method parameters";
    BlockchainErrorCode["INVALID_INPUT"] = "Invalid input";
    BlockchainErrorCode["RESOURCE_NOT_FOUND"] = "Resource not found";
    BlockchainErrorCode["RESOURCE_UNAVAILABLE"] = "Resource unavailable";
    BlockchainErrorCode["TRANSACTION_REJECTED"] = "Transaction was rejected";
    BlockchainErrorCode["THE_REQUEST_ACCOUNT_OR_METHOD_HAS_NOT_BEEN_AUTHORIZED"] = "The request account or method has not been authorized";
    BlockchainErrorCode["THE_REQUEST_METHOD_IS_NOT_SUPPORTED_BY_THIS_ETHEREUM_PROVIDER"] = "The request method is not supported by this ethereum provider";
    BlockchainErrorCode["THE_PROVIDER_IS_DISCONNECTED_FROM_ALL_CHAINS"] = "The provider is disconnected from all chains";
    BlockchainErrorCode["THE_PROVIDER_IS_DISCONNECTED_FROM_THE_SPECIFIED_CHAIN"] = "The provider is disconnected from the specified chain";
    BlockchainErrorCode["WALLET_CONNECT_CANNOT_CONNECTED"] = "Wallet connect cannot connected";
    BlockchainErrorCode["METAMASK_ALREADY_SENT_A_REQUEST"] = "Metamask already sent a request";
    BlockchainErrorCode["WALLET_CONNECT_ALREADY_SENT_A_REQUEST"] = "WalletConnect already sent a request";
    BlockchainErrorCode["METAMASK_CANNOT_CONNECTED"] = "Metamask cannot connected";
    BlockchainErrorCode["CANNOT_CONNECT_NETWORK"] = "Connect network failed";
    BlockchainErrorCode["CANNOT_ADD_ASSET"] = "Cannot add asset";
    BlockchainErrorCode["MUST_BE_CONNECT_WALLET"] = "Must be connect wallet before";
    BlockchainErrorCode["CANNOT_FIND_METHOD"] = "Cannot find method";
    BlockchainErrorCode["CHAIN_NOT_SUPPORTED"] = "This chain not supported yet";
    BlockchainErrorCode["AR_CANNOT_CONNECT_RPC_URL"] = "Cannot connect RPC URL (Auto Retry)";
    BlockchainErrorCode["CANNOT_CONNECT_RPC_URL"] = "Cannot connect RPC URL";
    BlockchainErrorCode["TRANSACTION_TIME_OUT"] = "Transaction timeout";
    BlockchainErrorCode["CONTRACT_NOT_DEPLOYED_YET"] = "Contract not deployed yet";
    BlockchainErrorCode["APPROVAL_FAILED"] = "Approval failed";
    BlockchainErrorCode["NOT_ENOUGH_BALANCE_FOR_GAS_FEE"] = "Not enough balance for gas fee";
    BlockchainErrorCode["TRANSACTION_REVERTED_BY_THE_EVM"] = "Transaction has been reverted by the EVM";
    BlockchainErrorCode["TRANSACTION_UNDER_PRICED"] = "Transaction underpriced";
    BlockchainErrorCode["NONCE_TOO_LOW"] = "Nonce too low";
    BlockchainErrorCode["CANNOT_TRANSFER_TO_YOUR_SELF"] = "Cannot transfer to your self";
})(BlockchainErrorCode = exports.BlockchainErrorCode || (exports.BlockchainErrorCode = {}));
class BlockchainError {
    constructor(params) {
        this.code = params.code || BlockchainErrorCode.UNKNOW_ERROR;
        this.message = params.message || 'An error has occurred.';
        this.transactionHash = params.transactionHash || '';
        this.type = params.type;
        this.provider = params.provider || 'Unknow';
        this.method = params.method;
        this.error = params.error;
        this.wallet = params.wallet;
        this.args = params.args;
        this.contractName = params.contractName;
        this.contractAddress = params.contractAddress;
    }
}
exports.BlockchainError = BlockchainError;
var TokenUnit;
(function (TokenUnit) {
    /**
     * Decimal 31
     */
    TokenUnit["tether"] = "tether";
    /**
     * Decimal 25
     */
    TokenUnit["mether"] = "mether";
    /**
     * Decimal 21
     */
    TokenUnit["kether"] = "kether";
    /**
     * Decimal 18
     */
    TokenUnit["ether"] = "ether";
    /**
     * Decimal 15
     */
    TokenUnit["finney"] = "finney";
    /**
     * Decimal 12
     */
    TokenUnit["szabo"] = "szabo";
    /**
     * Decimal 9
     */
    TokenUnit["gwei"] = "gwei";
    /**
     * Decimal 6
     */
    TokenUnit["mwei"] = "mwei";
    /**
     * Decimal 3
     */
    TokenUnit["kwei"] = "kwei";
})(TokenUnit = exports.TokenUnit || (exports.TokenUnit = {}));
var ChainId;
(function (ChainId) {
    ChainId["FANTOM"] = "250";
    ChainId["BSC"] = "56";
    ChainId["BSC_TESTNET"] = "97";
    ChainId["ETHW"] = "10001";
    ChainId["ETH"] = "1";
    ChainId["POLYGON"] = "137";
    ChainId["HARDHAT"] = "1337";
    ChainId["ARBITRUM"] = "42161";
    ChainId["ME_TESTNET"] = "61";
})(ChainId = exports.ChainId || (exports.ChainId = {}));
var TokenType;
(function (TokenType) {
    TokenType["ERC20"] = "ERC20";
    TokenType["ERC721"] = "ERC721";
    TokenType["ERC1155"] = "ERC1155";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
var ContractType;
(function (ContractType) {
    ContractType["ERC721"] = "ERC721";
    ContractType["ERC1155"] = "ERC1155";
    ContractType["ERC20"] = "ERC20";
})(ContractType = exports.ContractType || (exports.ContractType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2hhcmVkL2Jsb2NrY2hhaW4vdHlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0EsSUFBWSxtQkFzQ1g7QUF0Q0QsV0FBWSxtQkFBbUI7SUFDN0Isb0RBQTZCLENBQUE7SUFDN0IscUVBQThDLENBQUE7SUFDOUMsMEdBQW1GLENBQUE7SUFDbkYsMEVBQW1ELENBQUE7SUFDbkQsd0VBQWlELENBQUE7SUFDakQsNEdBQXFGLENBQUE7SUFDckYsb0VBQTZDLENBQUE7SUFDN0Msd0VBQWlELENBQUE7SUFDakQsOEVBQXVELENBQUE7SUFDdkQsc0RBQStCLENBQUE7SUFDL0IsZ0VBQXlDLENBQUE7SUFDekMsb0VBQTZDLENBQUE7SUFDN0Msd0VBQWlELENBQUE7SUFDakQsc0lBQStHLENBQUE7SUFDL0csc0pBQStILENBQUE7SUFDL0gsb0hBQTZGLENBQUE7SUFDN0Ysc0lBQStHLENBQUE7SUFFL0csMEZBQW1FLENBQUE7SUFDbkUsMEZBQW1FLENBQUE7SUFDbkUscUdBQThFLENBQUE7SUFDOUUsOEVBQXVELENBQUE7SUFDdkQsd0VBQWlELENBQUE7SUFDakQsNERBQXFDLENBQUE7SUFDckMsK0VBQXdELENBQUE7SUFDeEQsZ0VBQXlDLENBQUE7SUFDekMsMkVBQW9ELENBQUE7SUFDcEQsd0ZBQWlFLENBQUE7SUFDakUsd0VBQWlELENBQUE7SUFDakQsbUVBQTRDLENBQUE7SUFDNUMsOEVBQXVELENBQUE7SUFDdkQsMERBQW1DLENBQUE7SUFDbkMsd0ZBQWlFLENBQUE7SUFDakUsbUdBQTRFLENBQUE7SUFDNUUsMkVBQW9ELENBQUE7SUFDcEQsc0RBQStCLENBQUE7SUFDL0Isb0ZBQTZELENBQUE7QUFDL0QsQ0FBQyxFQXRDVyxtQkFBbUIsR0FBbkIsMkJBQW1CLEtBQW5CLDJCQUFtQixRQXNDOUI7QUFvQkQsTUFBYSxlQUFlO0lBYzFCLFlBQVksTUFhWDtRQUNDLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksSUFBSSxtQkFBbUIsQ0FBQyxZQUFZLENBQUM7UUFDNUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxJQUFJLHdCQUF3QixDQUFDO1FBQzFELElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUM7UUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQztRQUN4QyxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUM7SUFDaEQsQ0FBQztDQUNGO0FBeENELDBDQXdDQztBQXFERCxJQUFZLFNBcUNYO0FBckNELFdBQVksU0FBUztJQUNuQjs7T0FFRztJQUNILDhCQUFpQixDQUFBO0lBQ2pCOztPQUVHO0lBQ0gsOEJBQWlCLENBQUE7SUFDakI7O09BRUc7SUFDSCw4QkFBaUIsQ0FBQTtJQUNqQjs7T0FFRztJQUNILDRCQUFlLENBQUE7SUFDZjs7T0FFRztJQUNILDhCQUFpQixDQUFBO0lBQ2pCOztPQUVHO0lBQ0gsNEJBQWUsQ0FBQTtJQUNmOztPQUVHO0lBQ0gsMEJBQWEsQ0FBQTtJQUNiOztPQUVHO0lBQ0gsMEJBQWEsQ0FBQTtJQUNiOztPQUVHO0lBQ0gsMEJBQWEsQ0FBQTtBQUNmLENBQUMsRUFyQ1csU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMsUUFxQ3BCO0FBRUQsSUFBWSxPQVVYO0FBVkQsV0FBWSxPQUFPO0lBQ2pCLHlCQUFjLENBQUE7SUFDZCxxQkFBVSxDQUFBO0lBQ1YsNkJBQWtCLENBQUE7SUFDbEIseUJBQWMsQ0FBQTtJQUNkLG9CQUFTLENBQUE7SUFDVCwwQkFBZSxDQUFBO0lBQ2YsMkJBQWdCLENBQUE7SUFDaEIsNkJBQWtCLENBQUE7SUFDbEIsNEJBQWlCLENBQUE7QUFDbkIsQ0FBQyxFQVZXLE9BQU8sR0FBUCxlQUFPLEtBQVAsZUFBTyxRQVVsQjtBQUVELElBQVksU0FJWDtBQUpELFdBQVksU0FBUztJQUNuQiw0QkFBZSxDQUFBO0lBQ2YsOEJBQWlCLENBQUE7SUFDakIsZ0NBQW1CLENBQUE7QUFDckIsQ0FBQyxFQUpXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBSXBCO0FBbUZELElBQVksWUFJWDtBQUpELFdBQVksWUFBWTtJQUN0QixpQ0FBaUIsQ0FBQTtJQUNqQixtQ0FBbUIsQ0FBQTtJQUNuQiwrQkFBZSxDQUFBO0FBQ2pCLENBQUMsRUFKVyxZQUFZLEdBQVosb0JBQVksS0FBWixvQkFBWSxRQUl2QiJ9