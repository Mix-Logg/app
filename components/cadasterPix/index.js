import { View, Text, TextInput, Image } from "react-native";
import twrnc from "twrnc";
import Pix from "../../img/icons/pix.png";
import Button from "../../util/button";
import { useState } from "react";
import { Feather } from '@expo/vector-icons';
export default function CadasterPix() {
    const [cadaster,setCadaster] = useState(false)

    const handleNewCadaster = () => {
        setCadaster(!cadaster)
    }



  return (
    <>
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
            Guifoxlokaum@gmail.com
          </Text>
        </View>
        <View style={twrnc`justify-center items-center`} >
            <Button handle={handleNewCadaster} background="bg-[#FF5F00]">
                <Text style={twrnc`text-white font-bold`}>Novo Cadastro</Text>
                <Feather name="arrow-right" size={18} color="white" />
            </Button>
        </View>
        
        </View> :
        <View style={twrnc`items-start justify-start w-full gap-8` }>
            <View style={twrnc`mt-10 items-start w-full`}>
                <Button handle={handleNewCadaster} >
                    <Feather name="arrow-left" size={18} color="black" /> 
                    <Text style={twrnc`font-bold`} >Voltar</Text>
                </Button>
                <View style={twrnc`px-20 mt-10 w-full items-start gap-1`}>
                    <Text style={twrnc`text-xs `}>Digite seu PIX</Text>
                    <TextInput
                        style={twrnc`border border-lg w-2/2 rounded-lg px-3`}
                    />
                    <View style={twrnc`items-end w-full mt-5`}>
                        <Button handle={handleNewCadaster} background={'bg-green-100'}>
                            <Text style={twrnc`font-bold text-green-600`} >Confirmar</Text>
                        </Button>
                    </View>
                </View>
            </View>
           
        </View>
      }
    </>
  );
}
