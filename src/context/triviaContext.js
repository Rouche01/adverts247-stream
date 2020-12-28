import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import adverts247Api from '../api/adverts247Api';


const triviaReducer = (state, action) => {
    switch(action.type) {
        case 'get_quizzes':
            return { ...state, quizzes: action.payload }
        case 'save_answered_idx':
            return { ...state, answeredQuiz: action.payload }
        case 'set_current_session':
            return { ...state, currentTriviaSession: action.payload }
        case 'clear_history':
            return { ...state, answeredQuiz: [], currentTriviaSession: null }
        case 'set_error':
            return { ...state, error: action.payload }
        default:
            return state;
    }
}


const getTriviaQuiz = (dispatch) => async() => {

    const token = await AsyncStorage.getItem('token');
    try {
        const response = await adverts247Api.get('/quizzes', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch({
            type: 'get_quizzes',
            payload: response.data.quizzes
        });
    } catch(err) {
        dispatch({
            type: 'set_error',
            payload: err
        });
    }
}


const setCurrentTriviaSession = (dispatch) => (sessionData) => {
    dispatch({
        type: 'set_current_session',
        payload: sessionData
    });
}


const saveAnsweredQuiz = (dispatch) => (answeredArr) => {

    dispatch({
        type: 'save_answered_idx',
        payload: answeredArr
    });

}


const clearQuizHistory = dispatch => () => {

    // console.log('clear works', 2);
    dispatch({
        type: 'clear_history'
    });
}



export const { Context, Provider } = createDataContext(
    triviaReducer,
    { getTriviaQuiz, saveAnsweredQuiz, setCurrentTriviaSession, clearQuizHistory },
    { quizzes: [], answeredQuiz: [], error: null, currentTriviaSession: null }
);