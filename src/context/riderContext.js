import createDataContext from './createDataContext';
import adverts247Api from '../api/adverts247Api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const riderReducer = (state, action) => {
    switch(action.type) {
        case 'check_rider_status':
            return { ...state, riderExist: action.payload };
        case 'set_rider':
            return { ...state, rider: action.payload };
        case 'set_loading':
            return { ...state, loading: action.payload };
        case 'set_error':
            return { ...state, error: action.payload };
        default:
            return state;
    }
}


const createRider = async(riderData) => {

    const token = await AsyncStorage.getItem('token');
    const response = await adverts247Api.post('/riders', riderData, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return response.data.rider

};


const updateRider = (dispatch) => async(riderData, riderId) => {
    dispatch({ type: 'set_error', payload: null });
    try {
        const token = await AsyncStorage.getItem('token');
        await adverts247Api.patch(`/rider/${riderId}`, riderData, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    } catch(err) {
        dispatch({
            type: 'set_error',
            payload: err.message
        });
    }
};


const checkRider = (dispatch) => async(riderData, session) => {
    dispatch({ type: 'set_loading', payload: true });
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await adverts247Api.get(`/rider/${riderData.email}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if(response.data.existStatus) {

            console.log(response.data, 2);

            const { fullname, phoneNumber } = riderData;
            const { _id } = response.data.rider;
            const { totalPoints, questions, answeredCorrectly } = session;

            await updateRider(dispatch)({fullname, phoneNumber}, _id);
            await createTriviaSession(dispatch)({ userId: _id, totalPoints, questions, answeredCorrectly });
            
            dispatch({ type: 'set_rider', payload: response.data.rider });
            dispatch({ type: 'check_rider_status', payload: true });
            dispatch({ type: 'set_loading', payload: false });

        } else {

            console.log(response.data, 2);
            const { totalPoints, questions, answeredCorrectly } = session;

            const rider = await createRider(riderData);
            console.log(rider);
            await createTriviaSession(dispatch)({ 
                userId: rider._id, 
                totalPoints, 
                questions, 
                answeredCorrectly 
            });

            dispatch({ type: 'set_rider', payload: rider });
            dispatch({ type: 'check_rider_status', payload: true });
            dispatch({ type: 'set_loading', payload: false });
        }
    } catch(err) {
        dispatch({
            type: 'set_error',
            payload: err.message
        });
        dispatch({ type: 'set_loading', payload: false });
    }
};


const createTriviaSession = (dispatch) => async(sessionData) => {
    try {
        const token = await AsyncStorage.getItem('token');
        await adverts247Api.post(
            '/trivia-sessions', 
            sessionData,
            { headers: { "Authorization": `Bearer ${token}` } }
        );
    } catch(err) {
        dispatch({
            type: 'set_error',
            payload: err.message
        })
    }
}



export const { Context, Provider } = createDataContext(
    riderReducer,
    { checkRider, updateRider, createTriviaSession },
    { riderExist: false, error: null, loading: false, rider: null }
)