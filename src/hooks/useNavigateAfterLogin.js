import { useContext, useEffect } from 'react';
import { Context as DriverContext } from '../context/DriverContext';
import { customNavigate } from '../navigationRef';


export default () => {

    const { state: { user, error }, getUser } = useContext(DriverContext);

    useEffect(() => {
        if(user) {
            // console.log(user);
            if(user.deviceStatus === "off") {
                customNavigate('NoActivity');
            } else if(user.deviceStatus === "on") {
                customNavigate('Welcome');
            }
            
        }
    }, [user]);


    const signinAndNavigate = (signinFunc, data) => {
        if(!data) {
            signinFunc(getUser);
        } else {
            signinFunc(data, getUser);
        }
    }


    return [ signinAndNavigate, error ];
}