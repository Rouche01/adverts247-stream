import { useContext, useEffect, useState } from 'react';
import { Context as StreamingContext } from '../context/StreamingContext';
import { Context as DriverContext } from '../context/DriverContext';
import adverts247Api from '../api/adverts247Api';

export default () => {

    const { state: { streamingStatus, error }, getStreamingStatus } = useContext(StreamingContext);
    const { state: { user } } = useContext(DriverContext);

    const [ streamStatus, setStreamStatus ] = useState('');

    const source = adverts247Api.CancelToken.source();

    const checkForStreamStatus = async() => {
        // console.log('works');
        await getStreamingStatus(user._id, source.token);
    }

    useEffect(() => {

        checkForStreamStatus();
        // console.log(source.token);

        const interval = setInterval(checkForStreamStatus, 2500);

        return () => {
            source.cancel();
            clearInterval(interval);
        }

    }, []);

    useEffect(() => {

        setStreamStatus(streamingStatus);
        // console.log(streamingStatus);

    }, [streamingStatus])

    return [ streamStatus, error ];
}