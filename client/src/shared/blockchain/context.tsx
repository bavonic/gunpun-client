import { UniPassProvider } from "@unipasswallet/ethereum-provider"
import { createContext, FC, useContext, useEffect, useState } from 'react'
import { chains } from './chains'
import { BlockChainContext, BlockchainError, BlockchainErrorCode, BlockChainProviderProps, BlockchainStats, ChainId, ConnectChain, ConnectWallet, GetContract, GetContractERC1155, GetContractERC20, GetContractERC721, Provider, ProviderType, TokenInformation, } from './types'
import { Contract } from "./contracts/core"
import Web3 from "web3"
import { ContractERC1155 } from "./contracts/ERC1155"
import { ContractERC20 } from "./contracts/ERC20"
import { ContractERC721 } from "./contracts/ERC721"

export const blockChainContext = createContext({} as BlockChainContext)

export let getWallet: () => string | undefined = () => undefined
export let getProvider: () => Provider | undefined = () => ({} as any)
export let connectWallet: ConnectWallet
export let connectChain: ConnectChain
export let disconnect: () => void
export let getContract: GetContract
export let getContractERC20: GetContractERC20
export let getContractERC721: GetContractERC721
export let getContractERC1155: GetContractERC1155

let upProvider: UniPassProvider | undefined;

