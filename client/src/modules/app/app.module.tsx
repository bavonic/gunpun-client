import { getLocaleKey, translate } from "language";
import { store, useSelector } from "stores";
import { AssetItem, Device, EDeviceType, WindowDimensions } from "types";
import { OnAlert } from "components";
import { RequestMainModule } from "modules/request";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { loadImage } from "shared/utils";
import Web3 from "web3";

export class AppModule {
  // static renderHead(main: PageHead = {}): any {
  //   const configs = {
  //     title: main.title ? `${main.title} | ${getEnv('APP_NAME')}` : getEnv('META_TITLE_DEFAULT'),
  //     thumbnailURL: main.thumbnailURL || `${getEnv('PUBLIC_URL')}/images/thumbnail.jpg`,
  //     webURL: `${getEnv('PUBLIC_URL')}${main.routePath || ''}`,
  //     description: StringUtils.removeHtmlTags(main.description || getEnv('META_DESCRIPTION_DEFAULT')),
  //     siteName: main.siteName || getEnv('META_TITLE_DEFAULT'),
  //     type: main.type || 'web',
  //   }

  //   // ============================ Render ============================
  //   return (
  //     <Head>
  //       <title>{configs.title} </title>

  //       <link rel="canonical" href={configs.webURL} />
  //       <meta name="description" content={configs.description} />

  //       {/* Facebook */}
  //       <meta property="og:title" content={configs.title} />
  //       <meta property="og:description" content={configs.description} />
  //       <meta property="og:image" content={configs.thumbnailURL} />
  //       <meta property="og:image:url" content={configs.thumbnailURL} />
  //       <meta property="og:url" content={configs.webURL} />
  //       <meta property="og:site_name" content={configs.siteName} />
  //       <meta property="og:type" content={configs.type} />
  //     </Head>
  //   );
  // }

  static onError = (error: any) => {
    console.error(error);

    // if (error instanceof BlockchainError) {
    //   const onAlert = (msg: string) => OnAlert({
    //     type: 'ERROR',
    //     body: msg,
    //     nextLabel: translate('view-transaction'),
    //     onNext: error.transactionHash ? () => {
    //       window.open(`${renderLinkTransaction(error.transactionHash)}`);
    //     } : undefined,
    //   })

    //   const { message: pureMessage, transactionHash, code } = error;

    //   let message = pureMessage;
    //   if (code === BlockchainErrorCode.USER_REJECTED) message = 'You have declined the transaction';
    //   if (code === BlockchainErrorCode.INVALID_JSON_RPC_ERROR) message = 'MetaMask is having trouble connecting to the network';

    //   else {
    //     return onAlert(translate('alert-unknown-error'));
    //   }
    // } else {
    //   OnAlert({
    //     body: typeof error === 'object' ? error.message : error,
    //     type: 'ERROR',
    //   })
    // }

    OnAlert({
      body: typeof error === 'object' ? error.message : error,
      type: 'ERROR',
    })
  }

  static validateReceiverAddress = (value: string) => {
    if (value && !Web3.utils.isAddress(value)) return translate('Invalid address');
  }

  static parseNum = (res: any) => +res;

  static useOrientation = () => {
    const device = useSelector(s => s.device);
    const defaultWindowDimensions: WindowDimensions = {
      width: 0,
      height: 0,
      type: 'landscape',
    }
    const [windowDimensions, setWindowDimensions] = useState(defaultWindowDimensions);


    function getWindowDimensions(): WindowDimensions {
      const { innerWidth: width, innerHeight: height, ethereum } = window as any;

      return {
        width,
        height,
        type: width > height ? 'landscape' : 'portrait',
        isMetamaskBrowser: !!ethereum && device.type !== EDeviceType.Desktop,
      };
    }


    useEffect(() => {
      const process = () => setWindowDimensions(getWindowDimensions())
      process();

      const supportsOrientationChange = "onorientationchange" in window;
      const orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

      window.addEventListener(orientationEvent, process);
      return () => {
        window.removeEventListener(orientationEvent, process);
      }
    }, []);

    return windowDimensions;
  }

  static renderNum(num: any, digits?: { max?: number, min?: number }) {
    if (typeof num !== 'number') return 0;
    let options: Intl.NumberFormatOptions = {};
    if (digits) {
      if (digits.max) options.maximumFractionDigits = digits.max;
      if (digits.min) options.minimumFractionDigits = digits.min;
    }
    return num.toLocaleString(getLocaleKey(true), options);
  }

  static selectAsset = (asset: AssetItem) => {
    const deviceType = store.getState().device?.type;
    if (deviceType === EDeviceType.Desktop) return asset.large || asset.medium;
    return asset.medium;
  }

  static assets<T>(assets: T) {
    return (key: keyof T) => AppModule.selectAsset(assets[key] as any);
  }

  static loadAssets(assets: any, isReturnArray = false): any {
    if (isReturnArray) return Object.keys(assets).map(async (key: string) => {
      return loadImage(AppModule.selectAsset(assets[key] as any))
    });

    return Promise.all(Object.keys(assets).map(async (key: string) => {
      return loadImage(AppModule.selectAsset(assets[key] as any))
    }))
  }

  static async loadAnimation(uri: string) {
    try {
      // const data = await fetch(`${ getEnv('PUBLIC_URL') }${ uri }`);
      const data = await fetch(uri);
      const json = await data.json();
      return json;
    } catch (error) {
      console.error(error);
      throw Error(`Cannot load animation asset ${uri}`);
    }
  }

  static async pingGameEngine() {
    await RequestMainModule.get(`/engine/v1/ping`)
      .catch(() => true);
  }

  static async wait(time: number) {
    return new Promise(r => setTimeout(r, time));
  }

  static isMobile() {
    const device = store.getState().device as Device;
    return device.type !== EDeviceType.Desktop;
  }

  static randomizer = (rate: number) => {
    if (rate < 0 || rate > 100) throw Error("Invalid rate: only from 0 to 100");
    const random = Math.floor(Math.random() * 100) + 1;
    if (random <= rate) return true;
    return false;
  }

  static useQuery = () => {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
  }
}