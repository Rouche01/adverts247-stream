import React, { useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Text, Image } from 'react-native';
import { Entypo } from '@expo/vector-icons';



const GameStartScreen = ({ navigation }) => {

    useEffect(() => {

        setTimeout(() => {
            navigation.navigate('GameIntro');
        }, 4000)

    }, [])

    return (
        <ImageBackground
            source={require('../../assets/welcome-background.png')}
            style={styles.backgroundStyle}
        >
            <View style={styles.mainInfo}>
                <Entypo name="game-controller" size={90} color="#F1040E" />
                <Text style={styles.mainText}>Let's Play</Text>
            </View>
            <Image 
                source={require('../../assets/logoAlt.png')}
                resizeMode='contain'
                style={styles.logoStyle}
            />
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    backgroundStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainInfo: {
        alignItems: 'center',
        marginTop: -40
    },
    mainText: {
        fontSize: 50,
        color: '#fff',
        fontWeight: 'bold'
    },
    logoStyle: {
        width: 160, 
        height: 45,
        position: 'absolute',
        bottom: 40,
        left: 50
    }
})


export default GameStartScreen;