import Web3 from 'web3';
import ERC1155_ABI from '../abis/ERC1155.json';
import { Contract } from "./core";
import { ContractConfigs } from "../types";

export class ContractERC1155 extends Contract {
  constructor(configs: ContractConfigs) {
    super({ ...configs, abi: ERC1155_ABI });
  }

  async balanceOf(params: { owner: string, tokenId: string }) {
    const { owner, tokenId } = params;
    return this.call({ method: "balanceOf", args: [owner, tokenId] })
      .then((res) => +res)
  }

  async approve(operator: string) {
    const isApproved = await this.isApproved({ owner: this.wallet!, operator });
    if (isApproved) return;
    return this.send({ method: 'setApprovalForAll', args: [operator, true] });
  }

  async revokeApproval(operator: string) {
    return this.send({ method: 'setApprovalForAll', args: [operator, false] });
  }

  async isApproved(params: { owner: string, operator: string }) {
    const { owner, operator } = params;
    return this.call({ method: 'isApprovedForAll', args: [owner, operator] })
  }

  async transferFrom(params: { from: string, to: string, tokenId: string, amount: number }) {
    const { from, to, tokenId, amount } = params;
    return this.send({ method: 'safeTransferFrom', args: [from, to, tokenId, amount, Web3.utils.stringToHex("")] });
  }
}