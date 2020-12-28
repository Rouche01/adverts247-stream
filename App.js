import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as Font from 'expo-font';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import SigninScreen from './src/screens/SigninScreen';
import { Provider as DriverProvider } from './src/context/DriverContext';
import { Provider as VodContentProvider } from './src/context/vodContentContext';
import { Provider as TriviaProvider } from './src/context/triviaContext';
import { Provider as RiderProvider } from './src/context/riderContext';
import { Provider as StreamingProvider } from './src/context/StreamingContext';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { setNavigator } from './src/navigationRef';
import PreAuthScreen from './src/screens/PreAuthScreen';
import DriverInfoScreen from './src/screens/DriverInfoScreen';
import AdPlayerScreen from './src/screens/AdPlayerScreen';
import GameStartScreen from './src/screens/GameStartScreen';
import GameIntroScreen from './src/screens/GameIntroScreen'
import TriviaQuestionScreen from './src/screens/TriviaQuestionScreen';
import RiderInfoScreen from './src/screens/RiderInfoScreen';
import TriviaResultScreen from './src/screens/TriviaResultScreen';
import NoActivityScreen from './src/screens/NoActivityScreen';
import PermissionGatewayScreen from './src/screens/PermissionGatewayScreen';


const customFonts = {
  Audiowide: require('./assets/fonts/Audiowide-Regular.ttf'),
  RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
  RobotoMedium: require('./assets/fonts/Roboto-Medium.ttf'),
  RobotoBold: require('./assets/fonts/Roboto-Bold.ttf')
}


const navigator = createSwitchNavigator({
  PreAuth: PreAuthScreen,
  Signin: SigninScreen,
  PermissionGateway: PermissionGatewayScreen,
  welcomeFlow: createStackNavigator({
    Welcome: WelcomeScreen,
    DriverInfo: DriverInfoScreen
  }),
  AdPlayer: AdPlayerScreen,
  GameStart: GameStartScreen,
  GameIntro: GameIntroScreen,
  TriviaQuestion: TriviaQuestionScreen,
  RiderInfo: RiderInfoScreen,
  TriviaResult: TriviaResultScreen,
  NoActivity: NoActivityScreen
})



const App = createAppContainer(navigator);


export default () => {

  const [isLoaded] = useFonts(customFonts);
  console.log(isLoaded);
  if(!isLoaded) {
    return <AppLoading />
  }

  return(
    <DriverProvider>
      <VodContentProvider>
        <TriviaProvider>
          <RiderProvider>
            <StreamingProvider>
              <App ref={(navigator) => setNavigator(navigator)} />
            </StreamingProvider>
          </RiderProvider>
        </TriviaProvider>
      </VodContentProvider>
    </DriverProvider>
  );

}
