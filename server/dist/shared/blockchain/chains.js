"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chains = exports.chainMeTestnet = exports.chainArbitrum = exports.chainHardhat = exports.chainPolygon = exports.chainFantom = exports.chainBscTestnet = exports.chainBsc = exports.chainEthereum = void 0;
const types_1 = require("./types");
exports.chainEthereum = {
    chainId: types_1.ChainId.ETH,
    name: 'Ethereum',
    rpcURLs: [
        'https://eth.llamarpc.com',
        'https://eth-rpc.gateway.pokt.network',
        'https://rpc.payload.de',
        'https://singapore.rpc.blxrbdn.com',
        'https://cloudflare-eth.com',
    ],
    currency: {
        name: 'ETH',
        decimals: 18,
    },
    urlBlockExplorer: 'https://etherscan.io',
};
exports.chainBsc = {
    chainId: types_1.ChainId.BSC,
    name: 'BNB Smart Chain (BSC)',
    rpcURLs: [
        'https://bscrpc.com',
        'https://bsc-dataseed1.defibit.io',
        'https://bsc-dataseed2.defibit.io',
        'https://bsc-dataseed3.defibit.io',
        'https://bsc-dataseed4.defibit.io',
        'https://bsc-dataseed1.binance.org',
        'https://bsc-dataseed2.binance.org',
        'https://bsc-dataseed3.binance.org',
        'https://bsc-dataseed4.binance.org',
        'https://bsc-dataseed1.ninicoin.io',
        'https://bsc-dataseed2.ninicoin.io',
        'https://bsc-dataseed3.ninicoin.io',
        'https://bsc-dataseed4.ninicoin.io',
        'https://bsc.blockpi.network/v1/rpc/public',
        'https://endpoints.omniatech.io/v1/bsc/mainnet/public',
        'https://1rpc.io/bnb',
        'https://rpc.ankr.com/bsc',
        'https://rpc-bsc.bnb48.club',
        'https://bnb.api.onfinality.io/public',
        'https://bsc-mainnet.gateway.pokt.network/v1/lb/6136201a7bad1500343e248d',
    ],
    currency: {
        name: 'BNB',
        decimals: 18,
    },
    urlBlockExplorer: 'https://bscscan.com',
};
exports.chainBscTestnet = {
    chainId: types_1.ChainId.BSC_TESTNET,
    name: 'BSC Testnet',
    rpcURLs: [
        'https://bsc-testnet.publicnode.com',
        'https://endpoints.omniatech.io/v1/bsc/testnet/public',
        'https://data-seed-prebsc-1-s1.binance.org:8545',
        'https://data-seed-prebsc-1-s2.binance.org:8545',
        'https://data-seed-prebsc-1-s3.binance.org:8545',
        // 'https://data-seed-prebsc-2-s1.binance.org:8545',
        // 'https://data-seed-prebsc-2-s2.binance.org:8545',
        // 'https://data-seed-prebsc-2-s3.binance.org:8545',
        // 'https://bsc-testnet.public.blastapi.io',
    ],
    currency: {
        name: 'tBNB',
        decimals: 18,
    },
    urlBlockExplorer: 'https://testnet.bscscan.com',
};
exports.chainFantom = {
    chainId: types_1.ChainId.FANTOM,
    name: 'Fantom Chain',
    rpcURLs: [
        'https://rpc.ankr.com/fantom',
        'https://rpc.fantom.network',
        'https://rpc2.fantom.network',
        'https://rpcapi.fantom.network',
        'https://rpc.ftm.tools',
    ],
    currency: {
        name: 'FTM',
        decimals: 18,
    },
    urlBlockExplorer: 'https://ftmscan.com',
};
exports.chainPolygon = {
    chainId: types_1.ChainId.POLYGON,
    name: 'Polygon PoS Chain',
    rpcURLs: [
        'https://polygon.llamarpc.com',
        'https://polygon-mainnet.public.blastapi.io',
        'https://polygon-rpc.com',
        'https://endpoints.omniatech.io/v1/matic/mainnet/public',
        'https://matic-mainnet-full-rpc.bwarelabs.com',
    ],
    currency: {
        name: 'MATIC',
        decimals: 18,
    },
    urlBlockExplorer: 'https://polygonscan.com',
};
exports.chainHardhat = {
    chainId: types_1.ChainId.HARDHAT,
    name: 'Hardhat',
    rpcURLs: [
        'http://127.0.0.1:8545',
    ],
    currency: {
        name: 'ETH',
        decimals: 18,
    },
    urlBlockExplorer: 'https://hardhat.com',
};
exports.chainArbitrum = {
    chainId: types_1.ChainId.ARBITRUM,
    name: 'Arbitrum One Mainnet',
    rpcURLs: [
        'https://arb1.arbitrum.io/rpc',
    ],
    currency: {
        name: 'ETH',
        decimals: 18,
    },
    urlBlockExplorer: 'https://arbiscan.io',
};
exports.chainMeTestnet = {
    chainId: types_1.ChainId.ME_TESTNET,
    name: "MeChain",
    rpcURLs: [
        'https://rpc.mechain.network'
    ],
    currency: {
        name: 'MES',
        decimals: 18,
    },
    urlBlockExplorer: 'https://explorer.mechain.network'
};
exports.chains = [
    exports.chainEthereum,
    exports.chainBsc,
    exports.chainBscTestnet,
    exports.chainFantom,
    exports.chainPolygon,
    exports.chainHardhat,
    exports.chainArbitrum,
    exports.chainMeTestnet,
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhaW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9ibG9ja2NoYWluL2NoYWlucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBeUM7QUFFNUIsUUFBQSxhQUFhLEdBQVU7SUFDbEMsT0FBTyxFQUFFLGVBQU8sQ0FBQyxHQUFHO0lBQ3BCLElBQUksRUFBRSxVQUFVO0lBQ2hCLE9BQU8sRUFBRTtRQUNQLDBCQUEwQjtRQUMxQixzQ0FBc0M7UUFDdEMsd0JBQXdCO1FBQ3hCLG1DQUFtQztRQUNuQyw0QkFBNEI7S0FDN0I7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsS0FBSztRQUNYLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFDRCxnQkFBZ0IsRUFBRSxzQkFBc0I7Q0FDekMsQ0FBQTtBQUVZLFFBQUEsUUFBUSxHQUFVO0lBQzdCLE9BQU8sRUFBRSxlQUFPLENBQUMsR0FBRztJQUNwQixJQUFJLEVBQUUsdUJBQXVCO0lBQzdCLE9BQU8sRUFBRTtRQUNQLG9CQUFvQjtRQUNwQixrQ0FBa0M7UUFDbEMsa0NBQWtDO1FBQ2xDLGtDQUFrQztRQUNsQyxrQ0FBa0M7UUFDbEMsbUNBQW1DO1FBQ25DLG1DQUFtQztRQUNuQyxtQ0FBbUM7UUFDbkMsbUNBQW1DO1FBQ25DLG1DQUFtQztRQUNuQyxtQ0FBbUM7UUFDbkMsbUNBQW1DO1FBQ25DLG1DQUFtQztRQUNuQywyQ0FBMkM7UUFDM0Msc0RBQXNEO1FBQ3RELHFCQUFxQjtRQUNyQiwwQkFBMEI7UUFDMUIsNEJBQTRCO1FBQzVCLHNDQUFzQztRQUN0Qyx5RUFBeUU7S0FDMUU7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsS0FBSztRQUNYLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFDRCxnQkFBZ0IsRUFBRSxxQkFBcUI7Q0FDeEMsQ0FBQTtBQUVZLFFBQUEsZUFBZSxHQUFVO0lBQ3BDLE9BQU8sRUFBRSxlQUFPLENBQUMsV0FBVztJQUM1QixJQUFJLEVBQUUsYUFBYTtJQUNuQixPQUFPLEVBQUU7UUFDUCxvQ0FBb0M7UUFDcEMsc0RBQXNEO1FBRXRELGdEQUFnRDtRQUNoRCxnREFBZ0Q7UUFDaEQsZ0RBQWdEO1FBQ2hELG9EQUFvRDtRQUNwRCxvREFBb0Q7UUFDcEQsb0RBQW9EO1FBQ3BELDRDQUE0QztLQUM3QztJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLEVBQUU7S0FDYjtJQUNELGdCQUFnQixFQUFFLDZCQUE2QjtDQUNoRCxDQUFBO0FBRVksUUFBQSxXQUFXLEdBQVU7SUFDaEMsT0FBTyxFQUFFLGVBQU8sQ0FBQyxNQUFNO0lBQ3ZCLElBQUksRUFBRSxjQUFjO0lBQ3BCLE9BQU8sRUFBRTtRQUNQLDZCQUE2QjtRQUM3Qiw0QkFBNEI7UUFDNUIsNkJBQTZCO1FBQzdCLCtCQUErQjtRQUMvQix1QkFBdUI7S0FDeEI7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsS0FBSztRQUNYLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFDRCxnQkFBZ0IsRUFBRSxxQkFBcUI7Q0FDeEMsQ0FBQTtBQUVZLFFBQUEsWUFBWSxHQUFVO0lBQ2pDLE9BQU8sRUFBRSxlQUFPLENBQUMsT0FBTztJQUN4QixJQUFJLEVBQUUsbUJBQW1CO0lBQ3pCLE9BQU8sRUFBRTtRQUNQLDhCQUE4QjtRQUM5Qiw0Q0FBNEM7UUFDNUMseUJBQXlCO1FBQ3pCLHdEQUF3RDtRQUN4RCw4Q0FBOEM7S0FDL0M7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsT0FBTztRQUNiLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFDRCxnQkFBZ0IsRUFBRSx5QkFBeUI7Q0FDNUMsQ0FBQTtBQUVZLFFBQUEsWUFBWSxHQUFVO0lBQ2pDLE9BQU8sRUFBRSxlQUFPLENBQUMsT0FBTztJQUN4QixJQUFJLEVBQUUsU0FBUztJQUNmLE9BQU8sRUFBRTtRQUNQLHVCQUF1QjtLQUN4QjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxLQUFLO1FBQ1gsUUFBUSxFQUFFLEVBQUU7S0FDYjtJQUNELGdCQUFnQixFQUFFLHFCQUFxQjtDQUN4QyxDQUFBO0FBRVksUUFBQSxhQUFhLEdBQVU7SUFDbEMsT0FBTyxFQUFFLGVBQU8sQ0FBQyxRQUFRO0lBQ3pCLElBQUksRUFBRSxzQkFBc0I7SUFDNUIsT0FBTyxFQUFFO1FBQ1AsOEJBQThCO0tBQy9CO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLEtBQUs7UUFDWCxRQUFRLEVBQUUsRUFBRTtLQUNiO0lBQ0QsZ0JBQWdCLEVBQUUscUJBQXFCO0NBQ3hDLENBQUE7QUFFWSxRQUFBLGNBQWMsR0FBVTtJQUNuQyxPQUFPLEVBQUUsZUFBTyxDQUFDLFVBQVU7SUFDM0IsSUFBSSxFQUFFLFNBQVM7SUFDZixPQUFPLEVBQUU7UUFDUCw2QkFBNkI7S0FDOUI7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsS0FBSztRQUNYLFFBQVEsRUFBRSxFQUFFO0tBQ2I7SUFDRCxnQkFBZ0IsRUFBRSxrQ0FBa0M7Q0FDckQsQ0FBQTtBQUVZLFFBQUEsTUFBTSxHQUFZO0lBQzdCLHFCQUFhO0lBQ2IsZ0JBQVE7SUFDUix1QkFBZTtJQUNmLG1CQUFXO0lBQ1gsb0JBQVk7SUFDWixvQkFBWTtJQUNaLHFCQUFhO0lBQ2Isc0JBQWM7Q0FDZixDQUFBIn0=