import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react'
import { ChainId } from 'shared/blockchain/types'
import { Configs, ConfigsContext, Contracts, ERC1155Contracts, ERC20Contracts, ERC721Contracts, FeatureContracts, GetConfig } from './types'
import { AppEnv } from 'types'
import { configs as generalConfigs } from './envs'
import { useBlockchain } from 'shared/blockchain/context'
import { chains } from 'shared/blockchain/chains'
import { featureABIs } from './abis'
import { Contract } from 'shared/blockchain/contracts/core'
import { ContractERC1155 } from 'shared/blockchain/contracts/ERC1155'
import { ContractERC20 } from 'shared/blockchain/contracts/ERC20'
import { ContractERC721 } from 'shared/blockchain/contracts/ERC721'

// ============================ Start Static Configurations ============================
export const ENV = `${process.env.NODE_ENV === 'development' ? AppEnv.STAGING : process.env.ENV}`.toUpperCase() as AppEnv
export const PUBLIC_URL = process.env?.PUBLIC_URL || 'http://localhost:3000'
export const APP_NAME = `GUNPUN_${ENV}`
export const IS_DEV = process.env.NODE_ENV === 'development'
export const APP_VERSION = '2.0.0'
// ============================ End Static Configurations ============================

// ============================ Start Functions ============================
export const configsContext = createContext<ConfigsContext>({} as any)
export const appConfigs = generalConfigs[ENV]
export const getConfig: GetConfig = (key: keyof Configs) => appConfigs[key]

export let getChainId: () => ChainId = () => '' as any
export const getChainConfig = (chainId?: ChainId) => {
  const chainConfig = appConfigs.chains[chainId || getChainId()]
  if (!chainConfig) throw Error('Chain is not supported')
  return chainConfig
}
export let getContracts: () => Contracts;
// ============================ End Functions ============================

export const ConfigsProvider: FC<PropsWithChildren<any>> = (props) => {
  const firstChainSupported = Object.keys(appConfigs.chains)[0] as ChainId;
  const blockchain = useBlockchain();

  const defaultStats: { isReady: boolean, chainId: ChainId } = {
    isReady: false,
    chainId: firstChainSupported,
  }
  const [stats, setStats] = useState(defaultStats)

  getChainId = () => stats.chainId

  const changeChain = (newChainId: ChainId) => {
    const isAvailable = !!appConfigs.chains[newChainId]
    if (!isAvailable) return
    localStorage.setItem('chain_id', newChainId)
    setStats((s) => ({ ...s, chainId: newChainId }))
    blockchain.connectChain(newChainId);
  }

  useEffect(() => {
    if (!stats.isReady) {
      let stats = defaultStats

      const chainIdCached = localStorage.getItem('chain_id') as ChainId
      if (chainIdCached) {
        const isChainIdAvailable = appConfigs.chains[chainIdCached]
        if (isChainIdAvailable) stats.chainId = chainIdCached
      }

      setStats({ ...stats, isReady: true })
    }
  }, [stats.isReady])

  const chainSupporteds = chains.filter((v) => !!appConfigs.chains[v.chainId]);
  const chainConfig = appConfigs.chains[stats.chainId];

  const contractFeatures = Object.keys(chainConfig.features).reduce((output, key) => {
    const abi = featureABIs[key];
    output[key] = new Contract({
      abi,
      address: chainConfig.features[key],
      chainId: stats.chainId,
      provider: blockchain.provider,
      name: key,
      wallet: blockchain.wallet,
    })
    return output;
  }, {} as FeatureContracts<Contract>);

  const contractERC721s = Object.keys(chainConfig.erc721s).reduce((output, key) => {
    output[key] = new ContractERC721({
      address: chainConfig.erc721s[key],
      chainId: stats.chainId,
      provider: blockchain.provider,
      name: key,
      wallet: blockchain.wallet,
    })
    return output;
  }, {} as ERC721Contracts<ContractERC721>)

  const contractERC20s = Object.keys(chainConfig.erc20s).reduce((output, key) => {
    output[key] = new ContractERC20({
      address: chainConfig.erc20s[key],
      chainId: stats.chainId,
      provider: blockchain.provider,
      name: key,
      wallet: blockchain.wallet,
    })
    return output;
  }, {} as ERC20Contracts<ContractERC20>)

  const contractERC1155s = Object.keys(chainConfig.erc1155s).reduce((output, key) => {
    output[key] = new ContractERC1155({
      address: chainConfig.erc1155s[key],
      chainId: stats.chainId,
      provider: blockchain.provider,
      name: key,
      wallet: blockchain.wallet,
    })
    return output;
  }, {} as ERC1155Contracts<ContractERC1155>)

  const contracts: Contracts = {
    isAbleToWrite: !!blockchain.provider && !!blockchain.wallet && blockchain.chainId && blockchain.chainId === stats.chainId,
    erc1155s: contractERC1155s,
    erc20s: contractERC20s,
    erc721s: contractERC721s,
    features: contractFeatures,
  }

  getContracts = () => contracts;

  const context: ConfigsContext = {
    ...stats,
    ...appConfigs,
    chainSupporteds,
    changeChain,
    chain: chains.find(v => v.chainId === stats.chainId),
    contracts
  }

  return (
    <configsContext.Provider value={context} >
      {props.children}
    </configsContext.Provider>
  )
}

export const useConfig = () => useContext(configsContext)

// Validation
// if (!Object.values(AppEnv).includes(ENV)) throw Error('Invalid ENV')
