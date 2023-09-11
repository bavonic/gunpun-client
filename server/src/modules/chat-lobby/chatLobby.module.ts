import { getEnv } from "../../AppConfigs";
import { Queries } from "../../AppTypes";
import { ErrorMessage, ThrowPayloadError } from "../../utils";
import { NumberUtils } from "../../utils/number.utils";
import { databaseSource } from "../database";
import { ChatLobbyMessageEntity } from "./chatLobby.entity";

export const chatLobbyMessageRepository = databaseSource.getMongoRepository(ChatLobbyMessageEntity);

export class ChatLobbyModule {
  static async getList(queries: Queries) {
    let { offset, limit } = queries as any;

    if (!offset) offset = 0;
    if (!limit) limit = limit || +getEnv('DATABASE_MAX_QUERY_LIMIT');

    // ======================= Validate =======================
    let errors: any = {};
    if (!NumberUtils.isNumber(+offset)) errors['offset'] = ErrorMessage.MUST_BE_NUMBER;
    if (!NumberUtils.isNumber(+limit)) errors['limit'] = ErrorMessage.MUST_BE_NUMBER;
    ThrowPayloadError(errors);

    const data = await chatLobbyMessageRepository.findAndCount({
      order: {
        createdAt: 'DESC',
      },
      skip: +offset,
      take: +limit,
    })

    return {
      count: data[1],
      data: data[0]
    }
  }

  static async save(data: ChatLobbyMessageEntity) {
    return chatLobbyMessageRepository.save(data);
  }
}