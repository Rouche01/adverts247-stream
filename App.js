import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SigninScreen from './src/screens/SigninScreen';
import { Provider as DriverProvider } from './src/context/DriverContext';
import { Provider as VodContentProvider } from './src/context/vodContentContext';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { setNavigator } from './src/navigationRef';
import PreAuthScreen from './src/screens/PreAuthScreen';
import DriverInfoScreen from './src/screens/DriverInfoScreen';
import AdPlayerScreen from './src/screens/AdPlayerScreen';
import GameStartScreen from './src/screens/GameStartScreen';
import GameIntroScreen from './src/screens/GameIntroScreen'
import TriviaQuestionScreen from './src/screens/TriviaQuestionScreen';



const navigator = createSwitchNavigator({
  PreAuth: PreAuthScreen,
  Signin: SigninScreen,
  welcomeFlow: createStackNavigator({
    Welcome: WelcomeScreen,
    DriverInfo: DriverInfoScreen
  }),
  AdPlayer: AdPlayerScreen,
  GameStart: GameStartScreen,
  GameIntro: GameIntroScreen,
  TriviaQuestion: TriviaQuestionScreen
})



const App = createAppContainer(navigator);


export default () => {
  return(
    <DriverProvider>
      <VodContentProvider>
        <App ref={(navigator) => setNavigator(navigator)} />
      </VodContentProvider>
    </DriverProvider>
  )
}
