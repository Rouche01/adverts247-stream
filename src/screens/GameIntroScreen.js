import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import TriviaInfoLoader from '../components/TriviaInfoLoader';
import { FontAwesome5 } from '@expo/vector-icons';


const GameIntroScreen = ({ navigation }) => {

    const [ stage, setStage ] = useState(0);
    const [ instruction, setInstruction ] = useState("Answer as many questions correctly before time runs out");

    useEffect(() => {

        setTimeout(() => {
            setStage(1);
        }, 4000)

    }, []);

    useEffect(() => {

        if(stage === 1) {
            setInstruction("Today's top score prize is N50,000 from GTBank")
            setTimeout(() => {
                navigation.navigate('TriviaQuestion');
            }, 4000)
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
                    <FontAwesome5 style={styles.iconStyle} name="gift" size={44} color="#F1040E" />
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
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    instructionBox: {
        width: '60%',
        backgroundColor: '#1D1B1B',
        paddingHorizontal: 20,
        paddingVertical: 28,
        borderRadius: 20
    },
    instructions: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    iconStyle: {
        textAlign: 'center'
    }
});



export default GameIntroScreen;