import twrnc from "twrnc";
import MapView, { Marker, AnimatedRegion, PROVIDER_GOOGLE } from "react-native-maps";
import Pin from './pin.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Gyroscope } from 'expo-sensors';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import MapViewRoute from 'react-native-maps-routes';
import { useState, useRef } from "react";
import * as Location from "expo-location";
import { useEffect } from "react";
import { Pressable, Text, View, ActivityIndicator, Animated, TouchableOpacity  } from "react-native";
import Button from '../../../util/button'
import MapViewDirections from 'react-native-maps-directions';
import findOneRace from "../../../hooks/findOneRace";
import { io } from 'socket.io-client';
export default function Map({code}) {
  const [socket, setSocket] = useState(null)
  const [location, setLocation] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [nextStep, setNextStep] = useState(null);
  const [stepRace, setStepRace] = useState(null);
  const [modeRace, setModeRace] = useState(false)
  const [pitchMap, setPitchMap] = useState(false)
  const [rotateMap,setRotateMap] = useState(false)
  const [followMap,setFollowMap] = useState(false)
  const [zoomMap,setZoomMap] = useState(false)
  const [scrollMap,setScrollMap] = useState(false)
  const [cameraZoom,setCamerazoom] = useState(50)
  const GOOGLE_MAPS_APIKEY = 'AIzaSyDwhBCpqKMzkEpXm8w-t3Ib0KDOM9vdUPs';
  const mapRef = useRef(null)
  const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
  const URLdevelopment = 'http://192.168.0.35:8080/'
  const URL = URLproduction
  
  const moveTo = async (res) => {
    const camera = await mapRef.current?.getCamera();
    if (camera) {
      camera.center = res.coords;
      camera.zoom = 25,
      camera.pitch = 90,
      camera.heading = 70
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
    moveTo(location)
  };

  useEffect(()=>{
    const fetchData = async () => {
        const socketIO = await io(URL);
        setSocket(socketIO);
    }
    fetchData()
  },[])

  useEffect(()=>{
    fetchData = async () => {
      const raceId = await AsyncStorage.getItem('raceId')
      const race = await findOneRace(raceId)
      const originClient = await JSON.parse(race.origin);
      const destinationClient = await JSON.parse(race.destination);
      const originWithDeltas = {
        ...originClient,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00922
      };  
      const destinationWithDeltas = {
        ...destinationClient,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00922
      }; 
      if(race.confirmCodeInitial){
        setStepRace(destinationWithDeltas)
        return
      }
      setStepRace(originWithDeltas)
    }
    fetchData()
  },[code])

  useEffect(()=>{
    const fetchData = async () => {
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.LocationAccuracy.Highest,
          timeInterval: 500,
          distanceInterval: 1
        },
        async (res) => {
          moveTo(res)
          setOrigin({ latitude: res.coords.latitude, longitude: res.coords.longitude });
          setLocation(res);
          if (socket) {
            const raceId = await AsyncStorage.getItem('raceId');
            if (raceId) {
              const race = await findOneRace(raceId);
              socket.emit('talk', race.idClientIo, { latitude: res.coords.latitude, longitude: res.coords.longitude });
              return;
            }
            locationSubscription.remove(); 
          }
        }
      );
    }
    fetchData()
  },[socket])


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
            mapType="terrain"
            ref={mapRef}
            style={twrnc`h-full w-full`}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00922,
            }}
            provider={PROVIDER_GOOGLE}
            pitchEnabled={pitchMap}
            rotateEnabled={rotateMap}
            zoomEnabled={zoomMap}
            scrollEnabled={scrollMap}
            cameraZoomRange={cameraZoom}
            showsPointsOfInterest={false}
            onLayout={() => {
              mapRef.current.animateCamera({
                  pitch: 90,
                  heading: 70,
                  zoom: 25,
              })
            }}
          >
            { stepRace != null && origin != null &&
              <>
              <MapViewDirections
                origin={origin}
                destination={stepRace}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={10}
                strokeColor="#FF5F00"
                precision={"high"}
                mode={'DRIVING'}
                renderDirections={true}
                resetOnChange={true}
                onReady={(result)=>{
                  // console.log('result ', result)
                }}
              />
               <Marker
                  coordinate={{
                    latitude: stepRace.latitude,
                    longitude: stepRace.longitude,
                  }}
                  image={require("../../../img/icons/pin.png")}
                /> 
              </>
            } 
               { !modeRace ?
                  <Marker
                    coordinate={{
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    }}
                    image={require("./arrow-gps.png")}
                  />
                  :
                  <Marker
                    coordinate={{
                      latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                    }}
                    image={require("../../../img/icons/pin.png")}
                  />
                }
          </MapView> 
          <View style={[twrnc`absolute p-1 rounded-xl border-[#a3a3a3] border h-12 w-12 items-center justify-center`, {top:'80%', left:'85%'}]}>
              <TouchableOpacity
                onPress={()=>moveTo(location)}
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
