import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

export default useLocation = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [latLongVal, setLatLongVal] = useState(null);

    useEffect(() => {

        let didCancel = false;

        ( async() => {

            try {
                const { status } = await Location.requestPermissionsAsync();

                if(!didCancel) {
                    if(status !== 'granted') {
                        setErrorMsg(
                            'For the app to work properly, we will need your permission to location services'
                        );
                        const defaultLatLong = { latitude: 6.4531, longitude: 3.3958 };
                        setLatLongVal(defaultLatLong);
                        const location = await Location.reverseGeocodeAsync(defaultLatLong);

                        if(!didCancel) {
                            setLocation(location[0]);
                        }
                        
                    } else {
    
                        const locationGeocode = await Location.getCurrentPositionAsync({ 
                            accuracy: Location.Accuracy.High
                        });
                        
                        if(!didCancel) {
                            const latLong = {
                                latitude: locationGeocode.coords.latitude,
                                longitude: locationGeocode.coords.longitude
                            }
        
                            setLatLongVal(latLong);
        
                            const location = await Location.reverseGeocodeAsync(latLong);

                            if(!didCancel) {
                                // console.log(location);
                                setLocation(location[0]);
                            }
                            
                        }
    
                    }
                }
                
            } catch(err) {

                if(!didCancel) {
                    // console.log(err, 2);
                    const defaultLatLong = { latitude: 6.4531, longitude: 3.3958 };
                    setLatLongVal(defaultLatLong);
                    const location = await Location.reverseGeocodeAsync(defaultLatLong);
                    setLocation(location[0]);
                }
                
            }

        })()

        return () => {
            // console.log('unmount works');
            didCancel = true;
        }
    }, []);


    return [ location, errorMsg, latLongVal ];
}