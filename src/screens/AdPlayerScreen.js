import React, { useContext, useEffect, useState } from 'react';
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
// import LoaderAnimation from '../components/LoaderAnimation';
import Slider from '@react-native-community/slider';
import * as Brightness from 'expo-brightness';
import { Context as VodContentContext } from '../context/vodContentContext';


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


    const { 
        state: { mediaList, error, entertainPlayedIdx, adsPlayedIdx }, 
        getEntertainContent, 
        getAdContent ,
        savePlayedIdx,
        savePlayedAdsIdx
    } = useContext(VodContentContext);


    useEffect(() => {
        
        getEntertainContent();
        getAdContent();
        console.log(user, 20);

        (async() => {
            let deviceBrightness = await Brightness.getBrightnessAsync();
            deviceBrightness = deviceBrightness.toFixed(1)
            setBrightnessValue(+deviceBrightness);
        })();

    }, []);

    useEffect(() => {

        console.log(error)

    }, [error]);

    useEffect(() => {

        (async() => {
            await Brightness.setBrightnessAsync(brightnessValue);
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
        setTimeout(() => {
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
        setTimeout(() => {
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
                videoHeight={SCREEN_HEIGHT - (SCREEN_HEIGHT * 0.15)}
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
                                    size={18} 
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
                                    size={18} 
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
                                size={18} color="#E6E6E6" 
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
        height: SCREEN_HEIGHT * 0.15,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#262525',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30
    }, 
    logoStyle: {
        width: 150, 
        height: 35,
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
        paddingVertical: 3,
        paddingHorizontal: 4,
        borderRadius: 5,
        marginRight: 50
    },
    ctrlWrapper: {
        marginHorizontal: 14,
        flexDirection: 'column',
        alignItems: 'center'
    },
    ctrlIcon: {
        marginBottom: 2
    },
    ctrlLabel: {
        fontSize: 8,
        textAlign: 'center',
        color: '#E6E6E6'
    },
    driverImg: {
        width: 50,
        height: 50,
        borderRadius: 25
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
        width: 150,
        height: 30
    }
});



export default AdPlayerScreen;