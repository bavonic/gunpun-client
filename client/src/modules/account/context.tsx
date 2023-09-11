import { CreateErrorNoti } from 'components';
import { AuthModule } from 'modules/auth/auth.module';
import { UpdateUserPayload, UserEntity, UserProvider } from 'modules/user';
import { UserModule } from 'modules/user/user.module';
import { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { AccessTokenModule } from './accessToken.module';
import { game_v2 } from 'screens/game-v2';
import { SceneLogin } from 'game-play-v2/scenes/sub-monitor/SceneLogin';
import { wait } from 'game-play-v2/game-play/game-play.utils';

interface AccountContext {
  isInitialized: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  isHaveCharacters: boolean;
  information: UserEntity | null;
  handleUpdate: (payload: UpdateUserPayload) => Promise<void>;
  // handleSignIn: (payload: UserSignInWithSocialPayload) => Promise<void>;
  // handleSignUp: (payload: UserPayloadDefault) => Promise<void>;
  handleSignInSocial: (payload: UserProvider) => Promise<void>;
  handleLogout: () => void;
  initialize: (params: any) => any;
  error: string,
}

export const accountContext = createContext({} as AccountContext);

interface State {
  isInitialized: boolean
  isConnecting: boolean,
  userInformation: UserEntity | null,
}

const initialState: State = {
  isInitialized: false,
  isConnecting: false,
  userInformation: null
};

export let getUserInformation: () => UserEntity | null;

export const AccountProvider: FC<PropsWithChildren<any>> = (props) => {
  const [state, setState] = useState<State>(initialState);
  const [error, setError] = useState('');

  getUserInformation = () => state.userInformation;

  const initialize = async () => {
    let userInformation = null;

    try {
      const accessToken = AccessTokenModule.get();
      if (accessToken) {
        try {
          const response = await UserModule.auth();
          userInformation = { ...response }
        } catch (error) {
          // console.log(error)
          AccessTokenModule.remove();
        }
      }
      setState({ isInitialized: true, isConnecting: false, userInformation });
    } catch (error) {
      setState({
        isInitialized: true,
        isConnecting: false,
        userInformation: null,
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const handleSignInSocial = async (type: UserProvider) => {
    setState(s => ({ ...s, isConnecting: true }));
    try {
      let response
      if (type === UserProvider.GOOGLE) response = await AuthModule.signInWithGoogle()
      if (type === UserProvider.FACEBOOK) response = await AuthModule.signInWithFacebook()

      if (response) {
        const idToken = await response.user.getIdToken();
        const responseServer = await UserModule.signInSocial({ idToken })
        AccessTokenModule.save(responseServer.accessToken);
        setState(s => ({ ...s, isConnecting: false, isInitialized: true, userInformation: responseServer.user }))
        
        window.location.reload();
      }
    } catch (error) {
      setState(s => ({ ...s, isConnecting: false }));
      CreateErrorNoti(error.message);
    }
  }

  const handleLogout = async () => {
    AccessTokenModule.remove();
    setState({ ...initialState, isInitialized: true, userInformation: null });

    window.location.reload();
  }

  const handleUpdate = async (payload: UpdateUserPayload) => {
    const user = await UserModule.update(payload)
    if (user) setState(s => ({ ...s, userInformation: user }));

    window.location.reload();
  }

  const context: AccountContext = {
    isInitialized: state.isInitialized,
    isConnecting: state.isConnecting,
    isConnected: state.isInitialized && !!state.userInformation,
    information: state.userInformation,
    isHaveCharacters: !!state.userInformation && !!state.userInformation.avatar && !!state.userInformation.nickname,
    // handleSignIn,
    handleSignInSocial,
    // handleSignUp,
    handleLogout,
    error,
    initialize,
    handleUpdate
  };

  return <accountContext.Provider value={context}>
    {props.children}
  </accountContext.Provider>;
};

export const useAccount = () => useContext(accountContext);