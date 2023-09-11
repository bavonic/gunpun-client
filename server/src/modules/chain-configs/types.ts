import { ChainId } from "../blockchain/types";

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

export interface AppChainConfig {
  env: 'staging' | 'beta' | 'production',
  urlChainApi: string;
  urlMainApi: string;
  information: ChainInformation,
}