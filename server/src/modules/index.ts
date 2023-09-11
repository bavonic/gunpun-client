import { Router } from "express";
import { chatLobbyRouter } from "./chat-lobby/chatLobby.router";
import { matchsRouter } from "./matchs/matchs.router";
import { userStatsRouter } from "./user-stats/router";
import { matchHistoriesRouter } from "./match-histories/router";

export const apiRouter = Router();

apiRouter.use(`/chat-lobby-message`, chatLobbyRouter);
apiRouter.use(`/matchs`, matchsRouter);
apiRouter.use(`/user-stats`, userStatsRouter);
apiRouter.use(`/match-histories`, matchHistoriesRouter);