import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';
import { TextInput, StyleSheet } from 'react-native';


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
        height: 55,
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 16,
        fontSize: 18,        
    },
    errorStyle: {
        color: '#FE0000',
        fontSize: 12,
    },
    inputGroup: {
        marginBottom: 20
    }
});


export default CustomInput;