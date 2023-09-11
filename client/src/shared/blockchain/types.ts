import { ContractERC1155 } from './contracts/ERC1155'
import { ContractERC20 } from './contracts/ERC20'
import { ContractERC721 } from './contracts/ERC721'
import { Contract } from './contracts/core'
import type { Account as CoreAccount } from 'web3-core'

export type Provider = any
export type Account = CoreAccount

export enum BlockchainErrorCode {
  UNKNOWN_ERROR = 'Unknown error',
  USER_REJECTED = 'You declined the transaction',
  INVALID_JSON_WAS_RECEIVED_BY_THE_SERVER = 'Invalid json was received by the server',
  INVALID_PAYLOAD_REQUEST = 'Invalid payload request',
  REQUEST_LIMIT_EXCEEDED = 'Request limit exceeded',
  METHOD_DOES_NOT_EXISTED_OR_NOT_AVAILABLE = 'Method does not existed or not available',
  METHOD_NOT_SUPPORTED = 'Method not supported',
  INVALID_JSON_RPC_ERROR = 'Invalid json RPC error',
  INVALID_METHOD_PARAMETERS = 'Invalid method parameters',
  INVALID_INPUT = 'Invalid input',
  RESOURCE_NOT_FOUND = 'Resource not found',
  RESOURCE_UNAVAILABLE = 'Resource unavailable',
  TRANSACTION_REJECTED = 'Transaction was rejected',
  THE_REQUEST_ACCOUNT_OR_METHOD_HAS_NOT_BEEN_AUTHORIZED = 'The request account or method has not been authorized',
  THE_REQUEST_METHOD_IS_NOT_SUPPORTED_BY_THIS_ETHEREUM_PROVIDER = 'The request method is not supported by this ethereum provider',
  THE_PROVIDER_IS_DISCONNECTED_FROM_ALL_CHAINS = 'The provider is disconnected from all chains',
  THE_PROVIDER_IS_DISCONNECTED_FROM_THE_SPECIFIED_CHAIN = 'The provider is disconnected from the specified chain',

  METAMASK_ALREADY_SENT_A_REQUEST = 'Metamask already sent a request',
  WALLET_CONNECT_ALREADY_SENT_A_REQUEST = 'WalletConnect already sent a request',
  METAMASK_CANNOT_CONNECTED = 'Metamask cannot connected',
  CANNOT_CONNECT_NETWORK = 'Connect network failed',
  CANNOT_ADD_ASSET = 'Cannot add asset',
  MUST_BE_CONNECT_WALLET = 'Must be connect wallet before',
  CANNOT_FIND_METHOD = 'Cannot find method',
  CHAIN_NOT_SUPPORTED = 'This chain not supported yet',
  AR_CANNOT_CONNECT_RPC_URL = 'Cannot connect RPC URL (Auto Retry)',
  CANNOT_CONNECT_RPC_URL = 'Cannot connect RPC URL',
  TRANSACTION_TIME_OUT = 'Transaction timeout',
  CONTRACT_NOT_DEPLOYED_YET = 'Contract not deployed yet',
  APPROVAL_FAILED = 'Approval failed',
  NOT_ENOUGH_BALANCE_FOR_GAS_FEE = 'Not enough balance for gas fee',
  TRANSACTION_REVERTED_BY_THE_EVM = 'Transaction has been reverted by the EVM',
  TRANSACTION_UNDER_PRICED = 'Transaction underpriced',
  NONCE_TOO_LOW = 'Nonce too low',
  CANNOT_TRANSFER_TO_YOUR_SELF = 'Cannot transfer to your self',
}

export type ProviderType = 'metamask' | 'walletconnect' | 'unipass'

export type TokenUriType = 'unknown' | 'base64' | 'ipfs' | 'uri' | 'empty'

export interface TokenInformation {
  address: string
  symbol: string
  image: string
  decimals?: number
}

export class BlockchainError {
  error?: any
  code: BlockchainErrorCode
  message?: string
  transactionHash?: string
  transaction?: Transaction
  type?: ContractActionType
  provider: string
  method?: string
  wallet?: string
  args?: string
  contractName?: string
  contractAddress?: string

