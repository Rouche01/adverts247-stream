import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import useWeatherData from './useWeatherData';
import weatherApi from '../api/weatherApi';

export default useLocation = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        ( async() => {

            const { status } = await Location.requestPermissionsAsync();
            if(status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
            }

            const locationGeocode = await Location.getCurrentPositionAsync({});
            const latLong = {
                latitude: locationGeocode.coords.latitude,
                longitude: locationGeocode.coords.longitude
            }

            const location = await Location.reverseGeocodeAsync(latLong);
            setLocation(location[0]);

            const response = await weatherApi.get('/weather', {
                params: {
                    lat: latLong.latitude,
                    lon: latLong.longitude,
                    appid: `c776ce7eea8b6d63b9e40639a6fc1120`
                }
            })
            setWeatherData(response.data);

        })()
    }, []);


    return [ location, errorMsg, weatherData ];
}