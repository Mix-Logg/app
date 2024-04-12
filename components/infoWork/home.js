import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../../util/button";
import { useEffect, useState } from "react";
import React, { useRef } from "react";
import twrnc from 'twrnc';
import AllStorage from "../../hooks/findAllStorage";
import {
    MaterialIcons,
  } from "@expo/vector-icons";
import findOneRace from "../../hooks/findOneRace";
import updateRace from "../../hooks/updateRace";
export default function InfoWorkHome({dropDownDetails, setDropDownDetails, code, setCode}) {
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const [loader, setLoader] = useState(false)
  const [raceId, setRaceId] = useState(false)
  const [numberOne, setNumberOne] = useState(false)
  const [numberTwo, setNumberTwo] = useState(false)
  const [numberThree, setNumberThree] = useState(false)
  const [numberFour, setNumberFour] = useState(false)
  const [initialCode, setInitialCode] = useState('')
  const [finishCode, setFinishCode] = useState('')
  const [confirmInitialCode, setConfirmInitialCode] = useState(false)
  const [confirmFinishCode, setConfirmFinishCode] = useState(false)
  const [codeInvalid, setCodeInvalid] = useState(false)
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
      if(confirmInitialCode == null || confirmInitialCode == undefined){
        if(codeDelivery === initialCode){
          const updateInitalCode = {
            confirmCodeInitial : codeDelivery
          }
          const update = await updateRace(raceId ,updateInitalCode)
          console.log(update)
          setCode('alterInitial')
          return
        }
        setCodeInvalid(true)
        setTimeout(() => {
          setCodeInvalid(false)
        }, 1500);
        return;
      }
      if(confirmFinishCode == null || confirmFinishCode == undefined){
        if(codeDelivery === finishCode){
          const updateInitalCode = {
            confirmCodeFinish : codeDelivery
          }
          const update = await updateRace(raceId ,updateInitalCode)
          console.log(update)
          setCode('alterFinish')
          return
        }
        return;
      }
      setCode('Alteração')
    }catch(e){
      console.log(e)
    }finally{
      setLoader(false)
    }
  };

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

  return (
    <KeyboardAwareScrollView>
    <View style={twrnc`h-full mt-5 gap-10`}>
      <View>
        <Text style={twrnc`text-2xl font-bold`}>Frete</Text>
      </View>
      <View style={twrnc`flex-row justify-center`}>
        <View style={twrnc`gap-5 w-full`}>
            <View style={twrnc``}>
                <Text style={twrnc`text-lg text-[#FF5F00] font-medium`}>Código de segurança </Text>
                <Text>Peça o código de segurança para o cliente para confirmar que você está com a carga antes de prosseguir.</Text>
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
      <TouchableOpacity
        style={twrnc`flex-row justify-between items-end mt-10`}
        onPress={() => handleVisibleDetails()}
      >
        <View style={twrnc``}>
          <Text style={twrnc`text-xl `}>Detalhes avançados</Text>
        </View>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      </TouchableOpacity>
    </View>
    </KeyboardAwareScrollView>
  );
}
