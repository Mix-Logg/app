import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../../util/button";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import twrnc from 'twrnc';
import { io } from 'socket.io-client';
import { useNavigation } from "@react-navigation/native";
import AllStorage from "../../hooks/findAllStorage";
import {
    MaterialIcons,
  } from "@expo/vector-icons";
import findOneRace from "../../hooks/findOneRace";
import updateRace from "../../hooks/updateRace";
import ConfirmCodeSuccessful from "../confirmCodeWork";
export default function InfoWorkHome({dropDownDetails, setDropDownDetails, code, setCode, setInfo, locationDelivery}) {
  const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
  const URLdevelopment = 'http://192.168.0.35:8080/'
  const URL = URLdevelopment
  const navigation = useNavigation()
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const [socket, setSocket] = useState(null)
  const [loader, setLoader] = useState(false)
  const [raceId, setRaceId] = useState(false)
  const [numberOne, setNumberOne] = useState('')
  const [numberTwo, setNumberTwo] = useState('')
  const [numberThree, setNumberThree] = useState('')
  const [numberFour, setNumberFour] = useState('')
  const [initialCode, setInitialCode] = useState('')
  const [finishCode, setFinishCode] = useState('')
  const [confirmInitialCode, setConfirmInitialCode] = useState(false)
  const [confirmFinishCode, setConfirmFinishCode] = useState(false)
  const [codeInvalid, setCodeInvalid] = useState(false)
  const [modalCorrectCode, setModalCorrectCode] = useState('')
  const handleVisibleDetails = async () => {
    setDropDownDetails(!dropDownDetails);
  };
  const focusNextInput = (nextInputRef) => {
    if (nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };
  const handleVerifyCode = async () => {
    try{
      setLoader(true)
      const codeDelivery = numberOne+numberTwo+numberThree+numberFour
      const raceId = await AsyncStorage.getItem('raceId')
      const race = await findOneRace(raceId);
      if(confirmInitialCode == null || confirmInitialCode == undefined){
        if(codeDelivery === initialCode){
          const updateInitalCode = {
            confirmCodeInitial : codeDelivery
          }
          const update = await updateRace(raceId ,updateInitalCode)
          if(update.status === 200){
            setConfirmInitialCode(true)
            socket.emit('talk', race.idClientIo, 'codeInitialConfirm');
            setModalCorrectCode(<ConfirmCodeSuccessful handle={handleCloseModal}/>)
            setCode('alterInitial')
            return
          }
        }
        setCodeInvalid(true)
        setTimeout(() => {
          setCodeInvalid(false)
        }, 1500);
        return;
      }
      if(confirmFinishCode == null || confirmFinishCode == undefined){
        if(codeDelivery === finishCode){
          const updateFinishCode = {
            confirmCodeFinish : codeDelivery
          }
          const update = await updateRace(raceId ,updateFinishCode)
          if(update.status === 200){
            socket.emit('talk', race.idClientIo, 'finishRace');
            await AsyncStorage.removeItem('raceId');
            navigation.navigate('Home')
          }
          setCode('alterFinish')
          return
        }
        setCodeInvalid(true)
        setTimeout(() => {
          setCodeInvalid(false)
        }, 1500);
        return;
      }
    }catch(e){
      console.log(e)
    }finally{
      setLoader(false)
    }
  };
  const handleCloseModal = async () => {
    setModalCorrectCode('')
    setInfo('')
  }

  useEffect(()=>{
    const fetchData = async () => {
      const storage = await AllStorage();
      const race = await findOneRace(storage.raceId)
      setRaceId(storage.raceId)
      setConfirmInitialCode(race.confirmCodeInitial)
      setConfirmFinishCode(race.confirmCodeFinish)
      setInitialCode(storage.codeInitial)
      setFinishCode(storage.codeFinish)
    }
    fetchData()
  },[])

  useEffect(()=>{
    const fetchData = async () => {
      const socketIO = await io(URL);
      setSocket(socketIO);
    }
    fetchData()
  },[])

  return (
    <KeyboardAwareScrollView>
      {modalCorrectCode}
      <View style={twrnc`h-full mt-5 gap-10`}>
        <View>
          <Text className="text-primary" style={twrnc`text-2xl font-bold `}>Frete</Text>
        </View>
        <View style={twrnc`flex-row justify-center`}>
          <View style={twrnc`gap-5 w-full`}>
              <View style={twrnc``}>
                  { confirmInitialCode ?
                    <>
                      <Text style={twrnc`text-lg text-[#FF5F00] font-medium`}>Código de segurança (entrega)</Text>
                      <Text>Peça o código de segurança para o cliente para confirmar que você <Text style={twrnc`font-bold text-green-600`}>COMPLETOU</Text> a entrega.</Text>
                    </>
                    :
                    <>
                      <Text style={twrnc`text-lg text-[#FF5F00] font-medium`}>Código de segurança (coleta)</Text>
                      <Text>Peça o código de segurança para o cliente para confirmar que você está com a carga antes de prosseguir.</Text>
                    </>
                  }
              </View>
              <View style={twrnc`items-center w-1/2 rounded-r-full bg-red-600`}>
                { codeInvalid &&
                  <Text style={twrnc` text-white text-lg font-bold`}>Código incorreto!</Text>
                }
              </View>
              <View style={twrnc`gap-5 flex-row mt-5 justify-center`}>
                  <TextInput
                      maxLength={1}
                      style={twrnc`border border-[#737373] text-[#FF5F00] text-2xl font-bold p-5 rounded-2xl`}
                      keyboardType="numeric"
                      value={numberOne}
                      onChangeText={(text) => {
                      if (text.length === 1) {
                          focusNextInput(input2Ref);
                          setNumberOne(text)
                      }else{
                        setNumberOne('')
                      }
                      }}
                  ></TextInput>
                  <TextInput
                      ref={input2Ref}
                      maxLength={1}
                      style={twrnc`border border-[#737373] text-[#FF5F00] text-2xl font-bold p-5 rounded-2xl`}
                      keyboardType="numeric"
                      value={numberTwo}
                      onChangeText={(text) => {
                      if (text.length === 1) {
                          focusNextInput(input3Ref);
                          setNumberTwo(text)
                      }else{
                        setNumberTwo('')
                      }
                      }}
                  ></TextInput>
                  <TextInput
                      ref={input3Ref}
                      maxLength={1}
                      style={twrnc`border border-[#737373] text-[#FF5F00] text-2xl font-bold p-5 rounded-2xl`}
                      keyboardType="numeric"
                      value={numberThree}
                      onChangeText={(text) => {
                      if (text.length === 1) {
                          focusNextInput(input4Ref);
                          setNumberThree(text)
                      }else{
                        setNumberThree('')
                      }
                      }}
                  ></TextInput>
                  <TextInput
                      keyboardType="numeric"
                      ref={input4Ref}
                      maxLength={1}
                      style={twrnc`border border-[#737373] text-[#FF5F00] text-2xl font-bold p-5 rounded-2xl`}
                      value={numberFour}
                      onChangeText={(text) => {
                        setNumberFour(text)
                      }}
                  ></TextInput>
              </View>
              <View>
                  <Button background={`bg-[#FF5F00] ${ loader ? 'opacity-70' : ''}`} handle={handleVerifyCode}>
                      <View style={twrnc`py-1 `}>
                          { loader ?
                            <ActivityIndicator size="small" color="white" style={twrnc`py-1`}/>
                            :
                            <Text style={twrnc`text-xl text-white font-medium `}>Verificar</Text> 
                          }
                      </View>
                  </Button>
              </View>
          </View>
        </View>
        <View style={twrnc`flex-row justify-between items-end mt-10`}>
          <View style={twrnc``}>
            <Text className='font-light' style={twrnc`text-2xl`}>Detalhes avançados</Text>
          </View>
          <TouchableOpacity className="p-1 bg-primary rounded-lg" 
            onPress={() => handleVisibleDetails()}
          >
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
