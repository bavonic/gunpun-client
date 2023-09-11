import Web3 from 'web3'
import type { TransactionReceipt } from 'web3-core'
import { chains } from '../chains'
import { BlockchainLogs } from '../logs'
import {
  BlockchainError,
  BlockchainErrorCode,
  Chain,
  ChainId,
  ContractCallOptions,
  ContractConfigsWithABI,
  ContractEstimateGas,
  ContractSendOptions,
  Provider,
  TokenUnit,
  Transaction,
} from '../types'
import {
  getAvailableWeb3,
  parseBlockchainError,
  parseEvent,
  randomInt,
  wait,
} from '../utils'

let contractTokenUnits: { [ref: string]: TokenUnit } = {};
export const version = '1.0.5'

export class Contract {
  name: string
  address: string
  chain: Chain
  abi: any[]
  provider?: Provider
  wallet?: string
  rpcUsed = ''
  rateGas?: number
  rateGasPrice?: number
  tokenUnit?: TokenUnit
  captureTransaction?: (transaction: Transaction) => any

  constructor(configs: ContractConfigsWithABI) {
    this.name = configs.name || 'Contract'
    this.address = configs.address
      ? Web3.utils.toChecksumAddress(configs.address)
      : ''
    this.provider = configs.provider
    this.abi = configs.abi
    this.chain = chains.find((v) => v.chainId === configs.chainId)!
    this.rateGas = configs.rateGas
    this.rateGasPrice = configs.rateGasPrice
    this.captureTransaction = configs.captureTransaction

    if (!this.chain)
      throw Error(`Chain with id ${configs.chainId} not supported!`)
    if (configs.wallet)
      this.wallet = Web3.utils.toChecksumAddress(configs.wallet)
  }

  async call(options: ContractCallOptions, ...args: any): Promise<any> {
    if (!this.address)
      throw new BlockchainError({
        code: BlockchainErrorCode.CONTRACT_NOT_DEPLOYED_YET,
      })

    const retryTime =
      typeof options.retryTime === 'number' ? options.retryTime : 10
    let retriedTime = 0

    return new Promise(async (resolve, reject) => {
      try {
        const action = () => {
          let rpcURLs = this.chain.rpcURLs.filter((v) => v !== this.rpcUsed)
          this.rpcUsed = rpcURLs[randomInt(0, rpcURLs.length - 1)]

          const web3 = new Web3(new Web3.providers.HttpProvider(this.rpcUsed))
          const contract = new web3.eth.Contract(this.abi, this.address)

          const func = contract.methods[options.method] as any
          if (typeof func !== 'function')
            return reject(
              new BlockchainError({
                code: BlockchainErrorCode.INVALID_METHOD_PARAMETERS,
                type: 'READ',
                method: options.method,
                args,
              })
            )

          return func(...(options.args || args))
            .call()
            .then((res: any) => resolve(res))
            .catch((error: any) => {
              const e = parseBlockchainError({
                type: 'READ',
                error,
                web3,
                method: options.method,
                wallet: this.wallet,
                args,
                contractName: this.name,
                contractAddress: this.address,
              })

              if (e.code === BlockchainErrorCode.AR_CANNOT_CONNECT_RPC_URL) {
                action()
              } else if (retryTime > 0 && retriedTime < retryTime) {
                retriedTime += 1
                setTimeout(action, 2000)
              } else {
                this.trackError(e)
                reject(e)
              }
            })
        }

        action()
      } catch (error) {
        throw error
      }
    })
  }

  async getWeb3() {
    return this.provider
      ? new Web3(this.provider)
      : await getAvailableWeb3(this.chain.chainId).then((r) => r.web3)
  }

  async getWalletSelected() {
    if (this.wallet) return this.wallet
    const web3 = await this.getWeb3()
    this.wallet = await web3.eth.getAccounts().then((res) => res[0])
    if (!this.wallet)
      throw new BlockchainError({
        code: BlockchainErrorCode.MUST_BE_CONNECT_WALLET,
      })
    return this.wallet
  }

  async _beforeSend(options?: { privateKey?: string }) {
    if (!this.address)
      throw new BlockchainError({
        code: BlockchainErrorCode.CONTRACT_NOT_DEPLOYED_YET,
      })

    const web3 = await this.getWeb3()
    if (!this.wallet)
      this.wallet = await web3.eth.getAccounts().then((res) => res[0])

    const account =
      options && options.privateKey
        ? web3.eth.accounts.wallet.add(options.privateKey)
        : undefined
    const wallet = account?.address || this.wallet

    if (!wallet || (!this.provider && !options?.privateKey))
      throw new BlockchainError({
        code: BlockchainErrorCode.MUST_BE_CONNECT_WALLET,
      })

    const contract = new web3.eth.Contract(this.abi, this.address)

    return { web3, wallet, contract }
  }

