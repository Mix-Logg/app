import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import twrnc from "twrnc";
import Pix from "../../img/icons/pix.png";
import Button from "../../util/button";
import { useEffect, useState } from "react";
import { Feather, FontAwesome5, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import MaskInput, { Masks } from 'react-native-mask-input';
import GetDelivery from "../../api/getDelivery";
import UpdateUser from "../../hooks/updateDelivery";
import SuccessCadasterPix from "../SuccessCadasterPix";
export default function CadasterPix() {
    const [cadaster,setCadaster] = useState(false)
    const [option,setOption] = useState('')
    const [keyBoard,setKeyBoard] = useState('')
    const [pix,setPix] = useState('')
    const [pixCurrent,setPixCurrent] = useState('PIX não cadastrado')
    const [modal, setModal] = useState(null)

    const handleNewCadaster = (select) => {
      if(select === 'email'){
        setOption()
        setKeyBoard('email-address')
      }
      if(select === 'cpf'){
        setOption(Masks.BRL_CPF)
        setKeyBoard('numeric')
      }
      if(select === 'phone'){
        setOption(Masks.BRL_PHONE)
        setKeyBoard('numeric')
      }
      if(select === 'random'){
        setKeyBoard('default')
      }
      setPix('')
      setCadaster(!cadaster)
    }

    const handleCadaster = async () => {
      const param = {
        pix:pix
      }
      const update = await UpdateUser(param)
      if(update.status == 201){
          setModal(
            <SuccessCadasterPix/>
          )
          return;
      }
    }
    
    useEffect(()=>{
        const useEffectData = async () => {
          const user = await GetDelivery()
          if(user.pix){
            setPixCurrent(user.pix)
            return;
          }
        }
        useEffectData()
    },[])


  return (
    <KeyboardAwareScrollView>
      {modal}
      <View style={twrnc`w-full justify-center items-center`}>
        <View style={twrnc`w-7 h-7`}>
          <Image
            style={twrnc`h-full w-full`}
            resizeMode="contain"
            source={Pix}
          />
        </View>
      </View>
      { !cadaster ?
        <View style={twrnc`gap-10 mt-10`}>
          <View style={twrnc`flex-row gap-2 justify-center`}>
            <Text style={twrnc`text-[#6b7280] text-base`}>
              Atual:
            </Text>
            <Text style={twrnc`font-bold text-base bg-orange-50 text-[#FF5F00] px-2 rounded-lg`} >
              {pixCurrent}
            </Text>
          </View>
          <View style={twrnc` gap-8 justify-end`}>
            <TouchableOpacity style={twrnc`flex-row w-full justify-between`}
              onPress={()=>handleNewCadaster('cpf')}
            >
              <View style={twrnc`flex-row items-center gap-2`}>
                  <FontAwesome5 name="address-card" size={24} color="black" />
                  <Text style={twrnc`font-bold`}>CPF</Text>
              </View>
              <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={twrnc`flex-row w-full justify-between`}
              onPress={()=>handleNewCadaster('phone')}
            >
              <View style={twrnc`flex-row items-center gap-2`}>
                <Feather name="smartphone" size={24} color="black" />
                <Text style={twrnc`font-bold`}>Celular</Text>
              </View>
              <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={twrnc`flex-row w-full justify-between`}
              onPress={()=>handleNewCadaster('email')}
            >
              <View style={twrnc`flex-row items-center gap-2`}>
                <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                <Text style={twrnc`font-bold`}>E-mail</Text>
              </View>
              <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={twrnc`flex-row w-full justify-between`}
              onPress={()=>handleNewCadaster('random')}
            >
              <View style={twrnc`flex-row items-center gap-2`}>
                <Feather name="shield" size={24} color="black" />
                <Text style={twrnc`font-bold`}>Chave aleatória</Text>
              </View>
              <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View> :
        <View style={twrnc`items-start justify-start w-full gap-8` }>
          <View style={twrnc`mt-10 items-start w-full`}>
            <Button handle={handleNewCadaster} >
              <Feather name="arrow-left" size={18} color="black" /> 
              <Text style={twrnc`font-bold`} >Voltar</Text>
            </Button>
            <View style={twrnc`mt-10 w-full`}>
              <View style={twrnc`gap-3`}>
                      <Text style={twrnc`text-2xl font-bold`}>Registrar PIX</Text>
                      <Text style={twrnc`text-base text-[#a3a3a3]`}>Insira o pix que você quer usar para receber transferências por Pix.</Text>
              </View>
              <View style={twrnc`border-b border-[#E7E7E7] flex-row mt-10 gap-2 items-center`}>
                      <MaskInput
                          style={twrnc`text-3xl font-bold w-full`}
                          mask = {option}
                          value={pix}
                          onChangeText={(masked, unmasked)=>setPix(masked)}
                          placeholder=""
                          keyboardType={keyBoard}
                      />
              </View>
              <View style={twrnc`w-full items-end mt-10`}>
                <Button handle={handleCadaster}>
                  <View style={twrnc`p-3 bg-[#FF5F00] rounded-full`}>
                    <Feather name="arrow-right" size={24} color="white" />
                  </View>
                </Button>
              </View>
            </View>
          </View>
        </View>
      }
    </KeyboardAwareScrollView>
  );
}
