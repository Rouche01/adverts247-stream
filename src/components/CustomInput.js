import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';
import { TextInput, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const CustomInput = ({ placeholder, capitalize, autoCorrect, value, onChange, secure, validationError, keyboardType }) => {
    return <View style={styles.inputGroup}>
        <TextInput 
            style={styles.inputStyle}
            placeholder={placeholder}
            autoCapitalize={capitalize}
            autoCorrect={autoCorrect}
            value={value}
            onChangeText={(value) => onChange(value)}
            secureTextEntry={secure}
            keyboardType={keyboardType}
        />
        { validationError && <Text style={styles.errorStyle}>{validationError}</Text> }
    </View>
}


const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: '#fff',
        height: hp('12%'),
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: hp('2%'),
        fontSize: hp('4%'),        
    },
    errorStyle: {
        color: '#FE0000',
        fontSize: hp('2.6%'),
    },
    inputGroup: {
        marginBottom: hp('4%')
    }
});


export default CustomInput;