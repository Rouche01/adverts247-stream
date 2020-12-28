import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import TriviaInfoLoader from '../components/TriviaInfoLoader';
import { FontAwesome5 } from '@expo/vector-icons';
import useStreamingStatus from '../hooks/useStreamingStatus';
import useClearHistory from '../hooks/useClearHistory';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const GameIntroScreen = ({ navigation }) => {

    const [ stage, setStage ] = useState(0);
    const [ instruction, setInstruction ] = useState("Answer as many questions correctly before time runs out");

    const [ clearHistory ] = useClearHistory();
    const [ streamStatus ] = useStreamingStatus();

    const navigationTimer = useRef(null);

    useEffect(() => {

        if(streamStatus === "off") {
            // console.log(streamStatus);
            clearHistory();
            navigation.navigate('NoActivity');
        }

    }, [streamStatus]);


    useEffect(() => {

        let stageTimer = setTimeout(() => {
            setStage(1);
        }, 4000);

        return () => {
            clearTimeout(stageTimer);
            clearTimeout(navigationTimer.current);
        }

    }, []);

    useEffect(() => {

        if(stage === 1) {
            setInstruction("Today's top score prize is N50,000 from GTBank")
            navigationTimer.current = setTimeout(() => {
                navigation.navigate('TriviaQuestion');
            }, 4000);
        }

    }, [stage])

    return (
        <View style={styles.backgroundStyle}>
            <StatusBar barStyle="light-content" 
                backgroundColor="rgba(0, 0, 0, 0.2)"
                translucent={true}
            />
            <Text style={styles.headerText}>How to Play</Text>
            <View style={styles.instructionBox}>
                { stage === 0 ? 
                    <TriviaInfoLoader /> : 
                    <FontAwesome5 style={styles.iconStyle} name="gift" size={hp('15%')} color="#F1040E" />
                }
                <Text style={styles.instructions}>
                    {instruction}
                </Text>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    backgroundStyle: {
        flex: 1,
        backgroundColor: '#262525',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        color: '#fff',
        fontSize: hp('8.8%'),
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: hp('6%')
    },
    instructionBox: {
        width: '60%',
        backgroundColor: '#1D1B1B',
        paddingHorizontal: wp('2.6%'),
        paddingVertical: hp('7%'),
        borderRadius: 20,
        elevation: 10
    },
    instructions: {
        color: '#fff',
        fontSize: hp('6.5%'),
        textAlign: 'center'
    },
    iconStyle: {
        textAlign: 'center'
    }
});



export default GameIntroScreen;