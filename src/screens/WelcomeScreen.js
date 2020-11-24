import React, { useContext, useEffect } from 'react';
import { ImageBackground, Text, View, StyleSheet, StatusBar, Image } from 'react-native';
import { Context as DriverContext } from '../context/DriverContext';


const WelcomeScreen = () => {

    const { state: { user } } = useContext(DriverContext);

    useEffect(() => {

        console.log(user);

    }, [user])

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