  constructor(params: {
    error?: any
    code?: BlockchainErrorCode
    message?: string
    transactionHash?: string
    transaction?: Transaction
    type?: ContractActionType
    provider?: string
    method?: string
    wallet?: string
    args?: string
    contractName?: string
    contractAddress?: string
  }) {
    this.code = params.code || BlockchainErrorCode.UNKNOWN_ERROR
    this.message = params.message || 'An error has occurred.'
    this.transactionHash = params.transactionHash || ''
    this.type = params.type
    this.provider = params.provider || 'Unknown'
    this.method = params.method
    this.error = params.error
    this.wallet = params.wallet
    this.args = params.args
    this.contractName = params.contractName
    this.contractAddress = params.contractAddress
  }
}

export interface BlockchainStats {
  wallet?: string
  chainId?: ChainId
  provider?: any
  providerType?: ProviderType,
  chain?: Chain
}

export type ConnectWallet = (type: ProviderType, forceChainId?: ChainId) => Promise<string>
export type ConnectChain = (chainId: ChainId) => Promise<any>
export type AddToken = (information: TokenInformation) => Promise<void>
export type GetContract = (params: { address: string, abi: any[], name?: string, chainId?: ChainId }) => Contract
export type GetContractERC721 = (params: { address: string, name?: string, chainId?: ChainId }) => ContractERC721
export type GetContractERC1155 = (params: { address: string, name?: string, chainId?: ChainId }) => ContractERC1155
export type GetContractERC20 = (params: { address: string, name?: string, chainId?: ChainId }) => ContractERC20

export interface BlockChainContext extends BlockchainStats {
  isInitialized: boolean
  connectWallet: ConnectWallet
  connectChain: ConnectChain
  addToken: AddToken
  disconnect: () => void
  configs: BlockChainProviderProps
  providerType?: ProviderType
  getContract: GetContract
}

export interface BlockChainProviderProps {
  children?: any
  rateGas?: number
  rateGasPrice?: number
  captureTransaction?: (transaction: Transaction) => any
}

export enum TokenUnit {
  /**
   * Decimal 31
   */
  tether = 'tether',
  /**
   * Decimal 25
   */
  mether = 'mether',
  /**
   * Decimal 21
   */
  kether = 'kether',
  /**
   * Decimal 18
   */
  ether = 'ether',
  /**
   * Decimal 15
   */
  finney = 'finney',
  /**
   * Decimal 12
   */
  szabo = 'szabo',
  /**
   * Decimal 9
   */
  gwei = 'gwei',
  /**
   * Decimal 6
   */
  mwei = 'mwei',
  /**
   * Decimal 3
   */
  kwei = 'kwei',
}

export enum ChainId {
  FANTOM = '250',
  BSC = '56',
  BSC_TESTNET = '97',
  ETHW = '10001',
  ETH = '1',
  POLYGON = '137',
  HARDHAT = '1337',
  ARBITRUM = '42161',
  ME_TESTNET = '61',
}

export enum TokenType {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
}

export interface Chain {
  chainId: ChainId
  name: string
  rpcURLs: string[]
  currency: {
    name: string
    decimals: number
  }
  urlBlockExplorer: string
}

// ======================= Start Contract Related =======================
export interface ContractConfigs {
  chainId: ChainId
  address: string
  name?: string
  provider?: Provider
  wallet?: string
  rateGas?: number
  rateGasPrice?: number
  captureTransaction?: (transaction: Transaction) => any
}

export interface ContractConfigsWithABI extends ContractConfigs {
  abi: any[]
}

export type ContractActionType = 'READ' | 'WRITE'

export type ContractTransactionSpeed = 'FAST' | 'NORMAL' | 'SLOW'

export interface ContractSendOptions {
  method: string
  onSubmitted?: (transactionHash: string) => void
  params?: any
  rateGas?: number
  rateGasPrice?: number
  speed?: ContractTransactionSpeed
  privateKey?: string
  args?: any[]
  estimateGas?: ContractEstimateGas
  delayInSeconds?: number
}

export interface ContractCallOptions {
  method: string
  args?: any[]
  retryTime?: number
}

export interface Transaction {
  blockHash: string
  blockNumber: number
  contractAddress: null | string
  cumulativeGasUsed: number
  events: any
  from: string
  gasUsed: number
  logsBloom: string
  status: boolean
  to: string
  value: string
  transactionHash: string
  transactionIndex: number
  [property: string]: any
}

export interface ContractEstimateGas {
  fee: number
  feeInWei: string
  gasLimit: number
  gasPrice: number
  func: any
  web3: any
  wallet: string
  contract: any
}

export enum ContractType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
  ERC20 = 'ERC20',
}
// ======================= End Contract Related =======================

export interface SignTypedDataPayload {
  domain: {
    name: string
    version: string
  }
  privateKey: string
  data: { type: string; value: any }[]
}
