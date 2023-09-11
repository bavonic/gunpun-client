import WalletConnectProvider from "@walletconnect/web3-provider";
import { createContext, FC, useCallback, useContext, useEffect, useState } from "react";
import Web3 from "web3";
import type { provider as Provider } from 'web3-core';
import { chains } from "./chains";
import { Contract } from "./contracts/core";
import {
  BlockChainContext, BlockchainError, BlockchainErrorCode, BlockChainProviderProps, BlockChainState,
  BlockChainStatusCode, Chain, ChainId, ContractConfigs, Contracts,
  HandleConnectNetwork, HandleConnectWallet, ProviderType, TokenInformation, Transaction, UseBlockChain
} from "./types";

export const blockChainContext = createContext({} as BlockChainContext<any>);

export let getWallet: () => string | undefined = () => undefined;
export let getProvider: () => Provider | undefined = () => ({} as any);
export let getChain: () => Chain = () => ({} as any);
export let getChainId: () => ChainId = () => ({} as any);
export let getContracts: () => Contracts<any> = () => ({} as any);
export let handleConnectWallet: HandleConnectWallet;
export let handleConnectNetwork: HandleConnectNetwork;
export let getContract: (params: { address: string, name?: string, abi: any[] }) => Contract;
export let getContractConfigs: (params: { name?: string, address: string, chainId?: ChainId }) => ContractConfigs = () => ({}) as ContractConfigs;

let walletConnectProvider: WalletConnectProvider | undefined;

