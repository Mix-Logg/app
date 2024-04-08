import twrnc from "twrnc";
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE } from "react-native-maps";
import Pin from './pin.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import MapViewRoute from 'react-native-maps-routes';
import { useState, useRef } from "react";
import * as Location from "expo-location";
import { useEffect } from "react";
import { Pressable, Text, View, ActivityIndicator, Animated, TouchableOpacity  } from "react-native";
import Button from '../../../util/button'
import MapViewDirections from 'react-native-maps-directions';
import findOneRace from "../../../hooks/findOneRace";
export default function Map() {
  const [location, setLocation] = useState(null);
  const [origin, setOrigin] = useState(null);
  // const [origin, setOrigin] = useState(null);
  // const [destination, setDestination] = useState(null);
  const [positionSubscription, setPositionSubscription] = useState(null);
  const [modeRace, setModeRace] = useState(false)
  const [pitchMap, setPitchMap] = useState(false)
  const [rotateMap,setRotateMap] = useState(false)
  const [followMap,setFollowMap] = useState(false)
  const [zoomMap,setZoomMap] = useState(false)
  const [scrollMap,setScrollMap] = useState(false)
  const [cameraZoom,setCamerazoom] = useState(50)
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDwhBCpqKMzkEpXm8w-t3Ib0KDOM9vdUPs';
  const mapRef = useRef(null)

  const moveTo = async (position) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = position;
      camera.zoom = 60,
      camera.pitch = 90,
      camera.heading = 60
      mapRef.current?.animateCamera(
        camera, { duration: 1000 }
      );
    }
  };
  const modeDriver = async () => {
    setModeRace(!modeRace)
    setPitchMap(!pitchMap)
    setRotateMap(!rotateMap)
    setFollowMap(!followMap)
    setZoomMap(!zoomMap)
    setScrollMap(!scrollMap)
    setCamerazoom(5)
    moveTo(origin)
  };


  useEffect(()=>{
    const fetchData = async () => {
      const raceId = await AsyncStorage.getItem('raceId')
      const race = await findOneRace(raceId)
      console.log('RACE Origin:', race.origin, JSON.parse(race.origin), typeof(race.origin))
      console.log('RACE Destination:', race.destination, JSON.parse(race.destination), typeof(race.destination))
      // setOrigin(race.origin)
      // setDestination(race.destination)
    }
    fetchData()
  }, [])

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
   const localtionReal = Location.watchPositionAsync(
      {
        accuracy:Location.LocationAccuracy.Highest,
        timeInterval:500,
        distanceInterval:1
      }, (res) => {
        setLocation(res);
      }
    )
    
    setPositionSubscription(localtionReal)
  },[])


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
              longitude: location.coords.longitude,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00922,
            }}
            provider={PROVIDER_GOOGLE}
            showsMyLocationButton
            userInterfaceStyle
            followsUserLocation={followMap}
            pitchEnabled={pitchMap}
            rotateEnabled={rotateMap}
            zoomEnabled={zoomMap}
            scrollEnabled={scrollMap}
            cameraZoomRange={cameraZoom}
            showsPointsOfInterest={false}
            mapType="terrain"
            onLayout={() => {
              mapRef.current.animateCamera({
                  pitch: 90,
                  heading:60,
                  zoom: 50,
              })
            }}
          >
            {/* { origin != null &&
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={10}
                strokeColor="#FF5F00"
                precision={"high"}
                mode={'DRIVING'}
                renderDirections={true}
                resetOnChange={true}
                onReady={(result)=>{
                }}
              />
            }  */}
            {/* <Marker
              coordinate={{
                latitude: destination.latitude,
                longitude: destination.longitude,
              }}
              image={require("../../../img/icons/pin.png")}
            /> */}
               <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              image={require("./arrow-gps.png")}
            />
          </MapView> 
          <View style={[twrnc`absolute p-1 rounded-xl border-[#a3a3a3] border h-12 w-12 items-center justify-center`, {top:'80%', left:'85%'}]}>
              <TouchableOpacity
                onPress={()=>moveTo(origin)}
              >
                <MaterialIcons name="gps-fixed" size={28} color="#FF5F00" />
                
              </TouchableOpacity>
          </View>
          <View style={[twrnc`absolute p-1 rounded-xl border-[#a3a3a3] border h-12 w-12 items-center justify-center`, {top:'69%', left:'85%'}]}>
              <TouchableOpacity
                onPress={()=>modeDriver()}
              >
                { modeRace ?
                  <Feather name="unlock" size={24} color="#FF5F00" /> :
                  <Feather name="lock" size={24} color="#FF5F00" />
                }
              </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
    
  );
}
