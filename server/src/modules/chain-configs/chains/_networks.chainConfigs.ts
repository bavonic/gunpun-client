import { ChainId } from '../../blockchain/types'
import { ChainInformation } from '../types'

export const fantomChainConfigs: ChainInformation = {
  chainId: ChainId.FANTOM,
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
}

export const bscChainConfigs: ChainInformation = {
  chainId: ChainId.BSC,
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
}

export const bscTestnetChainConfigs: ChainInformation = {
  chainId: ChainId.BSC_TESTNET,
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
}

export const ethwChainConfigs: ChainInformation = {
  chainId: ChainId.ETHW,
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
}

export const networkChainConfigs = {
  fantom: fantomChainConfigs,
  bsc: bscChainConfigs,
  bscTestnet: bscTestnetChainConfigs,
  ethw: ethwChainConfigs,
}