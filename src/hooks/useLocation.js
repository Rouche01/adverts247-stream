import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default useLocation = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [latLongVal, setLatLongVal] = useState(null);

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

            setLatLongVal(latLong);

            const location = await Location.reverseGeocodeAsync(latLong);
            setLocation(location[0]);

        })()
    }, []);


    return [ location, errorMsg, latLongVal ];
}