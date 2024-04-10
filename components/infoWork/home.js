import { View, Text, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import Button from "../../util/button";
import { useState } from "react";
import React, { useRef } from "react";
import twrnc from 'twrnc';
import {
    MaterialIcons,
  } from "@expo/vector-icons";
export default function InfoWorkHome({dropDownDetails,setDropDownDetails}) {
  const handleVisibleDetails = async () => {
    setDropDownDetails(!dropDownDetails);
  };
  const focusNextInput = (nextInputRef) => {
    if (nextInputRef.current) {
      nextInputRef.current.focus();
    }
  };
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  return (
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
            <View style={twrnc`gap-5 flex-row mt-5 justify-center`}>
                <TextInput
                    maxLength={1}
                    style={twrnc`border border-[#737373] text-[#FF5F00] text-2xl font-bold p-5 rounded-2xl`}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                    if (text.length === 1) {
                        focusNextInput(input2Ref);
                    }
                    }}
                ></TextInput>
                <TextInput
                    ref={input2Ref}
                    maxLength={1}
                    style={twrnc`border border-[#737373] text-[#FF5F00] text-2xl font-bold p-5 rounded-2xl`}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                    if (text.length === 1) {
                        focusNextInput(input3Ref);
                    }
                    }}
                ></TextInput>
                <TextInput
                    ref={input3Ref}
                    maxLength={1}
                    style={twrnc`border border-[#737373] text-[#FF5F00] text-2xl font-bold p-5 rounded-2xl`}
                    keyboardType="numeric"
                    onChangeText={(text) => {
                    if (text.length === 1) {
                        focusNextInput(input4Ref);
                    }
                    }}
                ></TextInput>
                <TextInput
                    keyboardType="numeric"
                    ref={input4Ref}
                    maxLength={1}
                    style={twrnc`border border-[#737373] text-[#FF5F00] text-2xl font-bold p-5 rounded-2xl`}
                    onChangeText={(text) => {}}
                ></TextInput>
            </View>
            <View>
                <Button background="bg-[#FF5F00] opacity-70">
                    <View style={twrnc`py-1 `}>
                        { 1 > 1 ?
                            <Text style={twrnc`text-xl text-white font-medium `}>Verificar</Text> :
                            <ActivityIndicator size="small" color="white" style={twrnc`py-1`}/>

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
  );
}
