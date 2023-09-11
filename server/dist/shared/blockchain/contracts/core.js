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
exports.Contract = exports.version = void 0;
const web3_1 = __importDefault(require("web3"));
const chains_1 = require("../chains");
const logs_1 = require("../logs");
const types_1 = require("../types");
const utils_1 = require("../utils");
let contractTokenUnits = {};
exports.version = "1.0.5";
class Contract {
    constructor(configs) {
        this.rpcUsed = '';
        this.name = configs.name || 'Contract';
        this.address = configs.address ? web3_1.default.utils.toChecksumAddress(configs.address) : '';
        this.provider = configs.provider;
        this.abi = configs.abi;
        this.chain = chains_1.chains.find(v => v.chainId === configs.chainId);
        this.rateGas = configs.rateGas;
        this.rateGasPrice = configs.rateGasPrice;
        this.captureTransaction = configs.captureTransaction;
        const ref = Contract.ref(configs.chainId, configs.address);
        this.tokenUnit = contractTokenUnits[ref];
        if (!this.chain)
            throw Error(`Chain with id ${configs.chainId} not supported!`);
        if (configs.wallet)
            this.wallet = web3_1.default.utils.toChecksumAddress(configs.wallet);
    }
    call(options, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(`Contract ${this.name} > Method ${options.method}`);
            if (!this.address)
                throw new types_1.BlockchainError({ code: types_1.BlockchainErrorCode.CONTRACT_NOT_DEPLOYED_YET });
            const retryTime = typeof options.retryTime === 'number' ? options.retryTime : 20;
            let retriedTime = 0;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const action = () => {
                        let rpcURLs = this.chain.rpcURLs.filter(v => v !== this.rpcUsed);
                        this.rpcUsed = rpcURLs[(0, utils_1.randomInt)(0, rpcURLs.length - 1)];
                        const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(this.rpcUsed));
                        const contract = new web3.eth.Contract(this.abi, this.address);
                        const func = contract.methods[options.method];
                        if (typeof func !== 'function')
                            return reject(new types_1.BlockchainError({
                                code: types_1.BlockchainErrorCode.INVALID_METHOD_PARAMETERS,
                                type: "READ",
                                method: options.method,
                                args,
                            }));
                        return func(...(options.args || args)).call()
                            .then((res) => resolve(res))
                            .catch((error) => {
                            const e = (0, utils_1.parseBlockchainError)({
                                type: 'READ', error,
                                web3,
                                method: options.method,
                                wallet: this.wallet,
                                args,
                                contractName: this.name,
                                contractAddress: this.address,
                            });
                            // console.warn('••••••••• Start Error •••••••••');
                            // console.warn('name', this.name);
                            // console.warn('options', options);
                            // console.warn('args', args);
                            // console.warn('••••••••• End Error ••••••••• \n');
                            if (e.code === types_1.BlockchainErrorCode.AR_CANNOT_CONNECT_RPC_URL) {
                                action();
                            }
                            else if (retryTime > 0 && retriedTime < retryTime) {
                                retriedTime += 1;
                                setTimeout(action, 2000);
                            }
                            else {
                                this.trackError(e);
                                reject(e);
                            }
                        });
                    };
                    action();
                }
                catch (error) {
                    throw error;
                }
            }));
        });
    }
    getWeb3() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.provider
                ? new web3_1.default(this.provider)
                : yield (0, utils_1.getAvailableWeb3)(this.chain.chainId).then(r => r.web3);
        });
    }
    prepareBeforeSend(options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.address)
                throw new types_1.BlockchainError({ code: types_1.BlockchainErrorCode.CONTRACT_NOT_DEPLOYED_YET });
            const web3 = yield this.getWeb3();
            const wallet = ((_a = options.auth) === null || _a === void 0 ? void 0 : _a.wallet) || this.wallet;
            if (!wallet || (!this.provider && !options.auth))
                throw new types_1.BlockchainError({
                    code: types_1.BlockchainErrorCode.MUST_BE_CONNECT_WALLET,
                    message: 'Must be connect wallet before.'
                });
            if (options.auth) {
                web3.eth.accounts.wallet.remove(wallet);
                web3.eth.accounts.wallet.add({
                    address: wallet,
                    privateKey: options.auth.privateKey
                });
            }
            const contract = new web3.eth.Contract(this.abi, this.address);
            return { web3, wallet, contract };
        });
    }
    estimateGas(options, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.address)
                throw new types_1.BlockchainError({ code: types_1.BlockchainErrorCode.CONTRACT_NOT_DEPLOYED_YET });
            const prepare = yield this.prepareBeforeSend(options);
            const func = prepare.contract.methods[options.method];
            if (typeof func !== 'function')
                throw new types_1.BlockchainError({
                    code: types_1.BlockchainErrorCode.INVALID_METHOD_PARAMETERS,
                    type: "READ",
                    method: options.method,
                    args,
                });
            return new Promise((resolve, reject) => {
                const action = () => __awaiter(this, void 0, void 0, function* () {
                    try {
                        let gasPrice = yield prepare.web3.eth.getGasPrice().then((res) => +res);
                        let gasLimit = yield func(...(options.args || args))
                            .estimateGas(Object.assign({ from: prepare.wallet }, options.params));
                        const rateGas = options.rateGas || this.rateGas || 1;
                        gasLimit = +(gasLimit * rateGas).toFixed(0);
                        const rateGasPrice = options.rateGasPrice || this.rateGasPrice || 1;
                        gasPrice = +(+gasPrice * rateGasPrice).toFixed(0);
                        const response = Object.assign(Object.assign({}, prepare), { gasPrice, fee: +web3_1.default.utils.fromWei((+gasPrice * gasLimit).toString()), feeInWei: (gasPrice * gasLimit).toString(), gasLimit,
                            func });
                        resolve(response);
                    }
                    catch (error) {
                        const e = (0, utils_1.parseBlockchainError)({
                            type: 'READ', method: 'estimateGas', error,
                            web3: prepare.web3,
                            contractName: this.name,
                            contractAddress: this.address,
                            wallet: this.wallet
                        });
                        if (e.code === types_1.BlockchainErrorCode.AR_CANNOT_CONNECT_RPC_URL)
                            action();
                        else
                            reject(e);
                    }
                });
                action();
            });
        });
    }
    send(options, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const estimateGas = options.estimateGas || (yield this.estimateGas(options, ...args));
            const { web3, wallet, gasPrice, gasLimit, func } = estimateGas;
            let isHasError = false;
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let transactionHash;
                const handleOnSubmitted = (transactionHashReceived) => {
                    transactionHash = transactionHashReceived;
                    if (options.onSubmitted && !isHasError) {
                        options.onSubmitted(transactionHashReceived);
                    }
                };
                func(...(options.args || args))
                    .send(Object.assign({ from: wallet, gas: gasLimit.toString(), gasPrice: gasPrice }, options.params))
                    .on('transactionHash', function (transactionHashReceived) {
                    handleOnSubmitted(transactionHashReceived);
                })
                    .then((res) => __awaiter(this, void 0, void 0, function* () {
                    if (this.chain.chainId === types_1.ChainId.FANTOM)
                        yield (0, utils_1.wait)(5000);
                    else if (this.chain.chainId === types_1.ChainId.POLYGON)
                        yield (0, utils_1.wait)(3000);
                    else if (options.delayInSeconds)
                        yield (0, utils_1.wait)(options.delayInSeconds * 1000);
                    else
                        yield (0, utils_1.wait)(1000);
                    if (this.captureTransaction)
                        this.captureTransaction(res);
                    resolve(res);
                }))
                    .catch((error) => {
                    const e = (0, utils_1.parseBlockchainError)({ type: 'WRITE', error, web3, transactionHash, method: options.method, wallet, args });
                    isHasError = true;
                    this.trackError(e);
                    reject(e);
                });
            }));
        });
    }
    sign(options) {
        let contractEstimateGas = undefined;
        const send = () => __awaiter(this, void 0, void 0, function* () { return this.send(Object.assign(Object.assign({}, options), { estimateGas: contractEstimateGas })); });
        const estimateGas = () => __awaiter(this, void 0, void 0, function* () {
            return this.estimateGas(options)
                .then((res) => {
                // contractEstimateGas = res;
                return {
                    fee: res.fee,
                    gasLimit: res.gasLimit,
                    gasPrice: res.gasPrice,
                };
            });
        });
        return {
            send,
            estimateGas,
        };
    }
    signApproval(operatorContract, amount, auth) {
        const wallet = this.wallet || (auth === null || auth === void 0 ? void 0 : auth.wallet);
        const sendOptions = {
            method: 'approve',
            auth,
            args: [
                operatorContract.address,
                "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
            ]
        };
        const beforeEach = () => __awaiter(this, void 0, void 0, function* () {
            if (!wallet)
                throw new types_1.BlockchainError({
                    code: types_1.BlockchainErrorCode.MUST_BE_CONNECT_WALLET,
                    message: 'Must be connect wallet before.'
                });
            const allowance = yield this.call({
                method: 'allowance',
                args: [wallet, operatorContract.address]
            })
                .then(res => this.fromWei(res));
            return allowance < amount;
        });
        const send = () => __awaiter(this, void 0, void 0, function* () {
            const isNeedToApprove = yield beforeEach();
            if (!isNeedToApprove)
                return;
            return this.send(sendOptions);
        });
        const estimateGas = () => __awaiter(this, void 0, void 0, function* () {
            const isNeedToApprove = yield beforeEach();
            if (!isNeedToApprove)
                return {
                    fee: 0,
                    gasLimit: 0,
                    gasPrice: 0,
                };
            return this.estimateGas(sendOptions)
                .then((res) => ({
                fee: res.fee,
                gasLimit: res.gasLimit,
                gasPrice: res.gasPrice,
            }));
        });
        return {
            send,
            estimateGas,
        };
    }
    signApprovalForAll(operatorContract, auth) {
        const wallet = this.wallet || (auth === null || auth === void 0 ? void 0 : auth.wallet);
        const sendOptions = {
            method: 'setApprovalForAll',
            auth,
            args: [operatorContract.address, true],
        };
        const beforeEach = () => __awaiter(this, void 0, void 0, function* () {
            if (!wallet)
                throw new types_1.BlockchainError({
                    code: types_1.BlockchainErrorCode.MUST_BE_CONNECT_WALLET,
                    message: 'Must be connect wallet before.'
                });
            const isApprovedForAll = yield this.call({
                method: "isApprovedForAll",
                args: [wallet, operatorContract.address]
            });
            return !isApprovedForAll;
        });
        const send = () => __awaiter(this, void 0, void 0, function* () {
            const isNeedToApprove = yield beforeEach();
            if (!isNeedToApprove)
                return;
            return this.send(sendOptions);
        });
        const estimateGas = () => __awaiter(this, void 0, void 0, function* () {
            const isNeedToApprove = yield beforeEach();
            if (!isNeedToApprove)
                return {
                    fee: 0,
                    gasLimit: 0,
                    gasPrice: 0,
                };
            return this.estimateGas(sendOptions)
                .then((res) => ({
                fee: res.fee,
                gasLimit: res.gasLimit,
                gasPrice: res.gasPrice,
            }));
        });
        return {
            send,
            estimateGas,
        };
    }
    approval(operatorContract, amount, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof amount !== 'number')
                throw Error("Amount must be number.");
            if (Number(amount) <= 0)
                return true;
            const wallet = this.wallet || ((_a = options === null || options === void 0 ? void 0 : options.auth) === null || _a === void 0 ? void 0 : _a.wallet);
            if (!wallet)
                throw new types_1.BlockchainError({
                    code: types_1.BlockchainErrorCode.MUST_BE_CONNECT_WALLET,
                    message: 'Must be connect wallet before.'
                });
            // Check allowance
            const allowance = yield this.call({
                method: 'allowance',
                args: [wallet, operatorContract.address]
            })
                .then(res => this.fromWei(res));
            if (allowance < amount) {
                // const amountInWei = await this.toWei(amount);
                // Approve if not enough
                const sendOptions = Object.assign(Object.assign({ method: 'approve' }, options), { args: [
                        operatorContract.address,
                        "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
                    ] });
                yield this.send(sendOptions);
            }
            return true;
        });
    }
    approvalAll(operatorContract, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = this.wallet || ((_a = options === null || options === void 0 ? void 0 : options.auth) === null || _a === void 0 ? void 0 : _a.wallet);
            if (!wallet)
                throw new types_1.BlockchainError({
                    code: types_1.BlockchainErrorCode.MUST_BE_CONNECT_WALLET,
                    message: 'Must be connect wallet before.'
                });
            const isApprovedForAll = yield this.call({ method: "isApprovedForAll" }, wallet, operatorContract.address);
            if (isApprovedForAll)
                return true;
            return this.send(Object.assign({ method: 'setApprovalForAll' }, options), operatorContract.address, true)
                .then(() => true)
                .catch(() => {
                throw new types_1.BlockchainError({ code: types_1.BlockchainErrorCode.APPROVAL_FAILED });
            });
        });
    }
    trackError(error) {
        var _a;
        const ignoreCode = [
            types_1.BlockchainErrorCode.USER_REJECTED,
            types_1.BlockchainErrorCode.AR_CANNOT_CONNECT_RPC_URL,
        ];
        if (error.code && ignoreCode.includes(error.code))
            return;
        const content = `
    <strong>🤖 [Blockchain Error] ${exports.version}</strong>
    • Chain: ${`${this.chain.name} ${this.chain.chainId}`}
    • Contract: ${`${this.name} <a href="${`${this.chain.urlBlockExplorer}/address/${this.address}`}">${this.address}</a>`}
    • Provider: ${error.provider}
    • From: ${typeof window === 'undefined' ? `Server ${((_a = process.env) === null || _a === void 0 ? void 0 : _a.PUBLIC_URL) || ''}` : `Client ${window.location.href}`}
    • Wallet: ${this.wallet || 'NONE'}
    • Type: ${error.type}
    • Method: ${error.method}
    • Args: ${error.args}
    • Code: ${error.code}
    • TransactionHash: ${error.transactionHash ? `<a href="${this.chain.urlBlockExplorer}/tx/${error.transactionHash}">${error.transactionHash}</a>` : 'NONE'}
    • Error: ${typeof error.error === 'object' ? error.error.message : error.error}
  `;
        // console.warn(content);
        logs_1.BlockchainLogs.sendTelegram(content);
    }
    getContractName() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.call({ method: 'name' }).catch(() => '');
        });
    }
    static ref(chainId, contractAddress) {
        if (!contractAddress || !web3_1.default.utils.isAddress(contractAddress))
            return `${chainId}-${Date.now()}`;
        return `${chainId}-${contractAddress}`;
    }
    getTokenUnit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.tokenUnit)
                return this.tokenUnit;
            yield this.call({ method: 'decimals' })
                .then((decimals) => {
                if (+decimals === 18)
                    this.tokenUnit = types_1.TokenUnit.ether;
                else if (+decimals === 31)
                    this.tokenUnit = types_1.TokenUnit.tether;
                else if (+decimals === 25)
                    this.tokenUnit = types_1.TokenUnit.mether;
                else if (+decimals === 21)
                    this.tokenUnit = types_1.TokenUnit.kether;
                else if (+decimals === 15)
                    this.tokenUnit = types_1.TokenUnit.finney;
                else if (+decimals === 12)
                    this.tokenUnit = types_1.TokenUnit.szabo;
                else if (+decimals === 9)
                    this.tokenUnit = types_1.TokenUnit.gwei;
                else if (+decimals === 6)
                    this.tokenUnit = types_1.TokenUnit.mwei;
                else if (+decimals === 3)
                    this.tokenUnit = types_1.TokenUnit.kwei;
                else
                    this.tokenUnit = types_1.TokenUnit.ether;
            })
                .catch(() => {
                this.tokenUnit = types_1.TokenUnit.ether;
            });
            const ref = Contract.ref(this.chain.chainId, this.address);
            contractTokenUnits[ref] = this.tokenUnit;
            return this.tokenUnit;
        });
    }
    decodeAmount(value) {
        return +web3_1.default.utils.fromWei(`${value}`);
    }
    encodeAmount(value) {
        return web3_1.default.utils.toWei(`${value}`);
    }
    fromWei(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenUnit = yield this.getTokenUnit();
            return +web3_1.default.utils.fromWei(amount, tokenUnit);
        });
    }
    toWei(amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenUnit = yield this.getTokenUnit();
            return web3_1.default.utils.toWei(`${amount}`, tokenUnit);
        });
    }
    parseTransaction(transactionData, receiptData) {
        return __awaiter(this, void 0, void 0, function* () {
            const web3 = yield this.getWeb3();
            const transactionHash = typeof transactionData === 'string' ? transactionData : transactionData.hash;
            const [transaction, receipt] = yield Promise.all([
                (() => __awaiter(this, void 0, void 0, function* () {
                    if (typeof transactionData === 'string')
                        return web3.eth.getTransaction(transactionHash);
                    return transactionData;
                }))(),
                (() => __awaiter(this, void 0, void 0, function* () {
                    if (receiptData)
                        return receiptData;
                    return web3.eth.getTransactionReceipt(transactionHash);
                }))(),
            ]);
            const data = (0, utils_1.parseEvent)(this.abi, this.address, receipt);
            return Object.assign(Object.assign(Object.assign(Object.assign({}, transaction), receipt), data), { from: web3_1.default.utils.toChecksumAddress(transaction.from), to: transaction.to ? web3_1.default.utils.toChecksumAddress(transaction.to) || '' : '' });
        });
    }
}
exports.Contract = Contract;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zaGFyZWQvYmxvY2tjaGFpbi9jb250cmFjdHMvY29yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBd0I7QUFFeEIsc0NBQW1DO0FBQ25DLGtDQUF5QztBQUN6QyxvQ0FHa0I7QUFDbEIsb0NBQStGO0FBRy9GLElBQUksa0JBQWtCLEdBQWlDLEVBQUUsQ0FBQztBQUM3QyxRQUFBLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFFL0IsTUFBYSxRQUFRO0lBYW5CLFlBQVksT0FBK0I7UUFOM0MsWUFBTyxHQUFHLEVBQUUsQ0FBQztRQU9YLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxVQUFVLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3BGLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxlQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFFLENBQUM7UUFDOUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQztRQUN6QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDO1FBRXJELE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FB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