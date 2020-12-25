import { useEffect, useState } from 'react';
import weatherApi from '../api/weatherApi';


export default useWeatherData = (latLong) => {

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {

        if(latLong) {
            (async() => {

                const { latitude, longitude } = latLong;
                console.log(latitude, longitude, 2);
                try {
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
                        temp: Math.round(response.data.main.temp),
                        tempMax: Math.round(response.data.main.temp_max),
                        tempMin: Math.round(response.data.main.temp_min),
                        icon: response.data.weather[0].icon,
                        windSpeed: Math.round(response.data.wind.speed * 2.23694),
        
                    }

                    console.log(filteredData);
        
                    setWeatherData(filteredData);
                } catch(err) {
                    console.log(err.response);
                    
                    // this is a placeholder in case an error occurs
                    const filteredData = {
                        humidity: 41,
                        icon: "02d",
                        pressure: 1006,
                        temp: 34,
                        tempMax: 34,
                        tempMin: 34,
                        windSpeed: 11,
                    }

                    setWeatherData(filteredData);
                }
            })();
        }

    }, [latLong]);

    return [ weatherData ];
}