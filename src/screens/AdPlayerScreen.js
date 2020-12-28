import React, { useContext, useEffect, useRef, useState } from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    Dimensions, 
    StatusBar, 
    Image, 
    TouchableOpacity 
} from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Context as DriverContext } from '../context/DriverContext';
import Slider from '@react-native-community/slider';
import * as Brightness from 'expo-brightness';
import { Context as VodContentContext } from '../context/vodContentContext';
import useStreamingStatus from '../hooks/useStreamingStatus';
import useClearHistory from '../hooks/useClearHistory';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const AdPlayerScreen = ({ navigation }) => {

    const [ driverInfo, setDriverInfo ] = useState('');
    const [ mute, setMute ] = useState(false);
    const [ showVolSlider, setShowVolSlider ] = useState(false);
    const [ showBrightnessSlider, setShowBrightnessSlider ] = useState(false);
    const [ volumeValue, setVolumeValue ] = useState(1);
    const [ brightnessValue, setBrightnessValue ] = useState(0);
    const { state: { user } } = useContext(DriverContext);


    const [ streamStatus ] = useStreamingStatus();
    const [ clearHistory ] = useClearHistory();

    useEffect(() => {

        if(streamStatus === "off") {
            // console.log(streamStatus);
            clearHistory();
            navigation.navigate('NoActivity');
        }

    }, [streamStatus]);


    const { 
        state: { mediaList, error, entertainPlayedIdx, adsPlayedIdx }, 
        getEntertainContent, 
        getAdContent ,
        savePlayedIdx,
        savePlayedAdsIdx
    } = useContext(VodContentContext);


    const didCancel = useRef(null);
    const volumeTimer = useRef(null);
    const brightnessTimer = useRef(null);

    didCancel.current = false;


    useEffect(() => {
        
        getEntertainContent();
        getAdContent();
        // console.log(user, 20);

        (async() => {
            let deviceBrightness = await Brightness.getBrightnessAsync();
            if(!didCancel.current) {
                deviceBrightness = deviceBrightness.toFixed(1)
                setBrightnessValue(+deviceBrightness);
            }
        })();

        return () => {
            didCancel.current = true;
            clearTimeout(volumeTimer.current);
            clearTimeout(brightnessTimer.current);
        }

    }, []);

    useEffect(() => {

        // console.log(error)

    }, [error]);

    useEffect(() => {

        (async() => {
            if(!didCancel.current) {
                await Brightness.setBrightnessAsync(brightnessValue);
            }
        })();

    }, [brightnessValue])

    useEffect(() => {

        if(user) {
            setDriverInfo(user.profilePhoto);
        }

    }, [user]);


    const onMutePressed = () => {
        setMute(!mute);
    }

    const showVolumeSlider = () => {

        if(showBrightnessSlider) {
            setShowBrightnessSlider(false);
        }

        setShowVolSlider(!showVolSlider);

        // setTimeout(() => {
        //     setShowVolSlider(false);
        // }, 4000 );
    }

    const onSliderRelease = (val) => {
        setVolumeValue(val);
        volumeTimer.current = setTimeout(() => {
            setShowVolSlider(false);
        }, 1000)
    }

    const toggleBrightnessSlider = () => {

        if(showVolSlider) {
            setShowVolSlider(false);
        }

        setShowBrightnessSlider(!showBrightnessSlider);

    }

    const onBrightnessSliderRelease = (val) => {
        
        setBrightnessValue(val);
        brightnessTimer.current = setTimeout(() => {
            setShowBrightnessSlider(false);
        }, 1000);

    }

    if(!driverInfo && mediaList.videos.length === 0 && mediaList.ads.length === 0) {
        return (
            <View 
                style={styles.nullBg}
            >
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <StatusBar 
                backgroundColor="rgba(0, 0, 0, 0.1)"
                barStyle='light-content'
                translucent={true}
            />
            <VideoPlayer 
                videoWidth={SCREEN_WIDTH}
                videoHeight={SCREEN_HEIGHT - (SCREEN_HEIGHT * 0.13)}
                muteState={mute}
                volumeState={volumeValue}
                mediaBucket={mediaList}
                entertainPlayedIdx={entertainPlayedIdx}
                adsPlayedIdx={adsPlayedIdx}
                savePlayedIdx={savePlayedIdx}
                savePlayedAdsIdx={savePlayedAdsIdx}
                navigation={navigation}
            />
            <View style={styles.settingsBar}>
                <Image source={require('../../assets/logoAlt.png')} resizeMode="contain" 
                    style={styles.logoStyle} 
                />
                <View style={styles.leftCol}>
                    <View style={styles.videoControls}>
                        <View style={styles.brightnessGroup}>
                            { showBrightnessSlider ? <Slider 
                                style={styles.sliderStyle}
                                minimumValue={0}
                                maximumValue={1}
                                thumbTintColor='#F1040E'
                                minimumTrackTintColor="#F1040E"
                                maximumTrackTintColor="rgba(255,255,255,0.5)"
                                step={0.1}
                                value={brightnessValue}
                                onSlidingComplete={(val) => { onBrightnessSliderRelease(val) }}
                            /> : null }
                            <TouchableOpacity
                                onPress={toggleBrightnessSlider} 
                                style={styles.ctrlWrapper}
                            >
                                <MaterialIcons style={styles.ctrlIcon} 
                                    name="brightness-6" 
                                    size={hp('3.5%')} 
                                    color="#E6E6E6" 
                                />
                                <Text style={styles.ctrlLabel}>Brightness</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.volumeGroup}>
                            { showVolSlider ? <Slider 
                                style={styles.sliderStyle}
                                minimumValue={0}
                                maximumValue={1}
                                thumbTintColor='#F1040E'
                                minimumTrackTintColor="#F1040E"
                                maximumTrackTintColor="rgba(255,255,255,0.5)"
                                step={0.1}
                                value={volumeValue}
                                onSlidingComplete={(val) => { onSliderRelease(val) }}
                            /> : null }
                            <TouchableOpacity 
                                style={styles.ctrlWrapper}
                                onPress={showVolumeSlider}
                            >
                                <FontAwesome5 
                                    style={styles.ctrlIcon} 
                                    name="volume-down" 
                                    size={hp('3.5%')} 
                                    color="#E6E6E6" 
                                />
                                <Text style={styles.ctrlLabel}>Volume</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity 
                            style={styles.ctrlWrapper}
                            onPress={() => onMutePressed()}
                        >
                            <FontAwesome5 
                                style={styles.ctrlIcon} 
                                name="volume-mute" 
                                size={hp('3.5%')} color="#E6E6E6" 
                            />
                            <Text style={styles.ctrlLabel}>Mute</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.driverInfo}>
                        <Image 
                            source={ 
                                driverInfo ? { uri: driverInfo } : require('../../assets/avatar-placeholder.png')
                            }
                            style={styles.driverImg}
                        />
                        {/* <Text>{driverInfo.name}</Text> */}
                    </View>
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    nullBg: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#222'
    },  
    container: {
        flex: 1
    },
    settingsBar: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.13,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#262525',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: wp('3.4%')
    }, 
    logoStyle: {
        width: hp('35%'), 
        height: hp('25%'),
        // borderColor: '#fff',
        // borderWidth: 2
    },
    leftCol: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    videoControls: {
        flexDirection: 'row',
        borderColor: "#E3E3E3",
        borderWidth: 2,
        paddingVertical: hp('1%'),
        paddingHorizontal: wp('1%'),
        borderRadius: 5,
        marginRight: wp('7%')
    },
    ctrlWrapper: {
        marginHorizontal: wp('2%'),
        flexDirection: 'column',
        alignItems: 'center'
    },
    ctrlIcon: {
        marginBottom: hp('0.7%')
    },
    ctrlLabel: {
        fontSize: hp('2%'),
        textAlign: 'center',
        color: '#E6E6E6'
    },
    driverImg: {
        width: hp('11%'),
        height: hp('11%'),
        borderRadius: hp('5.5%')
    },
    volumeGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    brightnessGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },  
    sliderStyle: {
        width: wp('15%'),
        height: hp('5%')
    }
});



export default AdPlayerScreen;