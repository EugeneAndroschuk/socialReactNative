import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";
import SvgArrowLeft from "../assets/images/Svg/SvgArrowLeft";

const MapScreen = ({ navigation, route }) => {
    // const [formData, setFormData] = useState({});
    const [location, setLocation] = useState(null);

    useEffect(() => {
      if (route.params) setLocation(route.params.coords);
      console.log(route.params.coords);
    }, [route.params]);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Map</Text>
        <TouchableOpacity
          style={styles.svgArrowLeft}
          onPress={() => navigation.navigate("Posts")}
        >
          <SvgArrowLeft />
        </TouchableOpacity>
      </View>

      <View
        style={{
          ...styles.photo,
          height: Dimensions.get("window").height - 100,
        }}
      >
        <MapView
          style={{
            width: Dimensions.get("window").width - 32,
            height: Dimensions.get("window").height - 200,
          }}
          region={{
            ...location,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
        >
          {location && (
            <Marker
              title="I am here"
              coordinate={location}
              description="Hello"
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: "#FFFFFF",
  },

  title: {
    alignItems: "center",
    borderStyle: "solid",
    borderBottomWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.3)",

    paddingBottom: 11,
  },

  titleText: {
    fontFamily: "Roboto-Medium-500",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },

  svgArrowLeft: {
    position: "absolute",
    top: 0,
    left: 16,
  },

  photo: {
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 32,
  },

  mapStyle: {
    width: Dimensions.get("window").width - 32,
    height: Dimensions.get("window").height - 200,
  },
});
