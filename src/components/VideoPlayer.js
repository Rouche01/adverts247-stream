import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Audio, Video } from "expo-av";
import LoaderAnimation from './LoaderAnimation';


class PlaylistItem {
  constructor(name, uri, isVideo) {
    this.name = name;
    this.uri = uri;
    this.isVideo = isVideo;
  }
}


export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    // this.index = 0;
    this.playbackInstance = null;
    this.state = {
      index: 0,
      createdPlaylist: [],
      playlist: [],
      showCountdown: false,
      toAdCounter: 3,
      loopingType: false,
      muted: false,
      playbackInstancePosition: 0,
      playbackInstanceDuration: 0,
      shouldPlay: true,
      isPlaying: false,
      isBuffering: false,
      isLoading: true,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
    };
  }

  componentDidMount() {

    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false
    });

    
  }


  componentDidUpdate(prevProps, prevState) {

      if(this.props.muteState !== prevProps.muteState) {
        console.log(this.props.muteState);
        if (this.playbackInstance != null) {
            this.playbackInstance.setIsMutedAsync(this.props.muteState);
        }
      }
      
      if(this.props.volumeState !== prevProps.volumeState) {
        console.log(this.props.volumeState);
        if (this.playbackInstance != null) {
            this.playbackInstance.setVolumeAsync(this.props.volumeState);
        }
      }

      const { mediaBucket } = this.props;


      if(mediaBucket.videos.length > 0 && mediaBucket.ads.length > 0 && mediaBucket !== prevProps.mediaBucket) {

        const { videos, ads } = mediaBucket;
        let playedIdx = this.props.entertainPlayedIdx;
        let createdPlaylist = [];

        if((videos.length - playedIdx.length) < 3) {
          playedIdx = [];
        }

        for(let i = 0; i < 3; i++) {

          let randomIdx;

          do {
            randomIdx = Math.floor(Math.random() * videos.length);
          }
          while(playedIdx.includes(randomIdx));

          playedIdx.push(randomIdx);

          let playlistItem = new PlaylistItem(
            videos[randomIdx],
            `https://du0jby8g769zz.cloudfront.net/${videos[randomIdx]}/Default/HLS/${videos[randomIdx]}.m3u8`,
            true
          );

          createdPlaylist.push(playlistItem);

        }

        let playedAdsIdx = this.props.adsPlayedIdx;

        if(ads.length === playedAdsIdx.length) {
          playedAdsIdx = [];
        }
        let randomAdsIdx;
        
        do {
          randomAdsIdx = Math.floor(Math.random() * ads.length);
        } 
        while(playedAdsIdx.includes(randomAdsIdx));

        playedAdsIdx.push(randomAdsIdx);

        const adItem = new PlaylistItem(
          ads[randomAdsIdx],
          `https://d1m3tt7ld1wwl8.cloudfront.net/${ads[randomAdsIdx]}/Default/HLS/${ads[randomAdsIdx]}.m3u8`,
          true
        );

        createdPlaylist.push(adItem);

        this.props.savePlayedIdx(playedIdx);
        this.props.savePlayedAdsIdx(playedAdsIdx);
        console.log(playedIdx, playedAdsIdx);


        this.setState({
          playlist: createdPlaylist
        }, () => {
          console.log(this.state.playlist);
        });

      }


      if(this.state.index === 2 && this.state.playbackInstancePosition > 0) {

        const adPromptTime = this.state.playbackInstanceDuration - 4000;
        // console.log(typeof(this.state.playbackInstancePosition), adPromptTime, this.state.playbackInstanceDuration);

        if(this.state.playbackInstancePosition >= adPromptTime & !this.state.showCountdown) {

          console.log('works');
          this.setState({
            showCountdown: true
          });

          let timesToRun = 0;
          let adCounter = setInterval(() => {
              timesToRun += 1;
              if(timesToRun === 3) {
                clearInterval(adCounter);
              }

              this.setState({
                toAdCounter: this.state.toAdCounter - 1
              })
          }, 1000);

        }
      }


      if(this.state.index === 3 && this.state.showCountdown) {

        this.setState({
          showCountdown: false
        });

      }
  }

  componentWillUnmount () {
    

  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      // this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }

    if(this.state.index === 4) {
      this.props.navigation.navigate('GameStart');
    } else {
      const source = { uri: this.state.playlist[this.state.index].uri };
      const initialStatus = {
        shouldPlay: playing,
        rate: this.state.rate,
        shouldCorrectPitch: this.state.shouldCorrectPitch,
        volume: this.state.volume,
        isMuted: this.state.muted,
        isLooping: this.state.loopingType
      };

      try {
        await this._video.loadAsync(source, initialStatus);
        // this._video.onPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
        this.playbackInstance = this._video;
        const status = await this._video.getStatusAsync();

        this._updateScreenForLoading(false);
      } catch(err) {
        console.log(err);
      }
    }
    
  }

  _mountVideo = component => {

    this._video = component;
    this._loadNewPlaybackInstance(true);

  };

  _updateScreenForLoading(isLoading) {
    if (isLoading) {
      this.setState({
        isPlaying: false,
        playbackInstanceDuration: null,
        playbackInstancePosition: null,
        isLoading: true
      });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        loopingType: status.isLooping,
        shouldCorrectPitch: status.shouldCorrectPitch
      });
      if (status.didJustFinish && !status.isLooping) {
        
        this._advanceIndex();
        this._updatePlaybackInstanceForIndex(true);

      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };


  _advanceIndex() {
    this.setState({
      index: this.state.index + 1
    })
  }

  async _updatePlaybackInstanceForIndex(playing) {

    this._updateScreenForLoading(true);
    this._loadNewPlaybackInstance(playing);

  }


  _getMMSSFromMillis(millis) {
    const totalSeconds = millis / 1000;
    return totalSeconds;
  }


  render() {
    if (this.state.playlist.length === 0) {
      return (
        <View style={styles.nonPlaylist}>

        </View>
      );
    }
    return (
      <View style={styles.container}>
        
        <View style={[styles.videoContainer, {
            width: this.props.videoWidth, 
            height: this.props.videoHeight
        }]}>
            <Video 
                ref={this._mountVideo}
                resizeMode="cover"
                style={{ width: this.props.videoWidth, height: this.props.videoHeight, position: 'absolute', top: 0, right: 0, left: 0, alignItems: "stretch" , opacity: this.state.isLoading ? 0.5 : 1 }}
                onPlaybackStatusUpdate={this._onPlaybackStatusUpdate}
            />
            <View style={{ alignItems: 'center', flexDirection: 'column' }}>
                <View>
                    { this.state.isLoading ? <LoaderAnimation /> : null }
                </View>
            </View>
            { this.state.showCountdown ? <View style={styles.adCountdown}>
              <Text style={styles.countdownText}>Ad starts in {this.state.toAdCounter}</Text>
            </View> : null }
        </View>
      </View>

      
    );
  }
}


const styles = StyleSheet.create({
    nonPlaylist: {
      backgroundColor: '#222',
      flex: 1
    },
    container: {
        flex: 1
    },
    videoContainer: {
        flex: 1,
        backgroundColor: '#222'
    },
    adCountdown: {
      backgroundColor: '#262525',
      position: 'absolute',
      bottom: 100,
      right: 50,
      paddingHorizontal: 20,
      paddingVertical: 10
    },
    countdownText: {
      color: '#fff',
      fontSize: 16
    }
});


