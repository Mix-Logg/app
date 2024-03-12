import twrnc from "twrnc";
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE } from "react-native-maps";
import { useState, useRef } from "react";
import * as Location from "expo-location";
import { useEffect } from "react";
import { Pressable, Text,View } from "react-native";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [latitudeDelta, setLatitudeDelta] = useState(0.00922);
  const [longitudeDelta, setLongitudeDelta] = useState(0.00421);
  const [errorMsg, setErrorMsg] = useState(null);

  const mapRef = useRef(null)


  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  useEffect(()=>{
    Location.watchPositionAsync(
      {
        accuracy:Location.LocationAccuracy.Highest,
        timeInterval:500,
        distanceInterval:1
      }, (res) => {
        setLocation(res);
        mapRef.current?.animateCamera({
          center:res.coords
        })
      }
    )
  },[])


  return (
    <>
      {location === null ? (
        <View style={twrnc`h-100 w-full items-center justify-center`}>
          <Text>Aguarde...</Text>
        </View>
      ) : (
        <>
          <MapView
            ref={mapRef}
            style={twrnc`h-100 w-full`}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta,
            }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            showsMyLocationButton
            userInterfaceStyle
            
          >
            {/* <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              image={require("../../../img/icons/pin.png")}
            /> */}
          </MapView>
        </>
      )}
    </>
  );
}
