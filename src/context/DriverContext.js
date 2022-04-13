import createDataContext from './createDataContext';
import adverts247Api from '../api/adverts247Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { customNavigate } from '../navigationRef';


const driverReducer = (state, action) => {
    switch(action.type) {
        case 'set_loading':
            return { ...state, loading: action.payload };
        case 'signin':
            return { ...state, token: action.payload };
        case 'get_user':
            return { ...state, user: action.payload.user };
        case 'set_errors':
            return { ...state, error: action.payload };
        case 'signout':
            return { ...state, token: null, user: null, error: '' };
        case 'clear_error':
            return { ...state, error: action.payload };
        default:
            return state;
    }
}


const signinDriver = (dispatch) => async(data, callback) => {

    try {
        // console.log(data);
        dispatch({ type: 'set_loading', payload: true });

        const response = await adverts247Api.post('/drivers/signin', data);
        const token = response.data.token;
        await AsyncStorage.setItem('token', token);

        dispatch({
            type: 'signin',
            payload: token
        });

        if(callback) {
            callback();
        }
        dispatch({ type: 'set_loading', payload: false });

    } catch(error) {

        // console.log(error);

        dispatch({ type: 'set_loading', payload: false });

        dispatch({
            type: 'set_errors',
            payload: 'There was error trying to log in'
        })

    }

}


const tryLocalSignin = (dispatch) => async(callback) => {
    
    try {
        const token = await AsyncStorage.getItem('token');
        if(token) {
            dispatch({
                type: 'signin',
                payload: token
            })

            if(callback) {
                callback();
            }
        } else {
            customNavigate('Signin');
        }
    } catch(error) {
        customNavigate('Signin');
    }

}


const getUser = (dispatch) => async() => {

    try {
        const token = await AsyncStorage.getItem('token');
        const response = await adverts247Api.get(
            '/driver',
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        dispatch({
            type: 'get_user',
            payload: response.data
        })
    } catch(error) {
        dispatch({
            type: 'set_errors',
            payload: error.message
        })
    }
}


const signoutDriver = dispatch => async() => {
    const token = await AsyncStorage.getItem('token');
    console.log('works', token)
    await AsyncStorage.removeItem('token');
    dispatch({
        type: 'signout'
    });
    customNavigate('Signin');
}


const clearError = dispatch => async() => {
    dispatch({
        type: 'clear_error',
        payload: null
    });
}


export const { Context, Provider } = createDataContext(
    driverReducer,
    { signinDriver, tryLocalSignin, getUser, signoutDriver, clearError },
    { token: null, loading: false, error: '', user: null }
)