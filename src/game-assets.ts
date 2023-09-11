import { AssetItem } from "types"
import { AppModule } from "modules/app";
import { loadImage } from "shared/utils";

export interface GImages {
  logo: AssetItem,
  bgIntro: AssetItem,
  bgBody: AssetItem,
  imageGamePLay: AssetItem,
  iconOvums: AssetItem,
  iconStore: AssetItem,
  btnBattle: AssetItem,
  boxLv1: AssetItem,
  boxLv2: AssetItem,
  boxLv3: AssetItem,
  boxLv4: AssetItem,
  boxLv5: AssetItem,
  boxLv6: AssetItem,
  modalName: AssetItem,
  modalGameName: AssetItem,
  modalCornorTop: AssetItem,
  modalCornorBottom: AssetItem,
  modalBtnClose: AssetItem,
  modalLeafsLeft: AssetItem,
  modalLeafsRight: AssetItem,
  introStep1: AssetItem,
  introStep2: AssetItem,
  introStep3: AssetItem,
  introStep4: AssetItem,
  potion: AssetItem,
  modalGameLabel: AssetItem,
  modalGameBody: AssetItem,
  modalGameBtnClose: AssetItem,
  leafL: AssetItem,
  vines: AssetItem,
}

export const appGImages: GImages = {
  logo: {
    medium: '/images/logo.png',
    large: '/images/logo@2x.png',
  },
  bgIntro: {
    medium: '/images/home/bg-intro.png',
    large: '/images/home/bg-intro@2x.png',
  },
  bgBody: {
    medium: '/images/home/bg-body.png',
    large: '/images/home/bg-body@2x.png',
  },
  imageGamePLay: {
    medium: '/images/home/PVE.png',
    large: '/images/home/PVE@2x.png',
  },
  iconOvums: {
    medium: '/images/icon/ovums.png',
    large: '/images/icon/ovums@2x.png',
  },
  iconStore: {
    medium: '/images/icon/store.png',
    large: '/images/icon/store@2x.png',
  },
  btnBattle: {
    medium: '/images/elements/btn-battle.png',
    large: '/images/elements/btn-battle@2x.png',
  },
  boxLv1: {
    medium: '/images/boxes/1.png',
    large: '/images/boxes/1@2x.png',
  },
  boxLv2: {
    medium: '/images/boxes/2.png',
    large: '/images/boxes/2@2x.png',
  },
  boxLv3: {
    medium: '/images/boxes/3.png',
    large: '/images/boxes/3@2x.png',
  },
  boxLv4: {
    medium: '/images/boxes/4.png',
    large: '/images/boxes/4@2x.png',
  },
  boxLv5: {
    medium: '/images/boxes/5.png',
    large: '/images/boxes/5@2x.png',
  },
  boxLv6: {
    medium: '/images/boxes/6.png',
    large: '/images/boxes/6@2x.png',
  },
  modalName: {
    medium: '/images/elements/modal-name.png',
    large: '/images/elements/modal-name@2x.png',
  },
  modalGameName: {
    medium: '/images/elements/modal-game-name.png',
    large: '/images/elements/modal-game-name@2x.png',
  },
  modalCornorTop: {
    medium: '/images/elements/modal-cornor-top.png',
    large: '/images/elements/modal-cornor-top@2x.png',
  },
  modalCornorBottom: {
    medium: '/images/elements/modal-cornor-bottom.png',
    large: '/images/elements/modal-cornor-bottom@2x.png',
  },
  modalBtnClose: {
    medium: '/images/elements/modal-btn-close.png',
    large: '/images/elements/modal-btn-close@2x.png',
  },
  modalLeafsLeft: {
    medium: '/images/elements/modal-leafs-left.png',
    large: '/images/elements/modal-leafs-left@2x.png',
  },
  modalLeafsRight: {
    medium: '/images/elements/modal-leafs-right.png',
    large: '/images/elements/modal-leafs-right@2x.png',
  },
  introStep1: {
    medium: '/images/intro-steps/1.png',
    large: '/images/intro-steps/1@2x.png',
  },
  introStep2: {
    medium: '/images/intro-steps/2.png',
    large: '/images/intro-steps/2@2x.png',
  },
  introStep3: {
    medium: '/images/intro-steps/3.png',
    large: '/images/intro-steps/3@2x.png',
  },
  introStep4: {
    medium: '/images/intro-steps/4.png',
    large: '/images/intro-steps/4@2x.png',
  },
  potion: {
    medium: '/images/items/potion.png',
    large: '/images/items/potion.png',
  },
  modalGameLabel: {
    medium: '/game-play/elements/modal-label.png',
    large: '/game-play/elements/modal-label@2x.png'
  },
  modalGameBody: {
    medium: '/game-play/elements/modal-body.png',
    large: '/game-play/elements/modal-body@2x.png',
  },
  modalGameBtnClose: {
    medium: '/game-play/elements/modal-btn-close.png',
    large: '/game-play/elements/modal-btn-close.png',
  },
  leafL: {
    medium: '/game-play/elements/leafL.png',
    large: '/game-play/elements/leafL.png',
  },
  vines: {
    medium: '/game-play/elements/vines.png',
    large: '/game-play/elements/vines.png',
  }
}

export const getGImage = AppModule.assets<GImages>(appGImages);

export const loadGImage = async () => {
  return Promise.all(Object.keys(appGImages).map((key) => loadImage(getGImage(key as any))));
}