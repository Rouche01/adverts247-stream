import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Image, ImageBackground, Text, StatusBar, Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Context as DriverContext } from '../context/DriverContext';
import Animated, { interpolate } from 'react-native-reanimated';
import { useTimingTransition } from 'react-native-redash/lib/module/v1';

const DEVICE_WIDTH = Dimensions.get('window').width;
const HALF_WIDTH = DEVICE_WIDTH / 2;
const DEVICE_HEIGHT = Dimensions.get('window').height;


const DriverInfoScreen = () => {

    const { state: { user } } = useContext(DriverContext);

    const [ driverFirstName, setDriverFirstName ] = useState('');
    const [ driverImage, setDriverImage ] = useState('');

    const [ moreInfo, setMoreInfo ] = useState(false);

    const transition = useTimingTransition(moreInfo, { duration: 600 });
    // const transition2 = useTimingTransition(moreInfo, { duration: 850 })

    const driverInfo = [
        { infoKey: 'Favorite Meal', infoValue: 'Jollof Rice' },
        { infoKey: 'Favorite Hobby', infoValue: 'Singing, Clubbing' },
        { infoKey: 'Ask Me About', infoValue: 'Manchester United' },
        { infoKey: 'Vacation Spot', infoValue: 'Paris, France' }
    ]

    useEffect(() => {

        setTimeout(() => {
            setMoreInfo(true);
        }, 5000)

    }, []);

    useEffect(() => {

        if(user) {
            const firstName = user.name.split(' ')[0];
            setDriverFirstName(firstName);
            setDriverImage(user.profilePhoto);
        }

    }, [user])

    if(!driverImage) {
        return (
            <ImageBackground
            source={require('../../assets/welcome-background.png')}
            style={styles.backgroundStyle}
            >
            </ImageBackground>
        )
    }

    const translateX = interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [0, ((DEVICE_WIDTH / 4)) * -1]
    });

    const translateY = interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [0, -40]
    });

    const right = interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [HALF_WIDTH * -1, 0]
    })

    const opacity = interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [0, 1]
    })

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
                style={[styles.innerContainer, {
                    transform: [
                        { translateX },
                        { translateY }
                    ]
                }]}
            >
                <Text style={styles.minorText}>You are riding with</Text>
                <Text style={styles.majorText}>{driverFirstName}</Text>
                <Image 
                    source={{ uri: driverImage }}
                    style={styles.driverImage}
                />
            </Animated.View>
            <Image 
                source={require('../../assets/logoAlt.png')}
                style={styles.logoStyle}
                resizeMode="contain"
            />
            <Animated.View
                style={[styles.aboutDriver, {
                    right
                }]}
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
                                    <View style={styles.infoText}>
                                        <Text style={styles.infoKey}>{info.infoKey}</Text>
                                        <Text style={styles.infoValue}>{info.infoValue}</Text>
                                    </View>
                                </Animated.View>
                            )
                        })
                    }
                </View>
            </Animated.View>
        </ImageBackground>
    )
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
        marginTop: 20
    },
    logoStyle: {
        width: 160, 
        height: 45,
        position: 'absolute',
        bottom: 40,
        left: 50
    },
    aboutDriver: {
        height: '100%',
        width: '50%',
        backgroundColor: '#F1040E',
        position:'absolute',
        top: 0,
        right: -1 * HALF_WIDTH,
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
        // borderColor: 'black',
        // borderWidth: 2,
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
        shadowOffset: { width: 24, height: 14 },
        shadowRadius: 5
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
    }
});


export default DriverInfoScreen;