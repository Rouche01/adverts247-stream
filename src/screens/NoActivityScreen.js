import React, { useContext, useEffect } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Text,
} from "react-native";
import { Button } from "react-native-elements";
import { Context as DriverContext } from "../context/DriverContext";
import useStreamingStatus from "../hooks/useStreamingStatus";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { checkLocationPermission } from "../utils/userPermissions";
import { useKeepAwake } from "expo-keep-awake";
import { Ionicons } from "@expo/vector-icons";
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from "react-native-popup-menu";

const NoActivityScreen = ({ navigation }) => {
  const { signoutDriver } = useContext(DriverContext);
  const [streamStatus] = useStreamingStatus();

  useEffect(() => {
    // console.log(streamStatus, 3);
    if (streamStatus === "on") {
      navigation.navigate("Welcome");
    }
  }, [streamStatus]);

  useKeepAwake();

  useEffect(() => {
    (async () => {
      const locationPermission = await checkLocationPermission();

      // console.log(locationPermission);
      if (!locationPermission) {
        navigation.navigate("PermissionGateway");
      }
    })();
  }, []);

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
      <Image
        source={require("../../assets/logoAlt.png")}
        resizeMode="contain"
        style={styles.logoStyle}
      />
      <Menu style={styles.popupBtn}>
        <MenuTrigger>
          <Ionicons name="ellipsis-vertical" size={28} color="white" />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption onSelect={() => signoutDriver()}>
            <Text style={{ fontSize: hp("4.5%"), paddingLeft: 10 }}>
              Logout
            </Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoStyle: {
    width: wp("35%"),
    height: hp("25%"),
  },
  popupBtn: {
    position: "absolute",
    top: hp("11%"),
    right: wp("3.2%"),
  },
});

export default NoActivityScreen;
