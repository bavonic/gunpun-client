import { AssetItem } from "types"
import { AppModule } from "modules/app"

export interface AppImages {

}

export const appImages: AppImages = {

}

export const getImage = AppModule.assets<AppImages>(appImages)
