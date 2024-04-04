import twrnc from "twrnc";
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE } from "react-native-maps";
import Pin from './pin.png'
import MapViewRoute from 'react-native-maps-routes';
import { useState, useRef } from "react";
import * as Location from "expo-location";
import { useEffect } from "react";
import { Pressable, Text, View, ActivityIndicator, Animated  } from "react-native";
import Button from '../../../util/button'
import MapViewDirections from 'react-native-maps-directions';
export default function Map() {
  const [location, setLocation] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [latitudeDelta, setLatitudeDelta] = useState(0.00922);
  const [longitudeDelta, setLongitudeDelta] = useState(0.00421);
  const destination = { latitude: -23.593112, longitude: -46.440739 };   
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDwhBCpqKMzkEpXm8w-t3Ib0KDOM9vdUPs';
  const mapRef = useRef(null)


  // useEffect(() => {
  //   (async () => {
  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //     setOrigin(
  //       {
  //         latitude: location.coords.latitude,
  //         longitude: location.coords.longitude 
  //       }
  //     )
  //   })();
  // }, []);

  // useEffect(  ()=>{
  //   Location.watchPositionAsync(
  //     {
  //       accuracy:Location.LocationAccuracy.Highest,
  //       timeInterval:500,
  //       distanceInterval:1
  //     }, (res) => {
  //       setLocation(res);
  //       animate_point(res)
  //     }
  //   )
  // },[])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setOrigin( {latitude: location.coords.latitude, longitude: location.coords.longitude } )
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
        animate_point(res)
      }
    )
  },[])

  const animate_point = async (res) => {
    mapRef.current?.animateCamera({
      heading:60,
      zoom: 50,
      center:res.coords,
      pitch: 100
    })
  }

  return (
    <View style={twrnc`h-full`}>
      {location === null ? (
        <View style={twrnc`h-full w-full items-center justify-center`}>
           <ActivityIndicator size="large" color="#FF5F00" />
           <Text style={twrnc`font-bold`}>Carregando rota</Text>
        </View>
      ) : (
        <View style={twrnc`h-full w-full`}>
          <MapView
            ref={mapRef}
            style={twrnc`h-full w-full`}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.latitude,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta,
            }}
            provider={PROVIDER_GOOGLE}
            // showsUserLocation
            showsMyLocationButton
            userInterfaceStyle
            followsUserLocation={false}
            mapType="terrain"
            zoom={17}
            showsPointsOfInterest={false}
          >
            { origin != null &&
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={6}
                strokeColor="#FF5F00"
                precision={"high"}
                mode={'DRIVING'}
                onReady={(result)=>{
                  console.log('TEMPO:',result.duration) 
                  console.log('KM:', result.distance) 
                }}
              />
            } 
            <Marker
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              image={require("../../../img/icons/pin.png")}
            />
               <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              image={require("./arrow-gps.png")}
            />
          </MapView> 
        </View>
      )}
    </View>
    
  );
}
