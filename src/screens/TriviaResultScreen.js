import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Context as TriviaContext } from '../context/triviaContext';


const TriviaResultScreen = ({ navigation }) => {

    const { state: { currentTriviaSession } } = useContext(TriviaContext);
    const [ point, setPoint ] = useState();
    const [ questionNumber, setQuestionNumber ] = useState();
    const [ answeredCorrectly, setAnsweredCorrectly ] = useState();

    useEffect(() => {

        console.log(currentTriviaSession);
        setPoint(currentTriviaSession.totalPoints);
        setQuestionNumber(currentTriviaSession.questions);
        setAnsweredCorrectly(currentTriviaSession.answeredCorrectly);

    }, [currentTriviaSession]);

    useEffect(() => {

        setTimeout(() => {
            navigation.navigate('AdPlayer');
        }, 2000)

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
        fontSize: 36, 
        fontWeight: 'bold', 
        opacity: 0.7 
    },
    points: {
        backgroundColor: 'grey',
        textAlign: 'center',
        width: 120,
        fontSize: 17,
        alignSelf: 'center',
        marginTop: 5,
        paddingVertical: 4,
        borderRadius: 5
    },  
    resultBox: {
        width: '60%',
        backgroundColor: '#1D1B1B',
        paddingHorizontal: 30,
        paddingVertical: 28,
        borderRadius: 20
    },
    resultText: {
        color: '#fff',
        fontSize: 18,
        // fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10
    },
    iconStyle: {
        textAlign: 'center'
    }
});


export default TriviaResultScreen;