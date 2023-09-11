import { ChainId, Chain } from "./types";

export const chainEthereum: Chain = {
  chainId: ChainId.ETH,
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
}

export const chainBsc: Chain = {
  chainId: ChainId.BSC,
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
}

export const chainBscTestnet: Chain = {
  chainId: ChainId.BSC_TESTNET,
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
}

export const chainFantom: Chain = {
  chainId: ChainId.FANTOM,
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
}

export const chainPolygon: Chain = {
  chainId: ChainId.POLYGON,
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
}

export const chainHardhat: Chain = {
  chainId: ChainId.HARDHAT,
  name: 'Hardhat',
  rpcURLs: [
    'http://127.0.0.1:8545',
  ],
  currency: {
    name: 'ETH',
    decimals: 18,
  },
  urlBlockExplorer: 'https://hardhat.com',
}

export const chainArbitrum: Chain = {
  chainId: ChainId.ARBITRUM,
  name: 'Arbitrum One Mainnet',
  rpcURLs: [
    'https://arb1.arbitrum.io/rpc',
  ],
  currency: {
    name: 'ETH',
    decimals: 18,
  },
  urlBlockExplorer: 'https://arbiscan.io',
}

export const chainMeTestnet: Chain = {
  chainId: ChainId.ME_TESTNET,
  name: "MeChain",
  rpcURLs: [
    'https://rpc.mechain.network'
  ],
  currency: {
    name: 'MES',
    decimals: 18,
  },
  urlBlockExplorer: 'https://explorer.mechain.network'
}

export const chains: Chain[] = [
  chainEthereum,
  chainBsc,
  chainBscTestnet,
  chainFantom,
  chainPolygon,
  chainHardhat,
  chainArbitrum,
  chainMeTestnet,
]