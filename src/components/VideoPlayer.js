import React, { useEffect, useState } from 'react';
import { Video, Audio } from 'expo-av';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import { withNavigation } from 'react-navigation';


const playlist = [
    {
        title: 'Trailer',
        uri: 'https://vod-247bucket.s3.us-east-2.amazonaws.com/TRAILER/Default/HLS/TRAILER.m3u8',
        isAd: false
    },
    {
        title: 'Trial',
        uri: 'https://vod-247bucket.s3.us-east-2.amazonaws.com/trial/Default/HLS/trial.m3u8',
        isAd: false
    }
]

const VideoPlayer = ({ videoWidth, videoHeight, navigation }) => {


    const [ muted, setMuted ] = useState(false);
    const [ playbackInstance, setPlaybackInstance ] = useState(null);
    const [ index, setIndex ] = useState(0);
    const [ playbackInstancePosition, setPlaybackInstancePosition ] = useState(null);
    const [ playbackInstanceDuration, setPlaybackInstanceDuration ] = useState(null);
    const [ shouldPlay, setShouldPlay ] = useState(false);
    const [ isPlaying, setIsPlaying ] = useState(false);
    const [ isBuffering, setIsBuffering ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ volume, setVolume ] = useState(1.0);
    const [ rate, setRate ] = useState(1.0);

    useEffect(() => {

        (async () => {
            try {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: false,
                    staysActiveInBackground: false,
                    interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: true,
                    interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                    playThroughEarpieceAndroid: false
                });
            } catch(e) {
                console.log(e);
            }
        })();

    }, []);



    const loadNewPlaybackInstance = async(playing) => {
        if(playbackInstance != null) {
            await playbackInstance.unloadAsync();
            playbackInstance = null;
        }

        const source = { uri: playlist[index].uri };
        const initialStatus = {
            shouldPlay: playing,
            rate: rate,
            volume: volume,
            isMuted: muted,
            isLooping: false
        }

        console.log(_onPlaybackStatusUpdate);

        console.log(playbackVideo.loadAsync(source, initialStatus));
        await playbackVideo.loadAsync(source, initialStatus);
        console.log(2)
        playbackInstance = playbackVideo;
        console.log(3);
        const status = await playbackVideo.getStatusAsync();

        updateScreenForLoading(false);
    }

    const _mountVideo = async(component) => {

        const playbackVideo = component;
        if(index < playlist.length) {
            const source = { uri: playlist[index].uri };
            const initialStatus = {
                shouldPlay: true,
                rate: rate,
                volume: volume,
                isMuted: muted,
                isLooping: false
            }
            try {
                await playbackVideo.loadAsync(source, initialStatus);
            } catch(e) {
                console.log(e);
            }
        } else {
            navigation.navigate('DriverInfo');
        }
        console.log(component);
        // loadNewPlaybackInstance(true);
    }

    const updateScreenForLoading = (isLoading) => {
        if(isLoading) {
            setShowVideo(false);
            setIsPlaying(false);
            setPlaybackInstanceDuration(null);
            setPlaybackInstancePosition(null);
            setIsLoading(true);
        } else {
            setShowVideo(true);
            setIsLoading(false);    
        }
    }

    let instanceDuration;

    const _onPlaybackStatusUpdate = status => {
        if(status.isLoaded) {
            instanceDuration = status.positionMillis
            console.log(instanceDuration);
            // setPlaybackInstanceDuration(status.durationMillis);
            // setPlaybackInstancePosition(status.positionMillis);
            // setShouldPlay(status.shouldPlay);
            // setIsPlaying(status.isPlaying);
            // setIsBuffering(status.isBuffering);
            // setRate(status.rate);
            // setMuted(status.isMuted);
            // setVolume(status.volume);
            if(status.didJustFinish && !status.isLooping) {
                console.log('works, 2');
                advanceIndex(true);
                // updatePlaybackInstanceForIndex(true);
            }
        } else {
            if(status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`)
            }
        }
    }

    const advanceIndex = (forward) => {
        setIndex(index + 1);
    }

    const updatePlaybackInstanceForIndex = (playing) => {
        updateScreenForLoading(true);
        loadNewPlaybackInstance(playing);
    }

    let loader;

    return (
        <View style={[styles.videoContainer, {
            width: videoWidth, 
            height: videoHeight
        }]}>
            <Video 
                ref={_mountVideo}
                resizeMode="cover"
                style={{ width: videoWidth, height: videoHeight, position: 'absolute', top: 0, right: 0, left: 0, alignItems: "stretch" }}
                onPlaybackStatusUpdate={_onPlaybackStatusUpdate}
            />
            <View style={{ alignItems: 'center', flexDirection: 'column' }}>
                {/* <ActivityIndicator 
                    size={40}
                    color='red'
                    style={{ marginTop: videoHeight / 2 }}
                /> */}
                <LottieView 
                    ref={(animation) => { 
                        loader = animation;
                        loader.play();
                    }}
                    style={styles.lottie}
                    source={require('../../assets/loader.json')}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    videoContainer: {
        flex: 1
    },
    lottie: {
        width: 70,
        height: 70
    }
});


export default withNavigation(VideoPlayer);