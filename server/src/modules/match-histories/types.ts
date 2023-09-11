import { DatabaseQuery } from "../database";
import { MapMode } from "../matchs/matchs.types";

export interface MatchHistoriesQuery extends DatabaseQuery {
  mapMode?: MapMode,
  userId?: string,
}