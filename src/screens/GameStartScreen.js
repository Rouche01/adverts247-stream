import React, { useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Text, Image, StatusBar } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import useStreamingStatus from '../hooks/useStreamingStatus';
import useClearHistory from '../hooks/useClearHistory';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useKeepAwake } from 'expo-keep-awake';


const GameStartScreen = ({ navigation }) => {

    const [ streamStatus ] = useStreamingStatus();
    const [ clearHistory ] = useClearHistory();

    useKeepAwake();

    useEffect(() => {

        if(streamStatus === "off") {
            // console.log(streamStatus);
            clearHistory();
            navigation.navigate('NoActivity');
        }

    }, [streamStatus]);

    useEffect(() => {

        let navigationTimer = setTimeout(() => {
            navigation.navigate('GameIntro');
        }, 4000)

        return () => {
            clearTimeout(navigationTimer);
        }

    }, [])

    return (
        <ImageBackground
            source={require('../../assets/welcome-background.png')}
            style={styles.backgroundStyle}
        >
            <StatusBar 
                barStyle="light-content"
                backgroundColor="rgba(0,0,0,0.2)"
                translucent={true}
            />
            <View style={styles.mainInfo}>
                <Entypo name="game-controller" size={hp('20%')} color="#F1040E" />
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
        marginTop: -1 * hp('9%')
    },
    mainText: {
        fontSize: hp('12%'),
        color: '#fff',
        fontWeight: 'bold'
    },
    logoStyle: {
        width: wp('18%'), 
        height: hp('9%'),
        position: 'absolute',
        bottom: hp('10%'),
        left: wp('6%')
    }
})


export default GameStartScreen;