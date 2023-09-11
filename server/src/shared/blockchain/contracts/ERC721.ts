import Web3 from 'web3';
import ERC721_ABI from '../abis/ERC721.json';
import { Contract } from "./core";
import { ContractConfigs } from "../types";

export class ContractERC721 extends Contract {
  constructor(configs: ContractConfigs) {
    super({ ...configs, abi: ERC721_ABI });
  }

  async isApproved(params: { tokenId: string, operator: string }) {
    const { tokenId, operator } = params;
    const owner = await this.ownerOf(tokenId);
    const isApprovedForAll = await this.call({ method: 'isApprovedForAll', args: [owner, operator] })
    if (isApprovedForAll) return true;

    const addressApproved = await this.call({ method: 'getApproved', args: [tokenId] })
    return Web3.utils.toChecksumAddress(addressApproved) === Web3.utils.toChecksumAddress(operator);
  }

  async revokeApproval(params: { operator: string }) {
    return this.send({ method: 'setApprovalForAll', args: [params.operator, false] });
  }

  async transferFrom(params: { from: string, to: string, tokenId: string }) {
    const { from, to, tokenId } = params;
    return this.send({ method: 'safeTransferFrom', args: [from, to, tokenId, Web3.utils.stringToHex("")] });
  }

  async ownerOf(tokenId: string) {
    return this.call({ method: 'ownerOf', args: [tokenId] })
  }

  async balanceOf(owner: string) {
    return this.call({ method: "balanceOf", args: [owner] })
      .then((res) => +res)
  }

  async tokenURI(tokenId: string) {
    return this.call({ method: 'tokenURI', args: [tokenId] })
  }

  async approve(params: { operator: string, tokenId?: string }) {
    const { tokenId, operator } = params;

    if (tokenId) {
      const isApproved = await this.isApproved({ tokenId, operator });
      if (isApproved) return true;
    }

    const isApprovedForAll = await this.call({ method: 'isApprovedForAll', args: [this.wallet!, operator] })
    if (isApprovedForAll) return true;

    return this.send({ method: 'setApprovalForAll', args: [operator, true] });
  }
}