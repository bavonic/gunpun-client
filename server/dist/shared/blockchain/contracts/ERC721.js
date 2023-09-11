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
exports.ContractERC721 = void 0;
const web3_1 = __importDefault(require("web3"));
const ERC721_json_1 = __importDefault(require("../abis/ERC721.json"));
const core_1 = require("./core");
class ContractERC721 extends core_1.Contract {
    constructor(configs) {
        super(Object.assign(Object.assign({}, configs), { abi: ERC721_json_1.default }));
    }
    isApproved(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tokenId, operator } = params;
            const owner = yield this.ownerOf(tokenId);
            const isApprovedForAll = yield this.call({ method: 'isApprovedForAll', args: [owner, operator] });
            if (isApprovedForAll)
                return true;
            const addressApproved = yield this.call({ method: 'getApproved', args: [tokenId] });
            return web3_1.default.utils.toChecksumAddress(addressApproved) === web3_1.default.utils.toChecksumAddress(operator);
        });
    }
    revokeApproval(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.send({ method: 'setApprovalForAll', args: [params.operator, false] });
        });
    }
    transferFrom(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { from, to, tokenId } = params;
            return this.send({ method: 'safeTransferFrom', args: [from, to, tokenId, web3_1.default.utils.stringToHex("")] });
        });
    }
    ownerOf(tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.call({ method: 'ownerOf', args: [tokenId] });
        });
    }
    balanceOf(owner) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.call({ method: "balanceOf", args: [owner] })
                .then((res) => +res);
        });
    }
    tokenURI(tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.call({ method: 'tokenURI', args: [tokenId] });
        });
    }
    approve(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tokenId, operator } = params;
            if (tokenId) {
                const isApproved = yield this.isApproved({ tokenId, operator });
                if (isApproved)
                    return true;
            }
            const isApprovedForAll = yield this.call({ method: 'isApprovedForAll', args: [this.wallet, operator] });
            if (isApprovedForAll)
                return true;
            return this.send({ method: 'setApprovalForAll', args: [operator, true] });
        });
    }
}
exports.ContractERC721 = ContractERC721;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRVJDNzIxLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NoYXJlZC9ibG9ja2NoYWluL2NvbnRyYWN0cy9FUkM3MjEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQXdCO0FBQ3hCLHNFQUE2QztBQUM3QyxpQ0FBa0M7QUFHbEMsTUFBYSxjQUFlLFNBQVEsZUFBUTtJQUMxQyxZQUFZLE9BQXdCO1FBQ2xDLEtBQUssaUNBQU0sT0FBTyxLQUFFLEdBQUcsRUFBRSxxQkFBVSxJQUFHLENBQUM7SUFDekMsQ0FBQztJQUVLLFVBQVUsQ0FBQyxNQUE2Qzs7WUFDNUQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFDckMsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDakcsSUFBSSxnQkFBZ0I7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFFbEMsTUFBTSxlQUFlLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUE7WUFDbkYsT0FBTyxjQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxLQUFLLGNBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEcsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUFDLE1BQTRCOztZQUMvQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEYsQ0FBQztLQUFBO0lBRUssWUFBWSxDQUFDLE1BQXFEOztZQUN0RSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFDckMsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLGNBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFHLENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBQyxPQUFlOztZQUMzQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUMxRCxDQUFDO0tBQUE7SUFFSyxTQUFTLENBQUMsS0FBYTs7WUFDM0IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO2lCQUNyRCxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDeEIsQ0FBQztLQUFBO0lBRUssUUFBUSxDQUFDLE9BQWU7O1lBQzVCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQzNELENBQUM7S0FBQTtJQUVLLE9BQU8sQ0FBQyxNQUE4Qzs7WUFDMUQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxNQUFNLENBQUM7WUFFckMsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7Z0JBQ2hFLElBQUksVUFBVTtvQkFBRSxPQUFPLElBQUksQ0FBQzthQUM3QjtZQUVELE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsTUFBTSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFPLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3hHLElBQUksZ0JBQWdCO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBRWxDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLENBQUM7S0FBQTtDQUNGO0FBbERELHdDQWtEQyJ9