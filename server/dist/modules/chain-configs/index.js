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
Object.defineProperty(exports, "__esModule", { value: true });
exports.chainConfigMiddleware = exports.getChainConfig = exports.chainConfigs = void 0;
const AppConfigs_1 = require("../../AppConfigs");
const utils_1 = require("../../utils");
const beta_chainConfigs_1 = require("./chains/beta.chainConfigs");
const production_chainConfigs_1 = require("./chains/production.chainConfigs");
const staging_chainConfigs_1 = require("./chains/staging.chainConfigs");
exports.chainConfigs = AppConfigs_1.ENV.indexOf('production') !== -1 ? production_chainConfigs_1.productionChainConfigs
    : AppConfigs_1.ENV.indexOf('beta') !== -1 ? beta_chainConfigs_1.betaChainConfigs
        : staging_chainConfigs_1.stagingChainConfigs;
const getChainConfig = (chainId) => {
    if (!chainId)
        throw new utils_1.ServerError(utils_1.ErrorMessage.CHAIN_ID_MUST_BE_PROVIDED, 400);
    const config = exports.chainConfigs.find(v => v.information.chainId === chainId);
    if (!config)
        throw new utils_1.ServerError(utils_1.ErrorMessage.CHAIN_DOES_NOT_SUPPORTED, 400);
    return config;
};
exports.getChainConfig = getChainConfig;
const chainConfigMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const chainId = req.headers["chain-id"];
        const chain = (0, exports.getChainConfig)(chainId);
        res.chain = chain;
        next();
    }
    catch (error) {
        res.onError(error);
    }
});
exports.chainConfigMiddleware = chainConfigMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kdWxlcy9jaGFpbi1jb25maWdzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLGlEQUF1QztBQUN2Qyx1Q0FBd0Q7QUFDeEQsa0VBQThEO0FBQzlELDhFQUEwRTtBQUMxRSx3RUFBb0U7QUFFdkQsUUFBQSxZQUFZLEdBQUcsZ0JBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdEQUFzQjtJQUNuRixDQUFDLENBQUMsZ0JBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLG9DQUFnQjtRQUM3QyxDQUFDLENBQUMsMENBQW1CLENBQUM7QUFFbkIsTUFBTSxjQUFjLEdBQUcsQ0FBQyxPQUFZLEVBQUUsRUFBRTtJQUM3QyxJQUFJLENBQUMsT0FBTztRQUFFLE1BQU0sSUFBSSxtQkFBVyxDQUFDLG9CQUFZLENBQUMseUJBQXlCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakYsTUFBTSxNQUFNLEdBQUcsb0JBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsQ0FBQztJQUN6RSxJQUFJLENBQUMsTUFBTTtRQUFFLE1BQU0sSUFBSSxtQkFBVyxDQUFDLG9CQUFZLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDL0UsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFBO0FBTFksUUFBQSxjQUFjLGtCQUsxQjtBQUVNLE1BQU0scUJBQXFCLEdBQUcsQ0FBTyxHQUFZLEVBQUUsR0FBUSxFQUFFLElBQWtCLEVBQUUsRUFBRTtJQUN4RixJQUFJO1FBQ0YsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQVEsQ0FBQztRQUMvQyxNQUFNLEtBQUssR0FBRyxJQUFBLHNCQUFjLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFDdEMsR0FBRyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbEIsSUFBSSxFQUFFLENBQUM7S0FDUjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNwQjtBQUNILENBQUMsQ0FBQSxDQUFBO0FBVFksUUFBQSxxQkFBcUIseUJBU2pDIn0=