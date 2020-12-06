import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SigninScreen from './src/screens/SigninScreen';
import { Provider as DriverProvider } from './src/context/DriverContext';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { setNavigator } from './src/navigationRef';
import PreAuthScreen from './src/screens/PreAuthScreen';
import DriverInfoScreen from './src/screens/DriverInfoScreen';
import AdPlayerScreen from './src/screens/AdPlayerScreen';



const navigator = createSwitchNavigator({
  PreAuth: PreAuthScreen,
  Signin: SigninScreen,
  welcomeFlow: createStackNavigator({
    Welcome: WelcomeScreen,
    DriverInfo: DriverInfoScreen
  }),
  AdPlayer: AdPlayerScreen
})



const App = createAppContainer(navigator);


export default () => {
  return(
    <DriverProvider>
      <App ref={(navigator) => setNavigator(navigator)} />
    </DriverProvider>
  )
}
