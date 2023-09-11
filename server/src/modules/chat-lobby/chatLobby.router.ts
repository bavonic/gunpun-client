import { Router } from "express";
import { ChatLobbyModule } from "./chatLobby.module";

export const chatLobbyRouter = Router();

chatLobbyRouter.get(`/`, (req, res: any) => {
  ChatLobbyModule.getList(req.query)
    .then(result => res.send(result))
    .catch(res.onError);
})