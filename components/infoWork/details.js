import twrnc from "twrnc";
import * as Clipboard from "expo-clipboard";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Feather,
  AntDesign,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";
import { useState } from "react";
import Mask from "../../hooks/mask";
import Button from "../../util/button";
import CancelRace from "../cancelRace";
export default function InfoWorkDetails({
  name,
  phone,
  price,
  origin,
  destination,
  setDropDownDetails,
  dropDownDetails
}) {
    const [copied, setCopied] = useState(false);
    const [modalCancel, setModalCancel] = useState("");

    const handlePhone = (phone) => {
      const url = `tel:${phone}`;
      Linking.openURL(url);
    };

    const handleCancelRace = async () => {
      await setModalCancel("");
      await setModalCancel(<CancelRace setModalCancel={setModalCancel} />);
    };

    const handleVisibleDetails = async () => {
      setDropDownDetails(!dropDownDetails);
    };

    const handleHelp = () => {
      const url = `https://wa.me/5511978612671`;
      Linking.openURL(url);
    }

    const handleCopy = async (option) => {
      switch (option) {
        case "destination":
          await Clipboard.setStringAsync(destination);
          break;
        case "origin":
          await Clipboard.setStringAsync(origin);
          break;
        default:
          break;
      }
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    };

  return (
    <View style={twrnc`h-full mt-5 gap-8`}>
      {modalCancel}
      <TouchableOpacity
        style={twrnc`items-center flex-row gap-3`}
        onPress={() => handleVisibleDetails()}
      >
        <MaterialIcons name="keyboard-arrow-left" size={27} color="black" />
        <Text style={twrnc`text-2xl font-bold`}> Detalhes do frete </Text>
      </TouchableOpacity>
      <View style={twrnc`gap-8`}>
        <View style={twrnc`gap-1`}>
          <TouchableOpacity
            style={twrnc`flex-row items-end items-center justify-between`}
            onPress={() => handleCopy("origin")}
          >
            <View style={twrnc`flex-row gap-4 items-center`}>
              <Octicons name="location" size={24} color="#FF5F00" />
              <Text style={twrnc`capitalize font-medium w-6/8`}>{origin}</Text>
            </View>
            <Ionicons name="copy-outline" size={20} color="black" />
          </TouchableOpacity>
          <View style={twrnc`rounded-lg ml-2 h-5 w-1 bg-[#FF5F00]`}></View>
          <TouchableOpacity
            style={twrnc`flex-row items-end items-center justify-between`}
            onPress={() => handleCopy("destination")}
          >
            <View style={twrnc`flex-row gap-3 items-center`}>
              <Feather name="flag" size={24} color="#FF5F00" />
              <Text style={twrnc`capitalize font-medium w-6/8`}>
                {destination}
              </Text>
            </View>
            <Ionicons name="copy-outline" size={20} color="black" />
          </TouchableOpacity>
          {copied && (
            <Text style={twrnc`text-xs font-medium text-green-600`}>
              Copiado com sucesso!
            </Text>
          )}
        </View>
        <View style={twrnc`flex-row gap-3 items-center`}>
          <AntDesign
            name="user"
            size={24}
            color="black"
            style={twrnc`text-neutral-500`}
          />
          <Text style={twrnc`text-neutral-500 font-medium`}> {name} </Text>
        </View>
        <TouchableOpacity
          style={twrnc`flex-row items-end items-center justify-between`}
          onPress={() => handlePhone(phone)}
        >
          <View style={twrnc`flex-row gap-3 items-center`}>
            <AntDesign name="phone" size={24} style={twrnc`text-neutral-500`} />
            <Text style={twrnc`font-medium text-neutral-500`}>
              {Mask("phone", phone)}
            </Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={twrnc`flex-row items-end items-center justify-between`}
          onPress={() => handleHelp()}
        >
          <View style={twrnc`flex-row gap-3 items-center`}>
            <AntDesign name="customerservice" size={24} color="#FF5F00" />
            <Text style={twrnc`font-medium text-[#FF5F00]`}> Ajuda </Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
        </TouchableOpacity>
        <View style={twrnc`flex-row gap-3 items-center`}>
          <Text style={twrnc`text-base font-bold text-green-600`}>
            +R$ {price} reais
          </Text>
        </View>
      </View>
      <View style={twrnc`flex-row items-center gap-2`}>
        <MaterialCommunityIcons
          name="information-outline"
          size={24}
          color="#eab308"
        />
        <View>
          <Text style={twrnc`text-xs p-5`}>
            Caso você cancelar o frete será cobrado um valor significativo de
            <Text style={twrnc`font-bold text-[#eab308]`}> R$5 reais </Text>,
            evite cancelar seus fretes, contamos com você!
          </Text>
        </View>
      </View>
      <View style={twrnc`gap-3 mb-20`}>
        <Button handle={handleCancelRace} background={"bg-[#d4d4d4]"}>
          <View style={twrnc`py-2`}>
            <Text style={twrnc`text-lg font-bold text-white`}>
              Cancelar frete
            </Text>
          </View>
        </Button>
      </View>
    </View>
  );
}
