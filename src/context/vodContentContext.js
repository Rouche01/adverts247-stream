import createDataContext from './createDataContext';
import adverts247Api from '../api/adverts247Api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const vodReducer = (state, action) => {
    switch(action.type) {
        case 'get_entertain_contents':
            return { ...state, mediaList:{...state.mediaList, videos: action.payload } }
        case 'get_ad_contents':
            return { ...state, mediaList:{...state.mediaList, ads: action.payload } }
        case 'set_error':
            return { ...state, error: action.payload }
        case 'save_played_idx':
            return { ...state, entertainPlayedIdx: action.payload }
        case 'save_played_ads':
            return { ...state, adsPlayedIdx: action.payload }
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


const getAdContent = (dispatch) => async() => {

    try {

        const token = await AsyncStorage.getItem('token');
        const response = await adverts247Api.get('/mediaBucket/prefix/247-adverts-mediabucket', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        dispatch({
            type: 'get_ad_contents',
            payload: response.data
        })

    } catch(err) {

        dispatch({
            type: 'set_error',
            payload: err
        });

    }
}


const savePlayedIdx = (dispatch) => (idxArray) => {

    dispatch({
        type: 'save_played_index',
        payload: idxArray
    })

}

const savePlayedAdsIdx = (dispatch) => (idxArray) => {

    dispatch({
        type: 'save_played_ads',
        payload: idxArray
    })

}



export const { Context, Provider } = createDataContext(
    vodReducer,
    { getEntertainContent, getAdContent, savePlayedIdx, savePlayedAdsIdx },
    { mediaList: { videos: [], ads: [] }, entertainPlayedIdx: [], adsPlayedIdx: [], error: null }
)