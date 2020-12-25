import * as Permissions from 'expo-permissions';
import * as Brightness from 'expo-brightness';

export const getSystemBrightnessPermission = async() => {
    const { status } = await Permissions.askAsync(Permissions.SYSTEM_BRIGHTNESS);

    return status;
};


export const getBrightnessPermission = async() => {
    const { status } = await Brightness.requestPermissionsAsync();
    return status;
}


export const getLocationPermission = async() => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    return status;
}


export const checkSystemBrightnessPermission = async() => {
    const { status } = await Permissions.getAsync(Permissions.SYSTEM_BRIGHTNESS);

    if(status === "granted") {
        return true;
    } else {
        return false;
    }

}


export const checkBrightnessPermission = async() => {
    const { status } = await Brightness.getPermissionsAsync();

    if(status === "granted") {
        return true;
    } else {
        return false;
    }
}

export const checkLocationPermission = async() => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);

    if(status === "granted") {
        return true;
    } else {
        return false;
    }
}