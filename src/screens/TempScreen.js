import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoaderAnimation from '../components/LoaderAnimation';



const TempScreen = () => {

    return (
        <View style={styles.layer}>
            <LoaderAnimation />
        </View>
    );
}


const styles = StyleSheet.create({
    layer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default TempScreen;