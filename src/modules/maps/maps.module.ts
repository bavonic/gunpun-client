import { store } from "stores";
import { RequestGameModule } from "modules/request";
import { SET_MAPS } from "reducers/maps.reducer";
import { MapConfig } from "./maps.types";
import { loadImage } from "shared/utils";

export class MapsModule {
  static async fetch() {
    await RequestGameModule.get(`/api/matchs/maps`)
      .then(async (res) => {
        const data = res.data as MapConfig[];
        await Promise.all(data.map((map) => loadImage(map.assetUrl + '/background.png')));
        store.dispatch({ type: SET_MAPS, data })
      })
      .catch((error) => {
        console.error(error);
      })
  }
}