  async estimateGas(
    options: ContractSendOptions,
    ...args: any
  ): Promise<ContractEstimateGas> {
    if (!this.address)
      throw new BlockchainError({
        code: BlockchainErrorCode.CONTRACT_NOT_DEPLOYED_YET,
      })

    const prepare = await this._beforeSend(options)
    const func = prepare.contract.methods[options.method] as any
    if (typeof func !== 'function')
      throw new BlockchainError({
        code: BlockchainErrorCode.INVALID_METHOD_PARAMETERS,
        type: 'READ',
        method: options.method,
        args,
      })

    return new Promise((resolve, reject) => {
      const action = async () => {
        try {
          let gasPrice = await prepare.web3.eth
            .getGasPrice()
            .then((res) => +res)
          let gasLimit = await func(...(options.args || args))
            .estimateGas({ from: prepare.wallet, ...options.params })
            .then((res: any) => +res)

          const rateGas = options.rateGas || this.rateGas || 1
          gasLimit = gasLimit * rateGas

          const rateGasPrice = options.rateGasPrice || this.rateGasPrice || 1
          gasPrice = gasPrice * rateGasPrice

          const response: ContractEstimateGas = {
            ...prepare,
            gasPrice: Number(gasPrice),
            fee: +Web3.utils.fromWei(
              Number(gasPrice * gasLimit).toString(),
              TokenUnit.ether
            ),
            feeInWei: Number(gasPrice * gasLimit).toString(),
            gasLimit: Number(gasLimit),
            func,
          }

          resolve(response)
        } catch (error) {
          const e = parseBlockchainError({
            type: 'READ',
            method: 'estimateGas',
            error,
            web3: prepare.web3,
            contractName: this.name,
            contractAddress: this.address,
            wallet: this.wallet,
          })
          if (e.code === BlockchainErrorCode.AR_CANNOT_CONNECT_RPC_URL) action()
          else reject(e)
        }
      }

      action()
    })
  }

  async send(options: ContractSendOptions, ...args: any): Promise<Transaction> {
    const estimateGas =
      options.estimateGas || (await this.estimateGas(options, ...args))
    const { web3, wallet, gasPrice, gasLimit, func } = estimateGas

    let isHasError = false

    return new Promise(async (resolve, reject) => {
      let transactionHash: string

      const handleOnSubmitted = (transactionHashReceived: string) => {
        transactionHash = transactionHashReceived
        if (options.onSubmitted && !isHasError) {
          options.onSubmitted(transactionHashReceived)
        }
      }

      func(...(options.args || args))
        .send({
          from: wallet,
          gas: gasLimit.toString(),
          gasPrice: gasPrice,
          ...options.params,
        })
        .on('transactionHash', function (transactionHashReceived: any) {
          handleOnSubmitted(transactionHashReceived)
        })
        .then(async (res: any) => {
          if (this.chain.chainId === ChainId.FANTOM) await wait(5000)
          else if (this.chain.chainId === ChainId.POLYGON) await wait(3000)
          else if (options.delayInSeconds)
            await wait(options.delayInSeconds * 1000)
          else await wait(1000)
          if (this.captureTransaction) this.captureTransaction(res)
          resolve(res)
        })
        .catch((error: any) => {
          const e = parseBlockchainError({
            type: 'WRITE',
            error,
            web3,
            transactionHash,
            method: options.method,
            wallet,
            args,
          })

          isHasError = true
          this.trackError(e)
          reject(e)
        })
    })
  }

  trackError(error: BlockchainError) {
    const ignoreCode: BlockchainErrorCode[] = [
      BlockchainErrorCode.USER_REJECTED,
      BlockchainErrorCode.AR_CANNOT_CONNECT_RPC_URL,
    ]

    if (error.code && ignoreCode.includes(error.code)) return

    const content = `
    <strong>🤖 [Blockchain Error] ${version}</strong>
    • Chain: ${`${this.chain.name} ${this.chain.chainId}`}
    • Contract: ${`${this.name
      } <a href="${`${this.chain.urlBlockExplorer}/address/${this.address}`}">${this.address
      }</a>`}
    • Provider: ${error.provider}
    • From: ${typeof window === 'undefined'
        ? `Server ${process.env?.PUBLIC_URL || ''}`
        : `Client ${window.location.href}`
      }
    • Wallet: ${this.wallet || 'NONE'}
    • Type: ${error.type}
    • Method: ${error.method}
    • Args: ${error.args}
    • Code: ${error.code}
    • TransactionHash: ${error.transactionHash
        ? `<a href="${this.chain.urlBlockExplorer}/tx/${error.transactionHash}">${error.transactionHash}</a>`
        : 'NONE'
      }
    • Error: ${typeof error.error === 'object' ? error.error.message : error.error
      }
  `

    BlockchainLogs.sendTelegram(content)
  }

