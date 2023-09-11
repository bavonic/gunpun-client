import { Client } from 'colyseus.js';
import 'rc-slider/assets/index.css';
import { FC } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { appRoutes } from 'routes';
import { store } from 'stores';
import "./app-styles.scss";

import 'css/animated.min.css';

import { BlockChainProvider } from 'shared/blockchain/context';
import { SoundProvider } from 'shared/sounds';
import { soundConfigs } from 'sounds';
import reportWebVitals from './reportWebVitals';
import { ConfigsProvider, getConfig } from 'modules/configs/context';
import { AccountProvider } from 'modules/account/context';
import { ModalCreateRoom } from 'modals/create-room';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

export const gameClient = new Client(getConfig('URL_SERVER_GAME')
  .replace('https', 'wss')
  .replace('http', 'ws'));

const AppContent: FC = () => {

  return <BlockChainProvider>
    <ConfigsProvider>
      <Provider store={store}>
        <SoundProvider soundConfigs={soundConfigs}>
          <AccountProvider>
            {/* <GamePlayProvider>  */}
              {/* MODAL */}
              {/* <ModalCreateRoom /> */}

              <RouterProvider router={appRoutes} />
            {/* </GamePlayProvider> */}
          </AccountProvider>
        </SoundProvider>
      </Provider>
    </ConfigsProvider>
  </BlockChainProvider>
}

root.render(<AppContent />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
