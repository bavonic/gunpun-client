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
exports.ContractERC1155 = void 0;
const web3_1 = __importDefault(require("web3"));
const ERC1155_json_1 = __importDefault(require("../abis/ERC1155.json"));
const core_1 = require("./core");
class ContractERC1155 extends core_1.Contract {
    constructor(configs) {
        super(Object.assign(Object.assign({}, configs), { abi: ERC1155_json_1.default }));
    }
    balanceOf(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { owner, tokenId } = params;
            return this.call({ method: "balanceOf", args: [owner, tokenId] })
                .then((res) => +res);
        });
    }
    approve(operator) {
        return __awaiter(this, void 0, void 0, function* () {
            const isApproved = yield this.isApproved({ owner: this.wallet, operator });
            if (isApproved)
                return;
            return this.send({ method: 'setApprovalForAll', args: [operator, true] });
        });
    }
    revokeApproval(operator) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.send({ method: 'setApprovalForAll', args: [operator, false] });
        });
    }
    isApproved(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { owner, operator } = params;
            return this.call({ method: 'isApprovedForAll', args: [owner, operator] });
        });
    }
    transferFrom(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { from, to, tokenId, amount } = params;
            return this.send({ method: 'safeTransferFrom', args: [from, to, tokenId, amount, web3_1.default.utils.stringToHex("")] });
        });
    }
}
exports.ContractERC1155 = ContractERC1155;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRVJDMTE1NS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zaGFyZWQvYmxvY2tjaGFpbi9jb250cmFjdHMvRVJDMTE1NS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBd0I7QUFDeEIsd0VBQStDO0FBQy9DLGlDQUFrQztBQUdsQyxNQUFhLGVBQWdCLFNBQVEsZUFBUTtJQUMzQyxZQUFZLE9BQXdCO1FBQ2xDLEtBQUssaUNBQU0sT0FBTyxLQUFFLEdBQUcsRUFBRSxzQkFBVyxJQUFHLENBQUM7SUFDMUMsQ0FBQztJQUVLLFNBQVMsQ0FBQyxNQUEwQzs7WUFDeEQsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFDbEMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQztpQkFDOUQsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3hCLENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBQyxRQUFnQjs7WUFDNUIsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFPLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUM1RSxJQUFJLFVBQVU7Z0JBQUUsT0FBTztZQUN2QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1RSxDQUFDO0tBQUE7SUFFSyxjQUFjLENBQUMsUUFBZ0I7O1lBQ25DLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FBQyxNQUEyQzs7WUFDMUQsTUFBTSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFDbkMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDM0UsQ0FBQztLQUFBO0lBRUssWUFBWSxDQUFDLE1BQXFFOztZQUN0RixNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDO1lBQzdDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsY0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEgsQ0FBQztLQUFBO0NBQ0Y7QUE5QkQsMENBOEJDIn0=