  async getName() {
    return this.call({ method: 'name' }).catch(() => '')
  }

  async parseTransaction(
    transactionData: string | any,
    receiptData?: TransactionReceipt
  ): Promise<Transaction> {
    const web3 = await this.getWeb3()
    const transactionHash = typeof transactionData === 'string' ? transactionData : transactionData.hash
    const [transaction, receipt] = await Promise.all([
      (async () => {
        if (typeof transactionData === 'string')
          return web3.eth.getTransaction(transactionHash)
        return transactionData
      })(),
      (async () => {
        if (receiptData) return receiptData
        return web3.eth.getTransactionReceipt(transactionHash)
      })(),
    ])

    const data = parseEvent(this.abi, this.address, receipt)

    return {
      ...transaction,
      ...receipt,
      ...data,
      from: Web3.utils.toChecksumAddress(transaction.from),
      to: transaction.to
        ? Web3.utils.toChecksumAddress(transaction.to) || ''
        : '',
    } as any
  }

  static ref(chainId: ChainId, contractAddress?: string) {
    if (!contractAddress || !Web3.utils.isAddress(contractAddress)) return `${chainId}-${Date.now()}`;
    return `${chainId}-${contractAddress}`;
  }

  async getTokenUnit() {
    if (this.tokenUnit) return this.tokenUnit;
    await this.call({ method: 'decimals' })
      .then((decimals) => {
        if (+decimals === 18) this.tokenUnit = TokenUnit.ether;
        else if (+decimals === 31) this.tokenUnit = TokenUnit.tether;
        else if (+decimals === 25) this.tokenUnit = TokenUnit.mether;
        else if (+decimals === 21) this.tokenUnit = TokenUnit.kether;
        else if (+decimals === 15) this.tokenUnit = TokenUnit.finney;
        else if (+decimals === 12) this.tokenUnit = TokenUnit.szabo;
        else if (+decimals === 9) this.tokenUnit = TokenUnit.gwei;
        else if (+decimals === 6) this.tokenUnit = TokenUnit.mwei;
        else if (+decimals === 3) this.tokenUnit = TokenUnit.kwei;
        else this.tokenUnit = TokenUnit.ether;
      })
      .catch(() => {
        this.tokenUnit = TokenUnit.ether;
      })

    const ref = Contract.ref(this.chain.chainId, this.address);
    contractTokenUnits[ref] = this.tokenUnit!;
    return this.tokenUnit!;
  }

  decodeAmount(value: any) {
    return +Web3.utils.fromWei(`${value}`);
  }

  encodeAmount(value: any) {
    return Web3.utils.toWei(`${value}`);
  }

  async fromWei(amount: string) {
    const tokenUnit = await this.getTokenUnit();
    return +Web3.utils.fromWei(amount, tokenUnit);
  }

  async toWei(amount: any) {
    const tokenUnit = await this.getTokenUnit();
    return Web3.utils.toWei(`${amount}`, tokenUnit);
  }

  async approval(operatorContract: Contract, amount: number, options?: { auth?: { wallet?: string, privateKey: string } }) {
    if (typeof amount !== 'number') throw Error("Amount must be number.");
    if (Number(amount) <= 0) return true;

    const wallet = this.wallet || options.auth.wallet

    if (!wallet) throw new BlockchainError({
      code: BlockchainErrorCode.MUST_BE_CONNECT_WALLET,
      message: 'Must be connect wallet before'
    })

    const allowance = await this.call({
      method: 'allowance',
      args: [wallet, operatorContract.address]
    })
      .then(res => this.fromWei(res))

    if (allowance < amount) {
      // const amountInWei = await this.toWei(amount);

      // Approve if not enough
      const sendOptions: ContractSendOptions = {
        method: 'approve',
        ...options,
        args: [
          operatorContract.address,
          "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
        ]
      }

      await this.send(sendOptions);
    }

    return true;
  }
}
