import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import CustomInput from '../components/CustomInput';
import { Context as DriverContext } from '../context/DriverContext';


const SigninScreen = ({ navigation }) => {

    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');

    const { state: { loading, user }, signinDriver, getUser} = useContext(DriverContext);

    useEffect(() => {

        console.log(user);
        
    }, [user])

    return (
        <ImageBackground style={styles.backgroundStyle} 
            source={require('../../assets/landingBackground.png')}
        >
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
                    onPress={() => signinDriver({email: email, password: password}, getUser)}
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