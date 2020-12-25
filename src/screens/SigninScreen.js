import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import CustomInput from '../components/CustomInput';
import { Context as DriverContext } from '../context/DriverContext';
import useNavigateAfterLogin from '../hooks/useNavigateAfterLogin';


const SigninScreen = ({ navigation }) => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');

    const { state: { loading, user }, signinDriver, getUser} = useContext(DriverContext);
    const [ signinAndNavigate ] = useNavigateAfterLogin();

    useEffect(() => {

        console.log(user);
        
    }, [user])

    const signIn = () => {
        const data = {
            email: email, 
            password: password
        }
        signinAndNavigate(signinDriver, data);
    }

    return (
        <ImageBackground style={styles.backgroundStyle} 
            source={require('../../assets/landingBackground.png')}
        >
            <StatusBar 
                barStyle="light-content"
                backgroundColor="rgba(0,0,0,0.2)"
                translucent={true}
            />
            <View style={styles.signinContainer}>
                <Text style={styles.headingText}>Sign In Driver</Text>
                <CustomInput 
                    value={email}
                    placeholder="Email"
                    autoCorrect={false}
                    capitalize="none"
                    onChange={(value) => setEmail(value)}
                />
                <CustomInput 
                    value={password}
                    placeholder="Password"
                    autoCorrect={false}
                    capitalize="none"
                    onChange={setPassword}
                    secure={true}
                />
                <Button
                    onPress={signIn}
                    loading={loading}
                    title="Sign In"
                    containerStyle={{ borderRadius: 60, width: '50%', alignSelf: 'center' }}
                    titleStyle={{ fontSize: 18 }}
                    buttonStyle={{ padding: 15, backgroundColor: '#fe0000' }}
                />
            </View>
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    backgroundStyle: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    signinContainer: {
        width: 400,
        alignSelf: 'center'
    },
    headingText: {
        fontSize: 34,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 14
    },
});


export default SigninScreen;