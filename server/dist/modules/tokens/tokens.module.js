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
exports.TokenModule = void 0;
const chain_configs_1 = require("../chain-configs");
const axios_1 = __importDefault(require("axios"));
class TokenModule {
    static getDetail(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const chain = (0, chain_configs_1.getChainConfig)(query.chainId);
            const response = yield axios_1.default.get(chain.urlMainApi + `/api/tokens/${query.contractAddress}/${query.tokenId}`, {
                headers: {
                    ['chain-id']: query.chainId,
                },
            });
            return response.data;
        });
    }
}
exports.TokenModule = TokenModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5zLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL3Rva2Vucy90b2tlbnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG9EQUFrRDtBQUVsRCxrREFBMEI7QUFFMUIsTUFBYSxXQUFXO0lBQ3RCLE1BQU0sQ0FBTyxTQUFTLENBQUMsS0FBaUI7O1lBQ3RDLE1BQU0sS0FBSyxHQUFHLElBQUEsOEJBQWMsRUFBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUMsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsZUFBZSxLQUFLLENBQUMsZUFBZSxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDM0csT0FBTyxFQUFFO29CQUNQLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxDQUFDLE9BQU87aUJBQzVCO2FBQ0YsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7S0FBQTtDQUNGO0FBVkQsa0NBVUMifQ==