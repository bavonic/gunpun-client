import { type } from "@colyseus/schema";
import { GameObjectSchema, GameObjectParams } from "./game-object.schema";

export class PlatformSchema extends GameObjectSchema {
  @type("boolean") isVisible: boolean = true;

  constructor(initial: GameObjectParams) {
    super(initial);
  }
}