import { NavigationActions } from 'react-navigation';

let navigator;

export const setNavigator = (navigationRef) => {
    navigator = navigationRef;
}


export const customNavigate = (routeName, params) => {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    )
}