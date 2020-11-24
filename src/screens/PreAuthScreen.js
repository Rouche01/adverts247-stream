import React, { useContext, useEffect } from 'react';
import { ImageBackground, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { Context as DriverContext } from '../context/DriverContext';



const PreAuthScreen = () => {
    
    const { tryLocalSignin, getUser } = useContext(DriverContext);

    useEffect(() => {

        tryLocalSignin(getUser);

    }, [])

    return(
        <ImageBackground
            source={require('../../assets/landingBackground.png')}
            style={styles.backgroundStyle}
        >
            <ActivityIndicator color="#fff" size={50} />
            <StatusBar backgroundColor="rgba(0, 0, 0, 0.2)" barStyle="light-content" translucent={true} />
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    backgroundStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default PreAuthScreen;