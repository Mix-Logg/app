import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import findOneRace from "../../hooks/findOneRace";
import twrnc from "twrnc";
import Modal from "../modalBottom";
import { useEffect, useState } from "react";
import findClient from "../../hooks/findClient";
import InfoWorkDetails from "./details";
import InfoWorkHome from "./home";
export default function InfoWork({code, setCode, setInfo }) {
  const [dropDownDetails, setDropDownDetails] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [origin, setOrigin] = useState(false);
  const [destination, setDestination] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      const raceId = await AsyncStorage.getItem("raceId");
      const raceInfo = await findOneRace(raceId);
      const client = await findClient(raceInfo.idClient);
      setName(client.name);
      setPhone(client.phone);
      setPrice(raceInfo.value);
      setOrigin(raceInfo.initial);
      setDestination(raceInfo.finish);
    };
    fetchData();
  }, []);


  return (
    <Modal>
      <ScrollView>
        {destination ? (
          <View>
            {!dropDownDetails ? (
              <InfoWorkHome setInfo={setInfo} setDropDownDetails={setDropDownDetails} dropDownDetails={dropDownDetails} code={code} setCode={setCode} />
            ) : (
              <InfoWorkDetails setDropDownDetails={setDropDownDetails} dropDownDetails={dropDownDetails} name={name} phone={phone} price={price} origin={origin} destination={destination} />
            )}
          </View>
        ) : (
          <View style={twrnc`h-full mt-5 p-10 items-center gap-2`}>
            <Text className="font-bold text-primary" style={twrnc`text-2xl`}>Carregando informações</Text>
            <ActivityIndicator size="large" color="#FF5F00" />
          </View>
        )}
      </ScrollView>
    </Modal>
  );
}
