import React from 'react';
import { TextInput, StyleSheet } from 'react-native';


const CustomInput = ({ placeholder, capitalize, autoCorrect, value, onChange, secure }) => {
    return <TextInput 
        style={styles.inputStyle}
        placeholder={placeholder}
        autoCapitalize={capitalize}
        autoCorrect={autoCorrect}
        value={value}
        onChangeText={(value) => onChange(value)}
        secureTextEntry={secure}
    />
}


const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: '#fff',
        height: 55,
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 18,
        marginBottom: 20
    }
});


export default CustomInput;