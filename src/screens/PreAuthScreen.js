import React, { useContext, useEffect } from 'react';
import { ImageBackground, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { Context as DriverContext } from '../context/DriverContext';
import useNavigateAfterLogin from '../hooks/useNavigateAfterLogin';
import { useKeepAwake } from 'expo-keep-awake';



const PreAuthScreen = () => {
    
    const { tryLocalSignin, signoutDriver } = useContext(DriverContext);
    const [ signinAndNavigate, error ] = useNavigateAfterLogin();

    useEffect(() => {

        signinAndNavigate(tryLocalSignin);

    }, [])

    useKeepAwake();

    useEffect(() => {
        // console.log(error);
        if(error) {
            Alert.alert('Signin Error', 'There is an error with this user, please sign out and sign in again', [
                {
                    text: 'Sign Out',
                    onPress: () => {
                        clearError();
                        signoutDriver();
                    }
                }
            ])
        }
    }, [error]);


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