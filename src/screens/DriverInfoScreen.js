import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Image, ImageBackground, Text, StatusBar, Dimensions } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import useAnimation from '../hooks/useAnimation';
import weatherIconDictionary from '../utils/weatherIconDictionary';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


const DriverInfoScreen = ({ navigation }) => {

    const [ driverFirstName, setDriverFirstName ] = useState('');
    const [ driverImage, setDriverImage ] = useState('');
    const [ city, setCity] = useState('');
    const [ area, setArea ] = useState('');
    const [ date, setDate ] = useState('');
    const [ weatherData, setWeatherData ] = useState(null);
    const [ driverInfoLayout, setDriverInfoLayout ] = useState({ width: 0, height: 0 });
    const [ driverIntroTextLayout, setDriverIntroTextLayout] = useState({ width: 0, height: 0 });
    const [ driverImgLayout, setDriverImgLayout ] = useState(null);
    const [ driverFavLayout, setDriverFavLayout ] = useState({ width: 0, height: 0 });
    const [ infoTextWidth, setInfoTextWidth ] = useState(0);

    const driverInfo = [
        { infoKey: 'Favorite Meal', infoValue: 'Jollof Rice' },
        { infoKey: 'Favorite Hobby', infoValue: 'Singing, Clubbing' },
        { infoKey: 'Ask Me About', infoValue: 'Manchester United' },
        { infoKey: 'Vacation Spot', infoValue: 'Paris, France' }
    ]


    const [
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
        weatherViewTranslateY
    ] = useAnimation(driverInfoLayout, driverIntroTextLayout, driverImgLayout, 
        driverFavLayout, infoTextWidth, DEVICE_WIDTH, DEVICE_HEIGHT);


    useEffect(() => {

        const { user, location, dateString, weatherData } = navigation.state.params;
        const { name, profilePhoto } = user;
        const { region, street } = location;
        const firstName = name.split(' ')[0];
        setDriverFirstName(firstName);
        setDriverImage(profilePhoto);
        setCity(region);
        setArea(street);
        setDate(dateString);
        setWeatherData(weatherData);

    }, [])


    useEffect(() => {

        if(driverImage && driverFirstName) {
            setTimeout(() => {
                navigation.navigate('AdPlayer', {driverInfo: { image: driverImage, name: driverFirstName }});
            }, 12000)
        }

    }, [driverImage, driverFirstName]);


    if(!driverImage) {
        return (
            <ImageBackground
            source={require('../../assets/welcome-background.png')}
            style={styles.backgroundStyle}
            >
            </ImageBackground>
        )
    }

    return (
        <ImageBackground
            source={require('../../assets/welcome-background.png')}
            style={styles.backgroundStyle}
        >
            <StatusBar 
                backgroundColor="rgba(0, 0, 0, 0.1)"
                barStyle='light-content'
                translucent={true}
            />
            <Animated.View 
                onLayout = { (e) => {
                    const layoutWidth = e.nativeEvent.layout.width;
                    const layoutHeight = e.nativeEvent.layout.height;
                    setDriverInfoLayout({ width: layoutWidth, height: layoutHeight });
                }}
                style={[styles.innerContainer, {
                    transform: [
                        { translateX },
                        { translateY }
                    ]
                }]}
            >
                <Animated.View
                    style={[styles.introText, {
                        position: introTextPosition === 1 ? "absolute" : "relative",
                        top: introTextTop,
                        left: introTextLeft,
                    }]}
                    onLayout={ e => {
                        const layoutHeight = e.nativeEvent.layout.height;
                        const layoutWidth = e.nativeEvent.layout.width;
                        setDriverIntroTextLayout({ width: layoutWidth, height: layoutHeight });
                    }}
                >
                    <Animated.Text style={[styles.minorText, {
                        transform: [
                            {scale: introTextScale}
                        ]
                    }]}>
                        You are riding with
                    </Animated.Text>
                    <Animated.Text style={[styles.majorText, {
                        transform: [
                            {scale: introTextScale}
                        ]
                    }]}>
                        {driverFirstName}
                    </Animated.Text>
                </Animated.View>
                <Animated.Image 
                    onLayout = { e => {
                        const layoutWidth = e.nativeEvent.layout.width;
                        setDriverImgLayout(layoutWidth);
                    }}
                    source={{ uri: driverImage }}
                    style={[styles.driverImage, {
                        position: driverImagePosition === 1 ? 'absolute' : 'relative',
                        top: driverImageTop,
                        left: driverImageLeft,
                        transform: [
                            { scale: driverImageScale }
                        ]
                    }]}
                />
            </Animated.View>
            <Animated.Image 
                source={require('../../assets/logoAlt.png')}
                style={[styles.logoStyle, {
                    left: translateLogo,
                    opacity: logoOpacity
                }]}
                resizeMode="contain"
            />
            <Animated.View
                style={[styles.aboutDriver, {
                    right,
                    opacity
                }]}
            >
                <Animated.View 
                    style={[styles.driverFavourites, {
                        transform: [
                            { translateX: driverFavouritesX },
                            { translateY: driverFavouritesY },
                            { scale: driverFavouritesScale }
                        ]
                    }]}
                    onLayout={e => {
                        const layoutWidth = e.nativeEvent.layout.width;
                        const layoutHeight = e.nativeEvent.layout.height;
                        setDriverFavLayout({ width: layoutWidth, height: layoutHeight });
                    }}
                >
                    <Animated.Text style={[styles.aboutHeader, {
                        opacity
                    }]}>
                        About Me
                    </Animated.Text>
                    <View style={styles.aboutBody}>
                        {
                            driverInfo.map((info) => {
                                return (
                                    <Animated.View style={[styles.aboutInfo, {
                                        opacity
                                    }]} 
                                        key={info.infoKey}
                                    >
                                        <View style={styles.iconWrapper}>
                                            <FontAwesome5 name="fire-alt" size={24} color="#fff" />
                                        </View>
                                        <Animated.View 
                                            onLayout={e => {
                                                const layoutWidth = e.nativeEvent.layout.width;
                                                setInfoTextWidth(layoutWidth);
                                            }}
                                            style={[styles.infoText, {
                                                
                                            }]}
                                        >
                                            <Text style={styles.infoKey}>
                                                {info.infoKey}
                                            </Text>
                                            <Text style={styles.infoValue}>
                                                {info.infoValue}
                                            </Text>
                                        </Animated.View>
                                    </Animated.View>
                                )
                            })
                        }
                    </View>
                </Animated.View>
                <Animated.View style={[styles.weatherView, {
                    opacity: weatherViewOpacity,
                    transform: [
                        {translateY: weatherViewTranslateY}
                    ]
                }]}>
                    <Text style={styles.city}>{city},</Text>
                    <Text style={styles.area}>{area}</Text>
                    <Text style={styles.dateTime}>{date}</Text>
                    <View style={styles.weatherDisplay}>
                        { weatherIconDictionary[weatherData.icon].iconFamily === 'FontAwesome5' ?
                            <FontAwesome5 name={weatherIconDictionary[weatherData.icon].icon} 
                                size={48} color="white" 
                            /> :
                            <Ionicons name={weatherIconDictionary[weatherData.icon].icon} 
                                size={48} color="white" 
                            />
                        }
                        <Text style={styles.temperature}>{weatherData.temp}°</Text>
                    </View>
                    <View style={styles.weatherUpdate}>
                        <View style={styles.weatherBox}>
                            <Text style={styles.title}>HIGH/LOW</Text>
                            <Text style={styles.value}>{weatherData.tempMax}°/{weatherData.tempMin}°</Text>
                        </View>
                        <View style={styles.weatherBox}>
                            <Text style={styles.title}>WIND</Text>
                            <Text style={styles.value}>{weatherData.windSpeed} MPH</Text>
                        </View>
                    </View>
                    <View style={styles.weatherUpdate}>
                        <View style={styles.weatherBox}>
                            <Text style={styles.title}>RAIN CHANCE</Text>
                            <Text style={styles.value}>72%</Text>
                        </View>
                        <View style={styles.weatherBox}>
                            <Text style={styles.title}>HUMIDITY</Text>
                            <Text style={styles.value}>{weatherData.humidity}%</Text>
                        </View>
                    </View>
                </Animated.View>
            </Animated.View>
        </ImageBackground>
    )
}


