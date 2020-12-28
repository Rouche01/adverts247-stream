import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Context as TriviaContext } from '../context/triviaContext';
import useStreamingStatus from '../hooks/useStreamingStatus';
import useClearHistory from '../hooks/useClearHistory';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useKeepAwake } from 'expo-keep-awake';


const TriviaResultScreen = ({ navigation }) => {

    const { state: { currentTriviaSession } } = useContext(TriviaContext);
    const [ point, setPoint ] = useState();
    const [ questionNumber, setQuestionNumber ] = useState();
    const [ answeredCorrectly, setAnsweredCorrectly ] = useState();

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

        if(currentTriviaSession) {
            // console.log(currentTriviaSession);
            setPoint(currentTriviaSession.totalPoints);
            setQuestionNumber(currentTriviaSession.questions);
            setAnsweredCorrectly(currentTriviaSession.answeredCorrectly);
        }

    }, [currentTriviaSession]);

    useEffect(() => {

        const navigationTimer = setTimeout(() => {
            navigation.navigate('AdPlayer');
        }, 10000);

        return () => {
            clearTimeout(navigationTimer);
        }

    }, [])

    return (
        <View style={styles.backgroundStyle}>
            <View style={styles.resultBox}>
                {/* <FontAwesome5 style={styles.iconStyle} name="gift" size={50} color="#F1040E" /> */}
                <Text style={styles.result}>{answeredCorrectly} / {questionNumber}</Text>
                <Text style={styles.points}>{point} points</Text>
                <Text style={styles.resultText}>
                    You got {answeredCorrectly} questions correctly out of {questionNumber} total questions, and you have a total point of {point}. You might just be the lucky winner, if you are our winner we'll contact you via SMS.
                </Text>
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
    result: { 
        color: '#fff', 
        textAlign: 'center', 
        fontSize: hp('8.5%'), 
        fontWeight: 'bold', 
        opacity: 0.7 
    },
    points: {
        backgroundColor: 'grey',
        textAlign: 'center',
        width: wp('14%'),
        fontSize: hp('4%'),
        alignSelf: 'center',
        marginTop: hp('1%'),
        paddingVertical: hp('1.2%'),
        borderRadius: 5
    },  
    resultBox: {
        width: '60%',
        backgroundColor: '#1D1B1B',
        paddingHorizontal: wp('3.5%'),
        paddingVertical: hp('6.7%'),
        borderRadius: 20,
        elevation: 10
    },
    resultText: {
        color: '#fff',
        fontSize: hp('4.4%'),
        // fontWeight: 'bold',
        textAlign: 'center',
        marginTop: hp('2.5%')
    },
    iconStyle: {
        textAlign: 'center'
    }
});


export default TriviaResultScreen;