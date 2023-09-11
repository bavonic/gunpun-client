export enum ChainId {
  FANTOM = '250',
  BSC = '56',
  BSC_TESTNET = '97',
  ETHW = '10001',
}

export interface ChainInformation {
  chainId: ChainId,
  chainName: string;
  chainNameShort: string;
  linkDocs: string;
  rpcUrl: string;
  blockExplorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  }
}

export type QueryOrderValue = 1 | -1