export const BlockChainProvider: FC<BlockChainProviderProps> = (props) => {
  const [version, update] = useState(1)
  const forceUpdate = () => update(Date.now())

  const [isInitialized, setIsInitialized] = useState(false)
  const [stats, setStats] = useState<BlockchainStats>({})

  const setup = async (
    provider: any,
    providerType: ProviderType,
    forceChainId?: ChainId
  ) => {
    const web3 = new Web3(provider)
    let chainId = (await web3.eth.getChainId()).toString() as ChainId
    const accounts = await web3.eth.getAccounts()
    const wallet = web3.utils.toChecksumAddress(accounts[0])

    if (forceChainId && forceChainId !== chainId) {
      await connectChain(forceChainId).catch(() => false)
      chainId = (await web3.eth.getChainId()).toString() as ChainId
    }

    setStats((s) => ({ ...s, chainId, wallet, provider, providerType, }))
    setIsInitialized(true)

    return { chainId, wallet, provider, providerType }
  }

  const getUniPassProvider = () => {
    if (upProvider) return upProvider

    upProvider = new UniPassProvider({
      chainId: 97,
      returnEmail: false,
    });

    return upProvider;
  }

  const initProvider = async (type?: ProviderType) => {
    const isMetamaskDisabled = localStorage.getItem("metamask_logout");
    // ============================ Metamask ============================
    if ((!type || type === 'metamask') && !isMetamaskDisabled) {
      const { ethereum } = window as any;
      if (ethereum) return setup(ethereum, 'metamask');
    }
    // ============================ WalletConnect ============================
    if (!type || type === 'walletconnect') {
      // const walletConnectProvider = await getWalletConnectProvider();
      // if (walletConnectProvider) return setup(walletConnectProvider, "walletconnect");
      throw new Error("Not implement")
    }
    // ============================ UniPass ============================
    if (!type || type === 'unipass') {
      const unipassProvider = getUniPassProvider();
      if (unipassProvider) {
        await unipassProvider.connect();
        return setup(unipassProvider, "unipass");
      }
    }
  }

  const initialize = async () => {
    try {
      const osWallet = localStorage.getItem('os_wallet')
      await initProvider(osWallet as ProviderType);
      // ============================ Nothing ============================
      return setIsInitialized(true);
    } catch (error) {
      setIsInitialized(true)
    }
  }

  connectWallet = async (type: ProviderType, forceChainId?: ChainId) => {
    try {
      // ============================ UniPass ============================
      if (type === 'unipass') {
        localStorage.setItem("os_wallet", "unipass");
        const provider = getUniPassProvider();
        if (provider) await provider.connect();
        const data = await setup(provider, 'unipass', forceChainId);
        return data.wallet!;
      }

      // ============================ WalletConnect ============================
      if (type === 'walletconnect') {
        throw new Error("Not implement")
        // localStorage.setItem("os_wallet", "walletconnect");
        // const provider = await getWalletConnectProvider();
        // if (provider) await provider.enable();
        // const data = await setup(provider, 'walletconnect', forceChainId);
        // return data.wallet!;
      }

      // ============================ Metamask ============================
      if (type === 'metamask') {
        localStorage.setItem("os_wallet", "metamask");
        localStorage.removeItem('metamask_logout')
        const { ethereum } = window as any;
        if (!ethereum) throw Error("Please Install Metamask Extension");
        await ethereum.request({ method: 'eth_requestAccounts' });

        const data = await setup(ethereum, 'metamask', forceChainId);
        return data.wallet!;
      }
    } catch (error) {
      console.error(error);
      if (error instanceof BlockchainError) throw error;
      if (error && typeof error === 'object' && (error as any).code === -32002) {
        throw new BlockchainError({ message: 'A request has been sent to Metamask, please help me check!', code: BlockchainErrorCode.METAMASK_ALREADY_SENT_A_REQUEST });
      } else {
        throw new BlockchainError({ message: 'Something went wrong when connect wallet with Metamask', code: BlockchainErrorCode.METAMASK_CANNOT_CONNECTED });
      }
    }
  }

  connectChain = async (chainId) => {
    if (chainId === stats.chainId) return;
    const chain = chains.find((v) => v.chainId === chainId)!
    if (!chain) throw Error('Chain does not supported yet!')

    await stats.provider
      .request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${(+chain.chainId).toString(16)}`,
            chainName: chain.name,
            rpcUrls: [chain.rpcURLs[0]],
            nativeCurrency: {
              name: chain.currency.name,
              symbol: chain.currency.name,
              decimals: chain.currency.decimals,
            },
            blockExplorerUrls: [chain.urlBlockExplorer],
          },
        ],
      })
      .catch(() => {
        throw new BlockchainError({
          code: BlockchainErrorCode.CANNOT_CONNECT_NETWORK,
          message: 'Cannot connect network',
        })
      })

    const web3 = new Web3(stats.provider);
    let newChainId = (await web3.eth.getChainId()).toString() as ChainId
    if (newChainId !== chainId) throw new BlockchainError({
      code: BlockchainErrorCode.CANNOT_CONNECT_NETWORK,
    })
    setStats((s) => ({ ...s, chainId: newChainId, chain: chain }))
    forceUpdate()
  }

  getContract = (params) => {
    const chainId = params.chainId || (stats.chainId as ChainId)
    return new Contract({
      ...props,
      wallet: stats.wallet,
      provider: stats.provider,
      ...params,
      chainId,
    })
  }

  getContractERC20 = (params) => {
    const chainId = params.chainId || (stats.chainId as ChainId)
    return new ContractERC20({
      ...props,
      wallet: stats.wallet,
      provider: stats.provider,
      ...params,
      chainId,
    })
  }

  getContractERC721 = (params) => {
    const chainId = params.chainId || (stats.chainId as ChainId)
    return new ContractERC721({
      ...props,
      wallet: stats.wallet,
      provider: stats.provider,
      ...params,
      chainId,
    })
  }

  getContractERC1155 = (params) => {
    const chainId = params.chainId || (stats.chainId as ChainId)
    return new ContractERC1155({
      ...props,
      wallet: stats.wallet,
      provider: stats.provider,
      ...params,
      chainId,
    })
  }

  const disconnect = () => {
    localStorage.removeItem("os_wallet");

    // ============================ Metamask ============================
    if (stats.providerType === 'metamask') {
      localStorage.setItem("metamask_disabled", "true");
    }
    // ============================ WalletConnect ============================

    if (stats.providerType === 'walletconnect') {
      localStorage.removeItem("use_wallet_connect");
      localStorage.removeItem("walletconnect");
    }

    if (stats.providerType === 'unipass') {
      localStorage.setItem("unipass_disabled", "true");
    }

    setStats({})
  }

  const addToken = async (tokenInfo: TokenInformation) => {
    try {
      const options = {
        address: tokenInfo.address,
        symbol: tokenInfo.symbol,
        decimals: tokenInfo.decimals || 18,
        image: tokenInfo.image,
      }

      // Metamask
      const { ethereum } = window as any
      if (ethereum) {
        await ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options,
          },
        })
      } else {
        throw Error('Not implement yet!')
      }
    } catch (error) {
      throw new BlockchainError({
        message: 'Cannot add asset',
        code: BlockchainErrorCode.CANNOT_ADD_ASSET,
      })
    }
  }

  useEffect(() => {
    const provider = stats.provider
    if (provider) {
      const handleChangeAccount = (accounts: string[]) => {
        const wallet = accounts[0]
          ? Web3.utils.toChecksumAddress(accounts[0])
          : undefined
        setStats((s) => ({ ...s, wallet }))
        forceUpdate()
      }

      const handleChangeChain = async () => {
        const web3 = new Web3(provider)
        const chainId = (await web3.eth.getChainId()).toString() as ChainId
        setStats((s) => ({ ...s, chainId }))
        forceUpdate()
      }

      provider.on('accountsChanged', handleChangeAccount)
      provider.on('chainChanged', handleChangeChain)

      return () => {
        provider.removeListener('accountsChanged', handleChangeAccount)
        provider.removeListener('chainChanged', handleChangeChain)
      }
    }
  }, [version, isInitialized, stats.provider])

  useEffect(() => {
    initialize()
  }, [])

  const context: BlockChainContext = {
    ...stats,
    isInitialized,
    connectWallet,
    connectChain,
    addToken,
    disconnect,
    configs: props,
    getContract: function (params: {
      address: string; abi: any[]
      name?: string; chainId?: ChainId
    }): Contract {
      throw new Error("Function not implemented.")
    }
  }

  return (
    <blockChainContext.Provider value={context}>
      {props.children}
    </blockChainContext.Provider>
  )
}

export const useBlockchain = () => useContext(blockChainContext)

// export const renderLinkContract = (address: string, chainId: ChainId) => {
//   const chain = chains.find((v) => v.chainId === chainId)
//   if (chain) return `${chain.urlBlockExplorer}/address/${address}`
//   return `${address}`
// }

// export const renderLinkTransaction = (transactionHash: string, chainId?: ChainId) => {
//   const chain = chains.find((v) => v.chainId === chainId)
//   if (chain) return `${chain.urlBlockExplorer}/tx/${transactionHash}`
//   return `${transactionHash}`
// }
