import { Schema, type } from "@colyseus/schema";

export interface GameObjectParams {
  id: string,
  x?: number,
  y?: number,
  w?: number,
  h?: number,
}

export class GameObjectSchema extends Schema {
  @type("string") id: string;
  @type("number") x: number;
  @type("number") y: number;
  @type("number") w: number;
  @type("number") h: number;

  constructor(initial: GameObjectParams) {
    super();
    this.id = initial.id;
    this.x = initial.x || 0;
    this.y = initial.y || 0;
    this.w = initial.w || 0;
    this.h = initial.h || 0;
  }
}