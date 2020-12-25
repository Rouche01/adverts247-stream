import { useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { Context as DriverContext } from '../context/DriverContext';
import { customNavigate } from '../navigationRef';


export default () => {

    const { state: { user, error }, getUser, signoutDriver  } = useContext(DriverContext);

    useEffect(() => {
        if(user) {
            console.log(user);
            if(user.deviceStatus === "off") {
                customNavigate('NoActivity');
            } else if(user.deviceStatus === "on") {
                customNavigate('Welcome');
            }
            
        }
    }, [user]);


    useEffect(() => {
        console.log(error);
        if(error) {
            Alert.alert('Signin Error', 'This user does not exist anymore, signout and signin again', [
                {
                    text: 'Sign Out',
                    onPress: () => {
                        signoutDriver();
                    }
                }
            ])
        }
    }, [error]);


    const signinAndNavigate = (signinFunc, data) => {
        if(!data) {
            signinFunc(getUser);
        } else {
            signinFunc(data, getUser);
        }
    }


    return [ signinAndNavigate ];
}