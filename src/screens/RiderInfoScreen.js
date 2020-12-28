import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import CustomInput from '../components/CustomInput';
import { Context as RiderContext } from '../context/riderContext';
import useStreamingStatus from '../hooks/useStreamingStatus';
import useClearHistory from '../hooks/useClearHistory';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const RiderInfoScreen = ({ navigation }) => {

    const [ fullname, setFullname ] = useState('');
    const [ riderEmail, setRiderEmail ] = useState('');
    const [ phoneNumber, setPhoneNumber ] = useState('');
    const [ validationErrors, setValidationErrors ] = useState({
        fullname: '',
        riderEmail: '',
        phoneNumber: ''
    });

    const { 
        state: { loading, error },
        checkRider
    } = useContext(RiderContext);

    const [ clearHistory ] = useClearHistory();
    const [ streamStatus ] = useStreamingStatus();

    const didCancel = useRef(null);

    useEffect(() => {

        if(streamStatus === "off") {
            // console.log(streamStatus);
            clearHistory();
            navigation.navigate('NoActivity');
        }

    }, [streamStatus]);

    useEffect(() => {

        didCancel.current = false;
        // console.log(navigation.state.params.triviaSession);

        // const navigationTimer = setTimeout(() => {
        //     navigation.navigate('AdPlayer');
        // }, 80000)

        return () => {
            didCancel.current = true;
            // clearTimeout(navigationTimer);
        }

    }, [])

    useEffect(() => {

        // console.log(error);

    }, [error]);

    const validateInput = (name, phoneNumber, email) => {
        
        let validMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        let validPhoneNumber = /^[0]\d{10}$/;
        const errorsInit = {};

        let fields = {
            fullname: name,
            riderEmail: email,
            phoneNumber
        };

        for(const key in fields) {
            if(!fields[key]) {
                errorsInit[key] = "This field is a required field";
            }
            if(fields.riderEmail && !fields.riderEmail.match(validMail)) {
                errorsInit.riderEmail = "Please enter a valid email address.";
            }
            if(fields.phoneNumber && !fields.phoneNumber.match(validPhoneNumber)) {
                errorsInit.phoneNumber = "Please enter a valid phone number."
            }
        }

        setValidationErrors(errorsInit);

        if(Object.entries(errorsInit).length === 0) {
            return true;
        } else {
            return false;
        }

    }

    const onSubmit = async() => {

        const validated = validateInput(fullname, phoneNumber, riderEmail);
        const { triviaSession } = navigation.state.params

        if(validated) {
            const riderData = {
                fullname,
                email: riderEmail,
                phoneNumber,
            };

            if(!didCancel.current) {
                await checkRider(riderData, triviaSession);
                if(!didCancel.current) {
                    navigation.navigate('TriviaResult');
                }
            }
        }
    }

    return (
        <View style={styles.backgroundStyle}>
            <StatusBar 
                barStyle="light-content"
                backgroundColor="rgba(0, 0, 0, 0.2)"
                translucent={true}
            />
            <Text style={styles.headerText}>ENTER YOUR DETAILS TO CLAIM PRIZE</Text>
            <View style={styles.formContainer}>
                <CustomInput 
                    placeholder="Fullname"
                    capitalize="words"
                    autoCorrect={false}
                    value={fullname}
                    onChange={(value) => {
                        setValidationErrors({ ...validationErrors, fullname: '' })
                        setFullname(value)
                    }}
                    validationError={
                        validationErrors.fullname && validationErrors.fullname.length > 0 ? validationErrors.fullname : null
                    }
                />
                <CustomInput 
                    placeholder="Email Address"
                    capitalize="none"
                    autoCorrect={false}
                    value={riderEmail}
                    onChange={(value) => {
                        setValidationErrors({ ...validationErrors, riderEmail: '' });
                        setRiderEmail(value);
                    }}
                    validationError={
                        validationErrors.riderEmail && validationErrors.riderEmail.length > 0 ? validationErrors.riderEmail : null
                    }
                />
                <CustomInput 
                    placeholder="Phone Number"
                    capitalize="none"
                    autoCorrect={false}
                    value={phoneNumber}
                    onChange={(value) => {
                        setValidationErrors({ ...validationErrors, phoneNumber: '' });
                        setPhoneNumber(value);
                    }}
                    validationError={
                        validationErrors.phoneNumber && validationErrors.phoneNumber.length > 0 ? validationErrors.phoneNumber : null
                    }
                    keyboardType="number-pad"
                />
                <Button
                    onPress={() => onSubmit() }
                    loading={loading}
                    title="Submit"
                    containerStyle={{ borderRadius: 60, width: '50%', alignSelf: 'center' }}
                    titleStyle={{ fontSize: hp('4.5%') }}
                    buttonStyle={{ padding: hp('2%'), backgroundColor: '#fe0000' }}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#262525',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: hp('6%'),
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: hp('4%')
    },
    formContainer: {
        backgroundColor: '#1D1B1B',
        width: '55%',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('5%'),
        borderRadius: 15,
        elevation: 10
    }
})

export default RiderInfoScreen;