import { useEffect, useState } from 'react';
import weatherApi from '../api/weatherApi';


export default useWeatherData = (latLong) => {

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {

        if(latLong) {
            (async() => {

                const { latitude, longitude } = latLong;

                const response = await weatherApi.get('/weather', {
                    params: {
                        lat: latitude,
                        lon: longitude,
                        appid: `c776ce7eea8b6d63b9e40639a6fc1120`,
                        units: 'metric'
                    }
                })

                const filteredData = {
                    humidity: response.data.main.humidity,
                    pressure: Math.round(response.data.main.pressure),
                    temp: (response.data.main.temp).toFixed(1),
                    tempMax: Math.round(response.data.main.temp_max),
                    tempMin: Math.round(response.data.main.temp_min),
                    icon: response.data.weather[0].icon,
                    windSpeed: Math.round(response.data.wind.speed * 2.23694),
    
                }
    
                setWeatherData(filteredData);
            })();
        }

    }, [latLong]);

    return [ weatherData ];
}