import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, StatusBar, Image } from 'react-native';
import VideoPlayer from '../components/VideoPlayer';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';


const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

const AdPlayerScreen = ({ navigation }) => {

    const [ driverInfo, setDriverInfo ] = useState(null);

    useEffect(() => {

        setDriverInfo(navigation.state.params.driverInfo);
        // console.log(navigation.state.params);

    }, []);

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
            />
            <View style={styles.settingsBar}>
                <Image source={require('../../assets/logoAlt.png')} resizeMode="contain" 
                    style={styles.logoStyle} 
                />
                <View style={styles.leftCol}>
                    <View style={styles.videoControls}>
                        <View style={styles.ctrlWrapper}>
                            <MaterialIcons style={styles.ctrlIcon} 
                                name="brightness-6" 
                                size={18} 
                                color="#E6E6E6" 
                            />
                            <Text style={styles.ctrlLabel}>Brightness</Text>
                        </View>
                        <View style={styles.ctrlWrapper}>
                            <FontAwesome5 
                                style={styles.ctrlIcon} 
                                name="volume-down" 
                                size={18} 
                                color="#E6E6E6" 
                            />
                            <Text style={styles.ctrlLabel}>Volume</Text>
                        </View>
                        <View style={styles.ctrlWrapper}>
                            <FontAwesome5 
                                style={styles.ctrlIcon} 
                                name="volume-mute" 
                                size={18} color="#E6E6E6" 
                            />
                            <Text style={styles.ctrlLabel}>Mute</Text>
                        </View>
                    </View>
                    <View style={styles.driverInfo}>
                        {/* <Image 
                            source={{ uri: driverInfo.image }}
                            style={styles.driverImg}
                        /> */}
                        {/* <Text>{driverInfo.name}</Text> */}
                    </View>
                </View>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
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
    }
});



export default AdPlayerScreen;