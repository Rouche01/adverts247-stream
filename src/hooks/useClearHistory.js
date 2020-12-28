import { useContext } from 'react';
import { Context as RiderContext } from '../context/riderContext';
import { Context as TriviaContext } from '../context/triviaContext';
import { Context as VodContentContext } from '../context/vodContentContext';


export default () => {

    const { clearRider } = useContext(RiderContext);
    const { clearQuizHistory } = useContext(TriviaContext);
    const { clearPlaylistHistory } = useContext(VodContentContext);

    const clearHistory = () => {
        // console.log('clear works');
        clearRider();
        clearQuizHistory();
        clearPlaylistHistory();
    }

    return [ clearHistory ]
}