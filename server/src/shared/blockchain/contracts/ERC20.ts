import Web3 from 'web3';
import ERC20_ABI from '../abis/ERC20.json';
import { Contract } from "./core";
import { BlockchainError, BlockchainErrorCode, ContractConfigs, TokenUnit } from "../types";

export let tokenUnits: { [ref: string]: TokenUnit } = {};

export class ContractERC20 extends Contract {
  constructor(configs: ContractConfigs) {
    super({ ...configs, abi: ERC20_ABI });
  }

  async symbol() {
    return this.call({ method: "symbol" })
  }

  async balanceOf(address: string) {
    return this.call({ method: "balanceOf", args: [address] })
      .then((res) => this.fromWei(res))
  }

  async allowance(params: { owner: string, operator: string }) {
    return this.call({ method: "allowance", args: [params.owner, params.operator] })
      .then((res) => this.fromWei(res))
  }

  async transfer(params: { to: string, amount: number }) {
    if (!this.wallet) throw new BlockchainError({
      code: BlockchainErrorCode.MUST_BE_CONNECT_WALLET,
      message: 'Must be connect wallet before.'
    });

    if (this.wallet === Web3.utils.toChecksumAddress(params.to)) throw new BlockchainError({
      code: BlockchainErrorCode.CANNOT_TRANSFER_TO_YOUR_SELF
    });

    const amountInWei = await this.toWei(params.amount);
    return this.send({ method: "transfer", args: [params.to, amountInWei] })
  }

  async approve(params: { operator: string, amount: number }) {
    if (!this.wallet) throw new BlockchainError({
      code: BlockchainErrorCode.MUST_BE_CONNECT_WALLET,
      message: 'Must be connect wallet before.'
    });

    const allowance = await this.allowance({ operator: params.operator, owner: this.wallet });
    if (params.amount <= allowance) return true;

    const amountInWei = await this.toWei(params.amount);
    return this.send({ method: 'approve', args: [params.operator, amountInWei] })
  }

  async fromWei(amount: string) {
    const tokenUnit = await this.getTokenUnit();
    return +Web3.utils.fromWei(amount, tokenUnit);
  }

  async toWei(amount: any) {
    const tokenUnit = await this.getTokenUnit();
    return Web3.utils.toWei(`${amount}`, tokenUnit);
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
    tokenUnits[ref] = this.tokenUnit!;
    return this.tokenUnit!;
  }
}