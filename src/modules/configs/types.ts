import { ContractERC1155 } from "shared/blockchain/contracts/ERC1155"
import { ContractERC20 } from "shared/blockchain/contracts/ERC20"
import { ContractERC721 } from "shared/blockchain/contracts/ERC721"
import { Contract } from "shared/blockchain/contracts/core"
import { Chain, ChainId } from "shared/blockchain/types"
import { AppEnv } from "types"

export type EnvConfigs = {
  [key in AppEnv]: Configs
}

export type Configs = {
  URL_SERVER_MAIN: string
  URL_SERVER_GAME: string

  chains: {
    [key in ChainId]?: ChainConfig
  }
}

export interface ChainConfig {
  features: FeatureContracts<string>,
  erc20s: ERC20Contracts<string>,
  erc721s: ERC721Contracts<string>,
  erc1155s: ERC1155Contracts<string>,
}

export interface FeatureContracts<T> {

}

export interface ERC20Contracts<T> {

}

export interface ERC721Contracts<T> {
}

export interface ERC1155Contracts<T> {
}

export type GetConfig = (key: keyof Configs) => any

export interface Contracts {
  isAbleToWrite: boolean,
  features: FeatureContracts<Contract>,
  erc20s: ERC20Contracts<ContractERC20>,
  erc721s: ERC721Contracts<ContractERC721>,
  erc1155s: ERC1155Contracts<ContractERC1155>,
}

export interface ConfigsContext extends Configs {
  isReady: boolean
  // chainId: ChainId
  chain: Chain
  chainSupporteds: Chain[]
  changeChain: (chainId: ChainId) => void
  contracts: Contracts
}

export type ColorShape = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
