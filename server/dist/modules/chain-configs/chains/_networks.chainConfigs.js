"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.networkChainConfigs = exports.ethwChainConfigs = exports.bscTestnetChainConfigs = exports.bscChainConfigs = exports.fantomChainConfigs = void 0;
const types_1 = require("../../blockchain/types");
exports.fantomChainConfigs = {
    chainId: types_1.ChainId.FANTOM,
    chainName: 'Fantom Opera',
    chainNameShort: 'Fantom',
    linkDocs: 'https://docs.fantom.foundation/tutorials/set-up-metamask',
    rpcUrl: 'https://rpc.ankr.com/fantom',
    blockExplorerUrl: 'https://ftmscan.com',
    nativeCurrency: {
        name: 'FTM',
        symbol: 'FTM',
        decimals: 18,
    }
};
exports.bscChainConfigs = {
    chainId: types_1.ChainId.BSC,
    chainName: 'Binance Smart Chain',
    chainNameShort: 'BSC',
    linkDocs: 'https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain',
    rpcUrl: 'https://bscrpc.com',
    blockExplorerUrl: 'https://bscscan.com',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
    }
};
exports.bscTestnetChainConfigs = {
    chainId: types_1.ChainId.BSC_TESTNET,
    chainName: 'BSC Testnet',
    chainNameShort: 'BSCTest',
    linkDocs: 'https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    blockExplorerUrl: 'https://testnet.bscscan.com',
    nativeCurrency: {
        name: 'BNB',
        symbol: 'BNB',
        decimals: 18,
    }
};
exports.ethwChainConfigs = {
    chainId: types_1.ChainId.ETHW,
    chainName: 'EthereumPow',
    chainNameShort: 'ETHW',
    linkDocs: 'https://linktr.ee/ethw',
    rpcUrl: 'https://mainnet.ethereumpow.org',
    blockExplorerUrl: 'https://www.oklink.com/en/ethw',
    nativeCurrency: {
        name: 'ETHW',
        symbol: 'ETHW',
        decimals: 18,
    }
};
exports.networkChainConfigs = {
    fantom: exports.fantomChainConfigs,
    bsc: exports.bscChainConfigs,
    bscTestnet: exports.bscTestnetChainConfigs,
    ethw: exports.ethwChainConfigs,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX25ldHdvcmtzLmNoYWluQ29uZmlncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL2NoYWluLWNvbmZpZ3MvY2hhaW5zL19uZXR3b3Jrcy5jaGFpbkNvbmZpZ3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsa0RBQWdEO0FBR25DLFFBQUEsa0JBQWtCLEdBQXFCO0lBQ2xELE9BQU8sRUFBRSxlQUFPLENBQUMsTUFBTTtJQUN2QixTQUFTLEVBQUUsY0FBYztJQUN6QixjQUFjLEVBQUUsUUFBUTtJQUN4QixRQUFRLEVBQUUsMERBQTBEO0lBQ3BFLE1BQU0sRUFBRSw2QkFBNkI7SUFDckMsZ0JBQWdCLEVBQUUscUJBQXFCO0lBQ3ZDLGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxLQUFLO1FBQ1gsTUFBTSxFQUFFLEtBQUs7UUFDYixRQUFRLEVBQUUsRUFBRTtLQUNiO0NBQ0YsQ0FBQTtBQUVZLFFBQUEsZUFBZSxHQUFxQjtJQUMvQyxPQUFPLEVBQUUsZUFBTyxDQUFDLEdBQUc7SUFDcEIsU0FBUyxFQUFFLHFCQUFxQjtJQUNoQyxjQUFjLEVBQUUsS0FBSztJQUNyQixRQUFRLEVBQUUsb0ZBQW9GO0lBQzlGLE1BQU0sRUFBRSxvQkFBb0I7SUFDNUIsZ0JBQWdCLEVBQUUscUJBQXFCO0lBQ3ZDLGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxLQUFLO1FBQ1gsTUFBTSxFQUFFLEtBQUs7UUFDYixRQUFRLEVBQUUsRUFBRTtLQUNiO0NBQ0YsQ0FBQTtBQUVZLFFBQUEsc0JBQXNCLEdBQXFCO0lBQ3RELE9BQU8sRUFBRSxlQUFPLENBQUMsV0FBVztJQUM1QixTQUFTLEVBQUUsYUFBYTtJQUN4QixjQUFjLEVBQUUsU0FBUztJQUN6QixRQUFRLEVBQUUsb0ZBQW9GO0lBQzlGLE1BQU0sRUFBRSxnREFBZ0Q7SUFDeEQsZ0JBQWdCLEVBQUUsNkJBQTZCO0lBQy9DLGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxLQUFLO1FBQ1gsTUFBTSxFQUFFLEtBQUs7UUFDYixRQUFRLEVBQUUsRUFBRTtLQUNiO0NBQ0YsQ0FBQTtBQUVZLFFBQUEsZ0JBQWdCLEdBQXFCO0lBQ2hELE9BQU8sRUFBRSxlQUFPLENBQUMsSUFBSTtJQUNyQixTQUFTLEVBQUUsYUFBYTtJQUN4QixjQUFjLEVBQUUsTUFBTTtJQUN0QixRQUFRLEVBQUUsd0JBQXdCO0lBQ2xDLE1BQU0sRUFBRSxpQ0FBaUM7SUFDekMsZ0JBQWdCLEVBQUUsZ0NBQWdDO0lBQ2xELGNBQWMsRUFBRTtRQUNkLElBQUksRUFBRSxNQUFNO1FBQ1osTUFBTSxFQUFFLE1BQU07UUFDZCxRQUFRLEVBQUUsRUFBRTtLQUNiO0NBQ0YsQ0FBQTtBQUVZLFFBQUEsbUJBQW1CLEdBQUc7SUFDakMsTUFBTSxFQUFFLDBCQUFrQjtJQUMxQixHQUFHLEVBQUUsdUJBQWU7SUFDcEIsVUFBVSxFQUFFLDhCQUFzQjtJQUNsQyxJQUFJLEVBQUUsd0JBQWdCO0NBQ3ZCLENBQUEifQ==