import Web3 from "web3"

interface GetPastEventsParams {
  web3: any,
  contract: any,
  event: string,
  fromBlock: number,
  toBlock?: number | "latest",
  chunkLimit?: number
}

export const getPastEvents: (params: GetPastEventsParams) => any = async ({
  web3,
  contract,
  event,
  fromBlock,
  toBlock = "latest",
  chunkLimit = 0
}) => {
  try {

    const fromBlockNumber = +fromBlock
    const toBlockNumber =
      toBlock === "latest" ? +(await web3.eth.getBlockNumber()) : +toBlock
    const totalBlocks = toBlockNumber - fromBlockNumber
    console.log('toBlockNumber', toBlockNumber);
    const chunks = []

    if (chunkLimit > 0 && totalBlocks > chunkLimit) {
      const count = Math.ceil(totalBlocks / chunkLimit)
      let startingBlock = fromBlockNumber

      for (let index = 0; index < count; index++) {
        const fromRangeBlock = startingBlock
        const toRangeBlock =
          index === count - 1 ? toBlockNumber : startingBlock + chunkLimit
        startingBlock = toRangeBlock + 1

        chunks.push({ fromBlock: fromRangeBlock, toBlock: toRangeBlock })
      }
    } else {
      chunks.push({ fromBlock: fromBlockNumber, toBlock: toBlockNumber })
    }

    const events: any[] = []
    const errors: any[] = []
    for (const chunk of chunks) {
      await contract.getPastEvents(
        event,
        {
          fromBlock: chunk.fromBlock,
          toBlock: chunk.toBlock
        },
        async function (error: any, chunkEvents: any[]) {
          if (chunkEvents?.length > 0) {
            events.push(...chunkEvents)
          }

          if (error) errors.push(error)
        }
      )
    }

    return { events, errors, lastBlock: toBlockNumber }
  } catch (error) {
    return { events: [], errors: [error], lastBlock: null }
  }
}

export const validateAddress = (rawAddress: string, invalidMsg?: string) => {
  if (!Web3.utils.isAddress(rawAddress)) throw Error(invalidMsg || "Invalid address");
  return Web3.utils.toChecksumAddress(rawAddress);
}