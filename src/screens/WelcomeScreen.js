import React, { useContext, useEffect, useRef, useState } from 'react';
import { ImageBackground, Text, Alert, StyleSheet, StatusBar, Image } from 'react-native';
import { Context as DriverContext } from '../context/DriverContext';
import useClearHistory from '../hooks/useClearHistory';
import useLocation from '../hooks/useLocation';
import useDate from '../hooks/useDate';
import useWeatherData from '../hooks/useWeatherData';
import useStreamingStatus from '../hooks/useStreamingStatus';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { checkLocationPermission } from '../utils/userPermissions';


const WelcomeScreen = ({ navigation }) => {

    const { state: { user } } = useContext(DriverContext);

    const [ location, errorMsg, latLongVal ] = useLocation();
    const [ streamStatus ] = useStreamingStatus();
    const [ clearHistory ] = useClearHistory()
    const [ dateString ] = useDate();
    const [ weatherData ] = useWeatherData(latLongVal);


    useEffect(() => {

        if(streamStatus === "off") {
            // console.log(streamStatus);
            clearHistory();
            navigation.navigate('NoActivity');
        }

    }, [streamStatus]);

    useEffect(() => {
        
        (async() => {

            const locationPermission = await checkLocationPermission();

            if (!locationPermission) {
                navigation.navigate('PermissionGateway');
            }
        })();

    }, []);

    useEffect(() => {

        if(errorMsg) {
            Alert.alert('Error Occured', errorMsg);
        }

    }, [errorMsg])


    const navigationTimer = useRef(null);


    useEffect(() => {

        if(user && location && weatherData) {
            // console.log(location, weatherData);
            navigationTimer.current = setTimeout(() => {
                navigation.navigate('DriverInfo', { user, location, dateString, weatherData });
            }, 2500)
        }

    }, [user, location, weatherData]);


    useEffect(() => {

        return () => {
            clearTimeout(navigationTimer.current);
        }

    }, []);


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
        width: wp('30%'), 
        height: hp('20%'),
    },
    headingStyle: {
        fontFamily: 'Audiowide',
        fontSize: hp('10%'),
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20
    }
});


export default WelcomeScreen;