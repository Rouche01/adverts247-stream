import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Button } from "react-native-elements";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getLocationPermission } from "../utils/userPermissions";
import { Context as DriverContext } from "../context/DriverContext";
import { Context as StreamingContext } from "../context/StreamingContext";
import { useKeepAwake } from "expo-keep-awake";

const PermissionGatewayScreen = ({ navigation }) => {
  const [locationPermit, setLocationPermit] = useState("denied");
  // const [ brightnessPermit, setBrightnessPermit ] = useState('denied');
  // const [ systemBrightnessPermit, setSystemBrightnessPermit ] = useState('denied');

  const {
    state: { user },
  } = useContext(DriverContext);

  const {
    state: { streamingStatus },
  } = useContext(StreamingContext);

  useKeepAwake();

  useEffect(() => {
    if (locationPermit === "granted") {
      if (streamingStatus === "off") {
        navigation.navigate("NoActivity");
      } else {
        navigation.navigate("Welcome");
      }
    }
  }, [locationPermit]);

  const acceptPermissions = async () => {
    // console.log('accept');

    let location, brightness, systemBrightness;

    if (locationPermit !== "granted") {
      location = await getLocationPermission();
      setLocationPermit(location);
    }

    // if(brightnessPermit !== 'granted') {
    //     brightness = await getBrightnessPermission();
    //     setBrightnessPermit(brightness);
    // }

    // if(systemBrightnessPermit !== 'granted') {
    //     systemBrightness = await getSystemBrightnessPermission();
    //     setSystemBrightnessPermit(systemBrightness);
    // }

    // console.log(location, brightness, systemBrightness);
  };

  return (
    <ImageBackground
      source={require("../../assets/landingBackground.png")}
      style={styles.backgroundStyle}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="rgba(0,0,0,0.2)"
        translucent={true}
      />
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.permissionIcon}>
            <MaterialCommunityIcons
              name="shield-check"
              size={45}
              color="rgba(255,255,255,0.6)"
            />
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              For a smooth and efficient app experience, Adverts247 need the
              below permissions to access and collect information. You can
              suspend your permission from your device at any time.
            </Text>
          </View>
          <View style={styles.permissionGroup}>
            <View style={styles.groupIconWrapper}>
              <View style={styles.groupIcon}>
                <Ionicons name="md-locate" size={wp("2.5%")} color="#fff" />
              </View>
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.groupTitle}>Location</Text>
              <Text style={styles.groupBody}>
                We may collect current location data to verify your location and
                provide current weather data periodically.
              </Text>
            </View>
          </View>
          <View style={styles.permissionGroup}>
            <View style={styles.groupIconWrapper}>
              <View style={styles.groupIcon}>
                <Ionicons name="md-settings" size={wp("2.5%")} color="#fff" />
              </View>
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.groupTitle}>System Settings</Text>
              <Text style={styles.groupBody}>
                We may require access to your system settings to be able to
                access and modify your system brightness.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <Button
          onPress={() => acceptPermissions()}
          title="Accept & Access"
          containerStyle={{ marginTop: hp("5%"), width: wp("55%") }}
          buttonStyle={{
            padding: 10,
            backgroundColor: "#F1040E",
            borderRadius: 50,
          }}
          titleStyle={{ fontSize: hp("4%") }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    alignItems: "center",
  },
  body: {
    flex: 4,
  },
  footer: {
    flex: 1,
  },
  permissionIcon: {
    width: 80,
    height: 80,
    backgroundColor: "#333",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    alignSelf: "center",
    marginTop: hp("8%"),
  },
  infoBox: {
    backgroundColor: "#1D1B1B",
    width: wp("55%"),
    paddingHorizontal: wp("2.2%"),
    paddingBottom: 22,
    borderRadius: 15,
    zIndex: -10,
    marginTop: -40,
    elevation: 12,
  },
  infoText: {
    color: "#fff",
    fontSize: hp("3.7%"),
    marginTop: 50,
  },
  permissionGroup: {
    flexDirection: "row",
    width: wp("55%"),
    marginTop: hp("5%"),
    alignItems: "center",
  },
  groupIconWrapper: {
    flex: 1,
  },
  groupIcon: {
    backgroundColor: "#F1040E",
    width: wp("4.7%"),
    height: wp("4.7%"),
    borderRadius: wp("3%"),
    alignItems: "center",
    justifyContent: "center",
  },
  groupInfo: {
    flex: 6,
  },
  groupTitle: {
    color: "#fff",
    fontSize: hp("3.6%"),
  },
  groupBody: {
    color: "#fff",
    fontSize: hp("3%"),
  },
});

export default PermissionGatewayScreen;