export const BlockChainProvider: FC<BlockChainProviderProps> = (props) => {
  const chain = chains.find(v => v.chainId === props.chainId)!;
  if (!chain) throw Error(`Chain with id ${props.chainId} not supported!`);

  // eslint-disable-next-line
  const defaultState: BlockChainState = { isInitialized: false };
  const [state, setState] = useState(defaultState);

  const contracts = Object.keys(props.contractConfigs || {}).reduce((output: any, key: string) => {
    const configs = (props.contractConfigs || {})[key];
    const contractConfigs = {
      name: key,
      address: configs.address,
      chainId: props.chainId,
      provider: state.provider,
      wallet: state.wallet,
      rateGas: props.rateGas,
      rateGasPrice: props.rateGasPrice,
      captureTransaction: props.captureTransaction,
    };

    output[key] = new Contract({
      ...contractConfigs,
      abi: configs.abi,
    })

    return output;
  }, {});

  getWallet = () => state.wallet;
  getContracts = () => contracts;
  getProvider = () => state.provider || walletConnectProvider;
  getChain = () => chain;
  getChainId = () => chain.chainId;
  getContract = (params) => new Contract({
    name: params.address,
    abi: params.abi,
    address: params.address,
    chainId: props.chainId,
    provider: state.provider,
    wallet: state.wallet,
    rateGas: props.rateGas,
    rateGasPrice: props.rateGasPrice,
    captureTransaction: props.captureTransaction,
  })

  const setup = useCallback(async (provider: any, providerType: ProviderType, forceSwitchChain = false) => {
    const web3 = new Web3(provider);
    let chainIdConnecting = (await web3.eth.getChainId()).toString() as ChainId;
    const accounts = await web3.eth.getAccounts();
    const wallet = web3.utils.toChecksumAddress(accounts[0]);

    if (forceSwitchChain && chainIdConnecting !== chain.chainId) {
      await handleConnectNetwork()
        .catch(() => false)
      chainIdConnecting = (await web3.eth.getChainId()).toString() as ChainId;
    }

    setState({
      chainIdConnecting: chainIdConnecting,
      wallet,
      provider,
      providerType,
      isInitialized: true,
    });

    return {
      wallet,
      chainId: chainIdConnecting,
    }
  }, [chain.chainId]);

  const getWalletConnectProvider = () => {
    const rpc = chains.reduce((a, p) => {
      (a as any)[+p.chainId] = p.rpcURLs[0]
      return a
    }, {})

    walletConnectProvider = new WalletConnectProvider({
      infuraId: "fb98493c58a245108e2b0ee191fc5e42",
      rpc,
      qrcodeModalOptions: {
        mobileLinks: [
          "metamask",
          "trust",
        ],
      },
    });

    return walletConnectProvider;
  };

  const initialize = useCallback(async (isForce = true) => {
    try {
      if (isForce) setState(s => ({ ...s, isInitialized: false }));

      // ============================ Metmask ============================
      const { ethereum } = window as any;
      const isMetamaskDisabled = localStorage.getItem("metamask_disabled");
      if (ethereum && !isMetamaskDisabled) return setup(ethereum, 'metamask');

      // const provider = getWalletConnectProvider();
      // if (provider) return setup(provider, "walletconnect")

      // ============================ Nothing ============================
      return setState({ ...defaultState, isInitialized: true });
    } catch (error) {
      console.error("Module blockchain >", error);
      setState({ ...defaultState, isInitialized: true });
    }
    // eslint-disable-next-line 
  }, [props.chainId]);

  handleConnectWallet = useCallback(async (type: ProviderType, isForceConnectChain) => {
    // ============================ Metamask ============================
    if (type === 'metamask') {
      try {
        localStorage.removeItem("metamask_disabled");

        const { ethereum } = window as any;
        if (!ethereum) throw Error("Please Install Metamask Extension");
        await ethereum.request({ method: 'eth_requestAccounts' });

        const data = await setup(ethereum, 'metamask', typeof isForceConnectChain === 'boolean' ? isForceConnectChain : true);
        return data.wallet!;
      } catch (error: any) {
        console.error("Module blockchain >", error);
        if (error.code === -32002) {
          throw new BlockchainError({ message: 'A request has been sent to Metamask Extension, please help me check!', code: BlockchainErrorCode.METAMASK_ALREADY_SENT_A_REQUEST });
        } else {
          throw new BlockchainError({ message: 'Something went wrong when connect wallet with Metamask', code: BlockchainErrorCode.METAMASK_CANNOT_CONNECTED });
        }
      }
    }
    // ============================ WalletConnect ============================
    else if (type === 'walletconnect') {
      try {
        // WalletConnect
        const provider = getWalletConnectProvider();
        await provider.enable();

        const data = await setup(provider, 'walletconnect', typeof isForceConnectChain === 'boolean' ? isForceConnectChain : true);
        return data.wallet!;
      } catch (error: any) {
        console.error("Module blockchain >", error);
        if (error.code === -32002) {
          throw new BlockchainError({ message: 'A request has been sent to Metamask, please help me check!', code: BlockchainErrorCode.METAMASK_ALREADY_SENT_A_REQUEST });
        } else {
          throw new BlockchainError({ message: 'Something went wrong when connect wallet with Metamask', code: BlockchainErrorCode.METAMASK_CANNOT_CONNECTED });
        }
      }

    } else {
      throw new BlockchainError({ message: 'NOT_SUPPORT_ANOTHER_TYPE' });
    }
  }, [setup]);

  handleConnectNetwork = useCallback(async (chainId) => {
    const toChainId = chainId || props.chainId;
    const chain = chains.find(v => v.chainId === toChainId)!;

    const actionSwitch = async (provider: any) => {
      const isChainAdded = await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${(+chain.chainId).toString(16)}` }],
      }).then(() => true).catch(() => false);

      if (!isChainAdded) {
        await provider.request({
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
              blockExplorerUrls: [chain.urlBlockExplorer]
            }
          ],
        })
          .catch(() => {
            throw new BlockchainError({
              code: BlockchainErrorCode.CANNOT_CONNECT_NETWORK,
              message: 'Cannot connect network',
            });
          })
      }
    }
    // WalletConnect
    if (state.providerType === 'walletconnect') {
      await actionSwitch(state.provider)
    }
    // Metamask
    else if (state.providerType === 'metamask') {
      const { ethereum } = window as any;

      if (ethereum) {
        await actionSwitch(ethereum)
      }
    }
  }, [props.chainId, state.providerType, state.provider]);

  const handleDisconnect = useCallback(async () => {
    // ============================ Metamask ============================
    if (state.providerType === 'metamask') {
      localStorage.setItem("metamask_disabled", "true");
    }
    // ============================ WalletConnect ============================

    if (state.providerType === 'walletconnect') {
      localStorage.removeItem("use_wallet_connect");
      localStorage.removeItem("walletconnect");
    }

    setState({ ...defaultState, isInitialized: true });
  }, [defaultState, state.providerType]);

  const handleAddToken = useCallback(async (tokenInfo: TokenInformation) => {
    try {
      const options = {
        address: tokenInfo.address,
        symbol: tokenInfo.symbol,
        decimals: tokenInfo.decimals || 18,
        image: tokenInfo.image,
      }

      // Metamask
      const { ethereum } = window as any;
      if (ethereum) {
        await ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options
          },
        });
      } else {
        throw Error("Not implement yet!");
      }
    } catch (error) {
      console.error("Module blockchain >", error);
      throw new BlockchainError({ message: 'Cannot add asset', code: BlockchainErrorCode.CANNOT_ADD_ASSET });
    }
  }, []);

  useEffect(() => {
    const handle = async () => {
      setState(s => ({ ...defaultState, wallet: s.wallet }));
      initialize(false);
    }

    handle();
  }, [props.chainId])

  useEffect(() => {
    if (state.provider) {
      const handleChangeAccount = (accounts: string[]) => {
        const wallet = accounts[0] ? Web3.utils.toChecksumAddress(accounts[0]) : undefined;
        setState(s => ({ ...s, wallet }));
      }

      const handleChangeChain = async () => {
        const web3 = new Web3(state.provider);
        const chainIdConnecting = (await web3.eth.getChainId()).toString() as ChainId;
        setState(s => ({ ...s, chainIdConnecting }));
      }

      state.provider.on("accountsChanged", handleChangeAccount);
      state.provider.on("chainChanged", handleChangeChain);

      return () => {
        state.provider.removeListener("accountsChanged", handleChangeAccount);
        state.provider.removeListener("chainChanged", handleChangeChain);
      }
    }
  }, [state.provider, props.chainId]);

  const getStatusCode = (currentState = state): BlockChainStatusCode => {
    if (!currentState.isInitialized) return 'INITIALIZE';
    if (!currentState.wallet || !currentState.provider) return 'WALLET_NOT_CONNECTED_YET';
    if (currentState.chainIdConnecting !== props.chainId) return 'UNSUPPORTED_NETWORK';
    return 'READY';
  }

  const statusCode = getStatusCode();

  const context: BlockChainContext<any> = {
    ...state,
    chainId: chain.chainId,
    statusCode,
    isAbleToWrite: !!state.provider && !!state.wallet && state.chainIdConnecting === props.chainId,
    handleConnectWallet,
    handleConnectNetwork,
    handleDisconnect,
    handleAddToken,
    configs: props,
    providerType: state.providerType,
    isReady: statusCode === 'READY',
    chain,
    contracts,
  }

  getContractConfigs = (params) => ({
    chainId: props.chainId,
    provider: state.provider,
    wallet: state.wallet,
    rateGas: props.rateGas,
    rateGasPrice: props.rateGasPrice,
    captureTransaction: props.captureTransaction,
    isAbleToWrite: context.isAbleToWrite,
    ...params,
  })

  return <blockChainContext.Provider value={context}>
    {props.children}
  </blockChainContext.Provider>
}

export const useBlockChain: UseBlockChain<any> = () => {
  const context = useContext(blockChainContext);
  return context;
}

export const renderLinkContract = (address: string, chainId?: ChainId) => {
  if (chainId) {
    const chain = chains.find(v => v.chainId === chainId);
    if (chain) return `${chain.urlBlockExplorer}/address/${address}`;
    return `${address}`;
  }

  return `${getChain().urlBlockExplorer}/address/${address}`
}

export const renderLinkTransaction = (transactionhash: string, chainId?: ChainId) => {
  if (chainId) {
    const chain = chains.find(v => v.chainId === chainId);
    if (chain) return `${chain.urlBlockExplorer}/tx/${transactionhash}`;
    return `${transactionhash}`;
  }

  return `${getChain().urlBlockExplorer}/tx/${transactionhash}`;
}