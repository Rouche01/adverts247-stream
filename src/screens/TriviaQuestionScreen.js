import React from 'react';
import { StyleSheet, View, Text, StatusBar, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'


const OptionBox = ({ optionText }) => {
    return (
        <LinearGradient
            colors={['#A7A7A7', '#707070']}
            style={styles.gradientWrapper}
        >
            <Text style={styles.optionText}>{optionText}</Text>
        </LinearGradient>
    )
}


const TriviaQuestionScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar 
                barStyle="light-content"
                translucent={true}
                backgroundColor="rgba(0, 0, 0, 0.2)"
            />
            <View style={styles.header}>
                <Text style={styles.headerTimer}>55</Text>
                <Text style={styles.headerTitle}>TRIVIA</Text>
            </View>
            <View style={styles.questionContainer}>
                <View style={styles.imgContainer}>
                    <Image 
                        source={require('../../assets/WizKid.jpg')}
                        style={styles.quizStyle}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.quizAndOptions}>
                    <Text style={styles.triviaQuestion}>Which of these is the title of his song?</Text>
                    <View style={styles.optionSet1}>
                        <OptionBox optionText="Ojuelegba" />
                        <OptionBox optionText="Skeletun" />
                    </View>
                    <View style={styles.optionSet2}>
                        <OptionBox optionText="Ololufe" />
                        <OptionBox optionText="IF" />
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
        flexDirection: 'row'
    },
    quizStyle: {
        width: 180, 
        height: 220,
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
    gradientWrapper: {
        width: '48%',
        padding: 15,
        borderRadius: 7
    },
    optionText: {
        fontSize: 17,
        textAlign: 'center'
    }
});


export default TriviaQuestionScreen;