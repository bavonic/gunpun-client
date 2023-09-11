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
exports.ContractERC20 = exports.tokenUnits = void 0;
const web3_1 = __importDefault(require("web3"));
const ERC20_json_1 = __importDefault(require("../abis/ERC20.json"));
const core_1 = require("./core");
const types_1 = require("../types");
exports.tokenUnits = {};
class ContractERC20 extends core_1.Contract {
    constructor(configs) {
        super(Object.assign(Object.assign({}, configs), { abi: ERC20_json_1.default }));
    }
    symbol() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.call({ method: "symbol" });
        });
    }
    balanceOf(address) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.call({ method: "balanceOf", args: [address] })
                .then((res) => this.fromWei(res));
        });
    }
    allowance(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.call({ method: "allowance", args: [params.owner, params.operator] })
                .then((res) => this.fromWei(res));
        });
    }
    transfer(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.wallet)
                throw new types_1.BlockchainError({
                    code: types_1.BlockchainErrorCode.MUST_BE_CONNECT_WALLET,
                    message: 'Must be connect wallet before.'
                });
            if (this.wallet === web3_1.default.utils.toChecksumAddress(params.to))
                throw new types_1.BlockchainError({
                    code: types_1.BlockchainErrorCode.CANNOT_TRANSFER_TO_YOUR_SELF
                });
            const amountInWei = yield this.toWei(params.amount);
            return this.send({ method: "transfer", args: [params.to, amountInWei] });
        });
    }
    approve(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.wallet)
                throw new types_1.BlockchainError({
                    code: types_1.BlockchainErrorCode.MUST_BE_CONNECT_WALLET,
                    message: 'Must be connect wallet before.'
                });
            const allowance = yield this.allowance({ operator: params.operator, owner: this.wallet });
            if (params.amount <= allowance)
                return true;
            const amountInWei = yield this.toWei(params.amount);
            return this.send({ method: 'approve', args: [params.operator, amountInWei] });
        });
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
            const ref = core_1.Contract.ref(this.chain.chainId, this.address);
            exports.tokenUnits[ref] = this.tokenUnit;
            return this.tokenUnit;
        });
    }
}
exports.ContractERC20 = ContractERC20;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRVJDMjAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2hhcmVkL2Jsb2NrY2hhaW4vY29udHJhY3RzL0VSQzIwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF3QjtBQUN4QixvRUFBMkM7QUFDM0MsaUNBQWtDO0FBQ2xDLG9DQUE0RjtBQUVqRixRQUFBLFVBQVUsR0FBaUMsRUFBRSxDQUFDO0FBRXpELE1BQWEsYUFBYyxTQUFRLGVBQVE7SUFDekMsWUFBWSxPQUF3QjtRQUNsQyxLQUFLLGlDQUFNLE9BQU8sS0FBRSxHQUFHLEVBQUUsb0JBQVMsSUFBRyxDQUFDO0lBQ3hDLENBQUM7SUFFSyxNQUFNOztZQUNWLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO1FBQ3hDLENBQUM7S0FBQTtJQUVLLFNBQVMsQ0FBQyxPQUFlOztZQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7aUJBQ3ZELElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ3JDLENBQUM7S0FBQTtJQUVLLFNBQVMsQ0FBQyxNQUEyQzs7WUFDekQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2lCQUM3RSxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNyQyxDQUFDO0tBQUE7SUFFSyxRQUFRLENBQUMs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