import { DatabaseQuery } from "./database.types";

export function parseFromQuery(query: DatabaseQuery) {
  let limit = Number(query.limit);
  if (Number.isNaN(limit) || limit <= 0) limit = 20;
  let offset = Number(query.offset);
  if (Number.isNaN(offset) || limit <= 0) offset = 0;

  return {
    limit,
    offset
  }
}