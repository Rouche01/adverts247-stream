import { useEffect, useState } from 'react';
import weatherApi from '../api/weatherApi';


export default useWeatherData = ({ latitude, longitude }) => {

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        (async() => {
            const response = await weatherApi.get('/weather', {
                params: {
                    lat: latitude,
                    lon: longitude,
                    appid: `c776ce7eea8b6d63b9e40639a6fc1120`
                }
            })
        })();

        setWeatherData(response);
    }, []);

    return [ weatherData ];
}