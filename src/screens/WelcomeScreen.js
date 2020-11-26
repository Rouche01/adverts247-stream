import React, { useContext, useEffect } from 'react';
import { ImageBackground, Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { Context as DriverContext } from '../context/DriverContext';
import useLocation from '../hooks/useLocation';
import useDate from '../hooks/useDate';
import useWeatherData from '../hooks/useWeatherData';


const WelcomeScreen = ({ navigation }) => {

    const { state: { user } } = useContext(DriverContext);
    const [ location, errorMsg, latLongVal ] = useLocation();
    const [ dateString ] = useDate();
    const [ weatherData ] = useWeatherData(latLongVal);


    useEffect(() => {

        if(user && location && weatherData) {
            console.log(location);
            setTimeout(() => {
                navigation.navigate('DriverInfo', { user, location, dateString, weatherData });
            }, 1500)
        }

    }, [user, location, weatherData]);


    return (
        <ImageBackground source={require('../../assets/welcome-background.png')}
            style={styles.backgroundStyle}
        >
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" barStyle="light-content" translucent={true} />
            <Image source={require('../../assets/logoAlt.png')} resizeMode="contain" 
                style={styles.logoStyle} 
            />
            <Text style={styles.headingStyle}>WELCOME ONBOARD!</Text>
        </ImageBackground>
    )
}


WelcomeScreen.navigationOptions = {
    headerShown: false
}


const styles = StyleSheet.create({
    backgroundStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoStyle: {
        width: 260, 
        height: 90,
    },
    headingStyle: {
        fontSize: 40,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20
    }
});


export default WelcomeScreen;