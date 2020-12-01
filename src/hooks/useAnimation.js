import { useEffect, useState } from 'react';
import { interpolate, set } from 'react-native-reanimated';
import { useTimingTransition } from 'react-native-redash/lib/module/v1';

export default useAnimation = (driverInfoLayout, driverIntroTextLayout, driverImgLayout, driverFavLayout, infoTextWidth, deviceWidth, deviceHeight) => {

    const [ translateX, setTranslateX ] = useState(null);
    const [ translateY, setTranslateY ] = useState(null);
    const [ right, setRight ] = useState(null);
    const [ translateLogo, setTranslateLogo ] = useState(null);
    const [ logoOpacity, setLogoOpacity ] = useState(null);
    const [ opacity, setOpacity ] = useState(null);
    const [ introTextScale, setIntroTextScale ] = useState(null);
    const [ introTextPosition, setIntroTextPosition ] = useState(null);
    const [ introTextTop, setIntroTextTop ] = useState(null);
    const [ introTextLeft, setIntroTextLeft ] = useState(null);
    const [ driverImagePosition, setDriverImagePosition ] = useState(null);
    const [ driverImageTop, setDriverImageTop ] = useState(null);
    const [ driverImageLeft, setDriverImageLeft ] = useState(null);
    const [ driverImageScale, setDriverImageScale ] = useState(null);
    const [ driverFavouritesX, setDriverFavouritesX ] = useState(null);
    const [ driverFavouritesY, setDriverFavouritesY ] = useState(null);
    const [ driverFavouritesScale, setDriverFavouritesScale ] = useState(null);
    const [ weatherViewOpacity, setWeatherViewOpacity ] = useState(null);
    const [ weatherViewTranslateY, setWeatherViewTranslateY ] = useState(null);

    const [ animationSequence, setAnimationSequence ] = useState(0);

    const halfDeviceWidth = deviceWidth / 2;
    const halfDeviceHeight = deviceHeight / 2;
    const transition = useTimingTransition(animationSequence, { duration: 600 });

    useEffect(() => {

        // console.log(navigation.state.params.user);
        setTimeout(() => {
            setAnimationSequence(1);
        }, 4500);

        setTimeout(() => {
            setAnimationSequence(2);
        }, 9000);

    }, []);

    useEffect(() => {

        const translateX = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [0, ((deviceWidth / 4)) * -1, 0]
        });
        setTranslateX(translateX);
    
        const translateY = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [0, -40, 0]
        });
        setTranslateY(translateY);
    
        const right = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [halfDeviceWidth * -1, 0, 0]
        });
        setRight(right);
    
        const translateLogo = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [50, (halfDeviceWidth / 2) - 80, -50]
        });
        setTranslateLogo(translateLogo);
    
        const logoOpacity = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [1, 1, 0]
        });
        setLogoOpacity(logoOpacity);
    
        const opacity = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [0, 1, 1]
        });
        setOpacity(opacity);
    
        const introTextScale = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [1, 1, .9]
        });
        setIntroTextScale(introTextScale);
    
        // const introTextPosition = interpolate(transition, {
        //     inputRange: [0, 1, 2],
        //     outputRange: [0, 0, 1]
        // });
        // setIntroTextPosition(introTextPosition);
    
        const introTextTop = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [0, 0, (((driverImgLayout * 0.6) / 2) - ((driverIntroTextLayout.height * 0.9) / 2)) * -1]
        });
        setIntroTextTop(introTextTop);
    
        const introTextLeft = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [0, 0, (halfDeviceWidth - 80 - (driverImgLayout * 0.6 * 1.5)) * -1]
        });
        setIntroTextLeft(introTextLeft);
    
        const driverImagePosition = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [0, 0, 1]
        });
        setDriverImagePosition(driverImagePosition);
    
        const driverImageTop = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [0, 0, (halfDeviceHeight - ((driverImgLayout * 0.6) - (driverImgLayout / 2)) - 30) * -1]
        });
        setDriverImageTop(driverImageTop);
    
        const driverImageLeft = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [0, 0, (halfDeviceWidth - 80) * -1]
        });
        setDriverImageLeft(driverImageLeft);
    
        const driverImageScale = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [1, 1, .6]
        });
        setDriverImageScale(driverImageScale);
    
        const driverFavouritesX = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [0, 0, (halfDeviceWidth + (halfDeviceWidth - (halfDeviceWidth * 0.7)) - 80) * -1]
        });
        setDriverFavouritesX(driverFavouritesX);
    
        const driverFavouritesY = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [0, 0, ((driverImgLayout * 0.6) - 
                (driverFavLayout.height - (driverFavLayout.height * 0.7)) +
                ((driverImgLayout * 0.6) / 2) + 35
            )]
        });
        setDriverFavouritesY(driverFavouritesY);
    
        const driverFavouritesScale = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [1, 1, 0.7]
        });
        setDriverFavouritesScale(driverFavouritesScale);
    
        const driverFavInfoWidth = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [infoTextWidth, infoTextWidth, infoTextWidth]
        });
    
        const weatherViewTranslateY = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [deviceHeight, deviceHeight, 25]
        });
        setWeatherViewTranslateY(weatherViewTranslateY);
    
        const weatherViewOpacity = interpolate(transition, {
            inputRange: [0, 1, 2],
            outputRange: [0, 0, 1]
        });
        setWeatherViewOpacity(weatherViewOpacity);
    
    }, []);

    return [
        translateX, 
        translateY,
        right,
        translateLogo, 
        logoOpacity, 
        opacity, 
        introTextScale, 
        introTextPosition, 
        introTextTop, 
        introTextLeft, 
        driverImagePosition, 
        driverImageTop, 
        driverImageLeft, 
        driverImageScale, 
        driverFavouritesX, 
        driverFavouritesY, 
        driverFavouritesScale, 
        weatherViewOpacity, 
        weatherViewTranslateY, 
    ]
}