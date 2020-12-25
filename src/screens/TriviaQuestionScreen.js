import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Context as TriviaContext } from '../context/triviaContext';
import { Context as RiderContext } from '../context/riderContext';


const OptionBox = ({ optionText, optionPress }) => {
    return (
        <TouchableOpacity 
            style={styles.buttonWrapper}
            onPress={optionPress}
        >
            <LinearGradient 
                colors={['#A7A7A7', '#707070']}
                style={styles.gradientWrapper}
            >
                <Text style={styles.optionText}>{optionText}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}


const TriviaQuestionScreen = ({ navigation }) => {

    const { 
        state: { quizzes, answeredQuiz }, 
        getTriviaQuiz, 
        saveAnsweredQuiz,
        setCurrentTriviaSession, 
    } = useContext(TriviaContext);

    const { state: { riderExist, rider }, createTriviaSession } = useContext(RiderContext);
    
    const [ questionObj, setQuestionObj ] = useState({
        question: '',
        options: [],
        quizImgUri: '',
        answer: '',
        points: 2
    });
    const [ triviaCounter, setTriviaCounter ] = useState(60);
    const [ triviaSession, setTriviaSession ] = useState({
        totalPoints: 0,
        questions: 0,
        answeredCorrectly: 0
    });
    


    useEffect(() => {

        getTriviaQuiz();

    }, []);

    useEffect(() => {

        if(triviaCounter === '00') {

            setCurrentTriviaSession(triviaSession);
            if(riderExist) {
                const { _id } = rider;
                const { totalPoints, questions, answeredCorrectly } = triviaSession;
                createTriviaSession({ userId: _id, totalPoints, questions, answeredCorrectly });
                navigation.navigate('TriviaResult');
            } else {
                navigation.navigate('RiderInfo', { triviaSession });
            }
            // console.log('works');
        } else {

            let newCounter = triviaCounter - 1;

            if(newCounter < 10) {
                newCounter = `0${newCounter}`;
            }

            setTimeout(() => {
                setTriviaCounter(newCounter);
            }, 1000);
        }

    }, [triviaCounter]);

    const shuffleQuizOptions = (optionsArr) => {
        const shuffledArray = [];
        const pickedOptsIdx = [];
        let randomIdx;

        for (let i = 0; i < optionsArr.length; i++) {
            do {
                randomIdx = Math.floor(Math.random() * optionsArr.length);
            } while(pickedOptsIdx.includes(randomIdx))
    
            let selectedOpt = optionsArr[randomIdx];
            pickedOptsIdx.push(randomIdx);
            shuffledArray.push(selectedOpt);
        }

        return shuffledArray;
    }

    const setQuestion = () => {
        let answeredQuestionIdx = answeredQuiz

        if(answeredQuiz.length === quizzes.length) {
            answeredQuestionIdx = []
        }

        let randomIdx = Math.floor(Math.random() * quizzes.length);

        while(answeredQuestionIdx.includes(randomIdx)){
            randomIdx = Math.floor(Math.random() * quizzes.length);
        }

        answeredQuestionIdx.push(randomIdx);
        saveAnsweredQuiz(answeredQuestionIdx);
        
        const { question, quizImgUri, options, answer, points } = quizzes[randomIdx];
        console.log(options);
        const shuffledOptions = shuffleQuizOptions(options);

        setQuestionObj({
            question,
            options: shuffledOptions,
            answer,
            quizImgUri,
            points
        });
    }

    useEffect(() => {

        if(quizzes.length > 0) {
            setQuestion();
        }

    }, [quizzes]);

    const goToNextQuestion = (optionVal) => {
        console.log(optionVal);
        if(optionVal === questionObj.answer) {
            setTriviaSession({
                totalPoints: triviaSession.totalPoints + questionObj.points,
                questions: triviaSession.questions + 1,
                answeredCorrectly: triviaSession.answeredCorrectly + 1
            });
        } else {
            setTriviaSession({
                ...triviaSession,
                questions: triviaSession.questions + 1,
            });
        }

        setQuestion();
    }


    if(questionObj.question.length === 0) {
        return (
            <View style={{ backgroundColor: '#262525', flex: 1 }}>

            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content"
                translucent={true}
                backgroundColor="rgba(0, 0, 0, 0.2)"
            />
            <View style={styles.header}>
                <Text style={styles.headerTimer}>{triviaCounter}</Text>
                <Text style={styles.headerTitle}>TRIVIA</Text>
            </View>
            <View style={styles.questionContainer}>
                <View style={styles.imgContainer}>
                    <Image
                        source={{ uri: questionObj.quizImgUri }}
                        style={styles.quizStyle}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.quizAndOptions}>
                    <Text style={styles.triviaQuestion}>{questionObj.question}</Text>
                    <View style={styles.optionSet1}>
                        { questionObj.options.slice(0, 2).map(option => {
                            return <OptionBox 
                                key={option} 
                                optionText={option} 
                                optionPress={() => goToNextQuestion(option)} 
                            />
                        })}
                    </View>
                    <View style={styles.optionSet2}>
                        { questionObj.options.slice(2).map(option => {
                            return <OptionBox 
                                key={option} 
                                optionText={option} 
                                optionPress={() => goToNextQuestion(option)} 
                            />
                        })}
                    </View>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262525',
        paddingHorizontal: 40
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30
    },
    headerTimer: {
        color: '#fff',
        fontSize: 24,
        backgroundColor: '#FE0000',
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 7
    },
    headerTitle: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold'
    },
    questionContainer: {
        backgroundColor: '#1D1B1B',
        width: '100%',
        marginTop: 15,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    quizStyle: {
        width: 200, 
        height: 250,
        borderRadius: 10,
    },
    quizAndOptions: {
        marginLeft: 25,
        flex: 5
    },
    triviaQuestion: {
        color: '#fff',
        fontSize: 22
    },
    imgContainer: {
        flex: 2
    },
    optionSet1: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },  
    optionSet2: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonWrapper: {
        width: '48%',
    },
    gradientWrapper: {
        padding: 15,
        borderRadius: 7
    },
    optionText: {
        fontSize: 17,
        textAlign: 'center'
    }
});


export default TriviaQuestionScreen;