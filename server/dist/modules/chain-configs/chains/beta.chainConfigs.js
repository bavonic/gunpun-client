"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.betaChainConfigs = exports.betaChainEthwConfig = exports.betaChainBscConfig = void 0;
const _networks_chainConfigs_1 = require("./_networks.chainConfigs");
exports.betaChainBscConfig = {
    env: 'beta',
    information: _networks_chainConfigs_1.networkChainConfigs.bsc,
    urlChainApi: 'https://beta-bsc-api.mesea.io',
    urlMainApi: 'https://beta-api-worker.mesea.io',
};
exports.betaChainEthwConfig = {
    env: 'beta',
    information: _networks_chainConfigs_1.networkChainConfigs.ethw,
    urlChainApi: 'https://beta-ethw-api.mesea.io',
    urlMainApi: 'https://beta-api-worker.mesea.io',
};
exports.betaChainConfigs = [exports.betaChainBscConfig, exports.betaChainEthwConfig];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmV0YS5jaGFpbkNvbmZpZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9jaGFpbi1jb25maWdzL2NoYWlucy9iZXRhLmNoYWluQ29uZmlncy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxRUFBK0Q7QUFHbEQsUUFBQSxrQkFBa0IsR0FBbUI7SUFDaEQsR0FBRyxFQUFFLE1BQU07SUFDWCxXQUFXLEVBQUUsNENBQW1CLENBQUMsR0FBRztJQUNwQyxXQUFXLEVBQUUsK0JBQStCO0lBQzVDLFVBQVUsRUFBRSxrQ0FBa0M7Q0FDL0MsQ0FBQTtBQUVZLFFBQUEsbUJBQW1CLEdBQW1CO0lBQ2pELEdBQUcsRUFBRSxNQUFNO0lBQ1gsV0FBVyxFQUFFLDRDQUFtQixDQUFDLElBQUk7SUFDckMsV0FBVyxFQUFFLGdDQUFnQztJQUM3QyxVQUFVLEVBQUUsa0NBQWtDO0NBQy9DLENBQUE7QUFFWSxRQUFBLGdCQUFnQixHQUFHLENBQUMsMEJBQWtCLEVBQUUsMkJBQW1CLENBQUMsQ0FBQyJ9