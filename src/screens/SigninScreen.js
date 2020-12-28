import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, StatusBar, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import CustomInput from '../components/CustomInput';
import { Context as DriverContext } from '../context/DriverContext';
import useNavigateAfterLogin from '../hooks/useNavigateAfterLogin';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useKeepAwake } from 'expo-keep-awake';


const SigninScreen = () => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');
    const [ validationError, setValidationError ] = useState({
        email: '',
        password: ''
    });

    const { state: { loading }, signinDriver, clearError } = useContext(DriverContext);
    const [ signinAndNavigate, error ] = useNavigateAfterLogin();

    useKeepAwake();

    useEffect(() => {
        // console.log(error);
        if(error) {
            Alert.alert('Signin Error', 'This was an error signing in, make sure you are entering the correct details and try again', [
                {
                    text: 'Try Again',
                    onPress: () => {
                        clearError();
                    }
                }
            ])
        }
    }, [error]);


    const validateInput = () => {

        let validMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const errorsInit = {};

        const fields = { email, password };

        for (const key in fields) {
            if(!fields[key]) {
                errorsInit[key] = "This field is a required field";
            }
            if(fields.email && !fields.email.match(validMail)) {
                errorsInit.email = "Please enter a valid email address.";
            }
        }

        setValidationError(errorsInit);

        if(Object.entries(errorsInit).length === 0) {
            return true;
        } else {
            return false;
        }

    }


    const signIn = () => {
        const data = {
            email: email, 
            password: password
        }

        const validated = validateInput();

        if(validated) {
            signinAndNavigate(signinDriver, data);
        }
        
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
                <Text style={styles.headingText}>Driver Sign-in</Text>
                <CustomInput 
                    value={email}
                    placeholder="Email"
                    autoCorrect={false}
                    capitalize="none"
                    onChange={(value) => {
                        setValidationError({ ...validationError, email: '' })
                        setEmail(value)
                    }}
                    validationError={
                        validationError.email && validationError.email.length > 0 ? validationError.email : null
                    }
                />
                <CustomInput 
                    value={password}
                    placeholder="Password"
                    autoCorrect={false}
                    capitalize="none"
                    onChange={(value) => {
                        setValidationError({ ...validationError, password: '' })
                        setPassword(value)
                    }}
                    secure={true}
                    validationError={
                        validationError.password && validationError.password.length > 0 ? validationError.password : null
                    }
                />
                <Button
                    onPress={signIn}
                    loading={loading}
                    title="Sign In"
                    containerStyle={{ borderRadius: 60, width: '50%', alignSelf: 'center' }}
                    titleStyle={{ fontSize: hp('4.6%') }}
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
        width: wp('48%'),
        alignSelf: 'center'
    },
    headingText: {
        fontSize: hp('8.3%'),
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: hp('3.5%')
    },
});


export default SigninScreen;