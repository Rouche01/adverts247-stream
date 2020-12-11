import createDataContext from './createDataContext';
import adverts247Api from '../api/adverts247Api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const vodReducer = (state, action) => {
    switch(action.type) {
        case 'get_entertain_contents':
            return { ...state, entertainContent: action.payload }
        case 'set_error':
            return { ...state, error: action.payload }
        default:
            return state;
    }
}


const getEntertainContent = (dispatch) => async() => {
    
    try {
        const token = await AsyncStorage.getItem('token')
        const response = await adverts247Api.get('/mediaBucket/prefix/vod-247bucket', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({
            type: 'get_entertain_contents',
            payload: response.data
        })
    } catch(err) {
        dispatch({
            type: 'set_error',
            payload: err
        })
    }
}



export const { Context, Provider } = createDataContext(
    vodReducer,
    { getEntertainContent },
    { entertainContent: [], adContent: [], error: null }
)