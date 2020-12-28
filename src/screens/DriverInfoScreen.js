import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Image, ImageBackground, Text, StatusBar, Dimensions } from 'react-native';
import { FontAwesome5, Ionicons, Fontisto } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import useAnimation from '../hooks/useAnimation';
import weatherIconDictionary from '../utils/weatherIconDictionary';
import useStreamingStatus from '../hooks/useStreamingStatus';
import useClearHistory from '../hooks/useClearHistory';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;


const DriverInfoScreen = ({ navigation }) => {

    const [ driverFirstName, setDriverFirstName ] = useState('');
    const [ driverImage, setDriverImage ] = useState('');
    const [ city, setCity] = useState('');
    const [ area, setArea ] = useState('');
    const [ date, setDate ] = useState('');
    const [ weatherData, setWeatherData ] = useState(null);
    const [ driverExtraInfo, setDriverExtraInfo ] = useState([]);
    const [ driverInfoLayout, setDriverInfoLayout ] = useState({ width: 0, height: 0 });
    const [ driverIntroTextLayout, setDriverIntroTextLayout] = useState({ width: 0, height: 0 });
    const [ driverImgLayout, setDriverImgLayout ] = useState(null);
    const [ driverFavLayout, setDriverFavLayout ] = useState({ width: 0, height: 0 });
    const [ lastSeqeunceTxtLayout, setLastSequenceTxtLayout ] = useState({ width: 0, height: 0 });
    const [ infoTextWidth, setInfoTextWidth ] = useState(0);


    const [ streamStatus ] = useStreamingStatus();
    const [ clearHistory ] = useClearHistory();

    useEffect(() => {

        if(streamStatus === "off") {
            // console.log(streamStatus);
            clearHistory();
            navigation.navigate('NoActivity');
        }

    }, [streamStatus]);

    const [
        translateX, 
        translateY,
        right,
        translateLogo, 
        logoOpacity, 
        opacity, 
        introTextScale, 
        introTextOpacity, 
        lastSequenceTxtOpacity, 
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
        const { name, profilePhoto, extraInfo } = user;
        
        const extraArr = [];
        for(const key in extraInfo) {
            let infoUnit
            if(key !== "_id") {

                let infoKeyWordArr = key.split(/(?=[A-Z])/);
                infoKeyWordArr = infoKeyWordArr.map(word => {
                    return word[0].toUpperCase() + word.substr(1, word.length - 1)
                });
                let infoKey = infoKeyWordArr.join(' ');

                infoUnit = { 
                    infoKey,
                    infoValue: extraInfo[key]
                }
                extraArr.push(infoUnit);
            }
        }
        // console.log(extraArr);

        const { region, street } = location;
        const firstName = name.split(' ')[0];

        setDriverExtraInfo(extraArr);
        setDriverFirstName(firstName);
        setDriverImage(profilePhoto);
        setCity(region);
        setArea(street);
        setDate(dateString);
        setWeatherData(weatherData);

    }, [])

    const navigationTimer = useRef(null);

    useEffect(() => {

        if(driverImage && driverFirstName && driverExtraInfo.length > 0) {

            navigationTimer.current = setTimeout(() => {
                navigation.navigate('AdPlayer');
            }, 12000)
        }

    }, [driverImage, driverFirstName, driverExtraInfo]);

    useEffect(() => {

        return () => {
            clearTimeout(navigationTimer.current);
        }
        
    }, []);


    const resolveWeatherIcon = () => {
        if(weatherIconDictionary[weatherData.icon].iconFamily === 'FontAwesome5') {
            return (
                <FontAwesome5 name={weatherIconDictionary[weatherData.icon].icon} size={hp('14%')} color="white" /> 
            );
        } else if (weatherIconDictionary[weatherData.icon].iconFamily === 'Ionicons') {
            return (
                <Ionicons name={weatherIconDictionary[weatherData.icon].icon} size={hp('14%')} color="white" />
            );
        } else if(weatherIconDictionary[weatherData.icon].iconFamily === 'Fontisto') {
            return (
                <Fontisto name={weatherIconDictionary[weatherData.icon].icon} size={hp('14%')} color="white" />
            )
        }
    }


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
                        opacity: introTextOpacity,
                        position: driverImagePosition === 1 ? 'absolute' : 'relative',
                        top: driverImageTop,
                        left: driverImageLeft,
                    }]}
                    onLayout={ e => {
                        const layoutHeight = e.nativeEvent.layout.height;
                        const layoutWidth = e.nativeEvent.layout.width;
                        setDriverIntroTextLayout({ width: layoutWidth, height: layoutHeight });
                    }}
                >
                    <Animated.Text style={[styles.minorText]}>
                        You are riding with
                    </Animated.Text>
                    <Animated.Text style={[styles.majorText]}>
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
                            driverExtraInfo.map((info) => {
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
                        {resolveWeatherIcon()}
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
            <Animated.View
                style={[{
                    position: 'absolute',
                    top: hp('19%') - lastSeqeunceTxtLayout.height / 2,
                    left: wp('18%')
                }, {
                    opacity: lastSequenceTxtOpacity
                }]}
                onLayout={e => {
                    const layoutWidth = e.nativeEvent.layout.width;
                    const layoutHeight = e.nativeEvent.layout.height;
                    setLastSequenceTxtLayout({ width: layoutWidth, height: layoutHeight });
                }}
            >
                <Text style={styles.lastSequenceTxt}>You are riding with</Text>
                <Text style={styles.lastSequenceDriverName}>{driverFirstName}</Text>
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
        marginBottom: hp('4%'),
    },  
    minorText: {
        fontSize: hp('4%'),
        color: '#fff',
        textAlign: 'center'
    },
    majorText: {
        fontSize: hp('7%'),
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    driverImage: {
        width: wp('18%'),
        height: wp('18%'),
        borderRadius: wp('9%'),
        marginTop: hp('2.8%'),
    },
    lastSequenceDriverName: {
        color: '#fff',
        fontSize: hp('5%')
    },
    lastSequenceTxt: {
        color: '#fff',
        fontSize: hp('3%')
    },
    logoStyle: {
        width: wp('18%'), 
        height: hp('9%'),
        position: 'absolute',
        bottom: hp('10%'),
    },
    aboutDriver: {
        height: '100%',
        width: '50%',
        backgroundColor: '#F1040E',
        position:'absolute',
        top: 0,
        paddingHorizontal: wp('2.2%'),
        paddingVertical: wp('2%')
    },
    aboutHeader: {
        fontSize: hp('7%'),
        color: '#fff',
        fontWeight: 'bold'
    },
    aboutBody: {
        marginTop: hp('2.3%')
    },  
    aboutInfo: {
        flexDirection: 'row',
        paddingVertical: hp('1.7%'),
        alignItems: 'center'
    },
    iconWrapper: {
        width: hp('12%'),
        height: hp('12%'),
        backgroundColor: "#222222",
        borderRadius: hp('6%'),
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
        marginLeft: wp('2.2%'),
        borderColor: 'rgba(255,255,255,0.5)',
        borderBottomWidth: 1,
        flex: 1,
        paddingBottom: hp('1.8%')
    },
    infoKey: {
        color: '#fff',
        fontSize: hp('4.2%')
    },
    infoValue: {
        color: '#fff',
        fontSize: hp('5.2%'),
        fontWeight: 'bold',
        marginLeft: wp('2.4%')
    },
    weatherView: {
        paddingLeft: 22,
        position: 'absolute'
    },
    city: {
        color: '#fff',
        fontSize: hp('5%')
    },
    area: {
        color: '#fff',
        fontSize: hp('7%'),
        fontWeight: 'bold'
    },
    dateTime: {
        color: '#fff',
        fontSize: hp('3.9%'),
        marginTop: hp('0.5%')
    },
    weatherDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: hp('2.6%'),
        marginBottom: hp('3.5%')
    },
    temperature: {
        fontSize: hp('9%'),
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: wp('2%')
    },
    weatherBox: {
        height: hp('20%'),
        width: wp('18%'),
        backgroundColor: '#272727',
        borderRadius: 5,
        // alignItems: 'center',
        justifyContent: 'center',
        marginRight: wp('2%'),
        paddingHorizontal: wp('2%')
    },
    weatherUpdate: {
        flexDirection: 'row',
        marginBottom: hp('3.2%')
    },
    title: {
        color: '#fff',
        fontSize: hp('2.4%'),
    },
    value: {
        color: '#fff',
        fontSize: hp('5.6%'),
        fontWeight: 'bold'
    }
});


export default DriverInfoScreen;