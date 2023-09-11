import { Router } from "express";
import { AppResponse } from "../../AppTypes";
import { UserStatsModule } from "./module";

export const userStatsRouter = Router();

userStatsRouter.get(`/ranking`, (req, res: AppResponse) => {
  UserStatsModule.getRanking(req.query as any)
    .then(res.onResponse)
    .catch(res.onError);
})

userStatsRouter.get(`/ranking/:userId`, (req, res: AppResponse) => {
  UserStatsModule.getUserRanking(req.params.userId, req.query.type as any)
    .then(res.onResponse)
    .catch(res.onError);
})

userStatsRouter.get(`/:userId`, (req, res: AppResponse) => {
  UserStatsModule.get(req.params.userId, req.query.forceUpdate === 'true')
    .then(res.onResponse)
    .catch(res.onError);
})

userStatsRouter.post(`/re-calculate`, (req, res: AppResponse) => {
  UserStatsModule.reCalculate()
    .then(res.onResponse)
    .catch(res.onError);
})