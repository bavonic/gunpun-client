import { Router } from "express";
import { AppResponse } from "../../AppTypes";
import { DemoPVP1Vs1 } from "./maps/DemoPVP1Vs1.map";
import { DemoPve1 } from "./maps/DemoPve1.map";
import { DemoPve2 } from "./maps/DemoPve2.map";
import { DemoPve3 } from "./maps/DemoPve3.map";
import { MapConfig } from "./matchs.types";
import { DemoPVP2Vs2 } from "./maps/DemoPVP2Vs2.map";
import { DemoPVP3Vs3 } from "./maps/DemoPVP3Vs3.map";
import { DemoPve4 } from "./maps/DemoPve4.map";

export const matchsRouter = Router();

export const mapConfigs: MapConfig[] = [
  DemoPve1.config,
  DemoPve2.config,
  // DemoPve3.config,
  DemoPve4.config,
  DemoPVP1Vs1.config,
  DemoPVP2Vs2.config,
  DemoPVP3Vs3.config,
]

matchsRouter.get(`/maps`, (_, res: AppResponse) => {
  res.send({ data: mapConfigs })
})