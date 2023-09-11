"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const chatLobby_router_1 = require("./chat-lobby/chatLobby.router");
const matchs_router_1 = require("./matchs/matchs.router");
const router_1 = require("./user-stats/router");
const router_2 = require("./match-histories/router");
exports.apiRouter = (0, express_1.Router)();
exports.apiRouter.use(`/chat-lobby-message`, chatLobby_router_1.chatLobbyRouter);
exports.apiRouter.use(`/matchs`, matchs_router_1.matchsRouter);
exports.apiRouter.use(`/user-stats`, router_1.userStatsRouter);
exports.apiRouter.use(`/match-histories`, router_2.matchHistoriesRouter);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kdWxlcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBaUM7QUFDakMsb0VBQWdFO0FBQ2hFLDBEQUFzRDtBQUN0RCxnREFBc0Q7QUFDdEQscURBQWdFO0FBRW5ELFFBQUEsU0FBUyxHQUFHLElBQUEsZ0JBQU0sR0FBRSxDQUFDO0FBRWxDLGlCQUFTLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLGtDQUFlLENBQUMsQ0FBQztBQUN0RCxpQkFBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsNEJBQVksQ0FBQyxDQUFDO0FBQ3ZDLGlCQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSx3QkFBZSxDQUFDLENBQUM7QUFDOUMsaUJBQVMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsNkJBQW9CLENBQUMsQ0FBQyJ9