DriverInfoScreen.navigationOptions = {
    headerShown: false
}


const styles = StyleSheet.create({
    backgroundStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerContainer: {
        marginBottom: 20,
    },  
    minorText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center'
    },
    majorText: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    driverImage: {
        width: 160,
        height: 160,
        borderRadius: 90,
        marginTop: 20,
    },
    logoStyle: {
        width: 160, 
        height: 45,
        position: 'absolute',
        bottom: 40,
    },
    aboutDriver: {
        height: '100%',
        width: '50%',
        backgroundColor: '#F1040E',
        position:'absolute',
        top: 0,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    aboutHeader: {
        fontSize: 28,
        color: '#fff',
        fontWeight: 'bold'
    },
    aboutBody: {
        marginTop: 1
    },  
    aboutInfo: {
        flexDirection: 'row',
        paddingVertical: 7,
        alignItems: 'center'
    },
    iconWrapper: {
        width: 45,
        height: 45,
        backgroundColor: "#222222",
        borderRadius: 22.5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.9,
        shadowOffset: { width: 2, height: 4 },
        shadowRadius: 5,
        elevation: 13
    },
    infoText: {
        marginLeft: 20,
        borderColor: 'rgba(255,255,255,0.5)',
        borderBottomWidth: 1,
        flex: 1,
        paddingBottom: 7
    },
    infoKey: {
        color: '#fff',
        fontSize: 17
    },
    infoValue: {
        color: '#fff',
        fontSize: 21,
        fontWeight: 'bold',
        marginLeft: 14
    },
    weatherView: {
        paddingLeft: 22,
        position: 'absolute'
    },
    city: {
        color: '#fff',
        fontSize: 20
    },
    area: {
        color: '#fff',
        fontSize: 28,
        fontWeight: 'bold'
    },
    dateTime: {
        color: '#fff',
        fontSize: 16,
        marginTop: 8
    },
    weatherDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 20
    },
    temperature: {
        fontSize: 36,
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 15
    },
    weatherBox: {
        height: 80,
        width: 140,
        backgroundColor: '#272727',
        borderRadius: 5,
        // alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        paddingHorizontal: 20
    },
    weatherUpdate: {
        flexDirection: 'row',
        marginBottom: 15
    },
    title: {
        color: '#fff',
        fontSize: 10,
    },
    value: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold'
    }
});


export default DriverInfoScreen;