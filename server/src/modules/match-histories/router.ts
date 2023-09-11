import { Router } from "express";
import { AppResponse } from "../../AppTypes";
import { MatchHistoriesModule } from "./module";

export const matchHistoriesRouter = Router();

matchHistoriesRouter.get(`/`, (req, res: AppResponse) => {
  MatchHistoriesModule.getList(req.query as any)
    .then(res.onResponse)
    .catch(res.onError)
})