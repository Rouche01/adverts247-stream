import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SigninScreen from './src/screens/SigninScreen';
import { Provider as DriverProvider } from './src/context/DriverContext';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { setNavigator } from './src/navigationRef';
import PreAuthScreen from './src/screens/PreAuthScreen';



const navigator = createSwitchNavigator({
  PreAuth: PreAuthScreen,
  Signin: SigninScreen,
  Welcome: WelcomeScreen
})



const App = createAppContainer(navigator);


export default () => {
  return(
    <DriverProvider>
      <App ref={(navigator) => setNavigator(navigator)} />
    </DriverProvider>
  )
}
