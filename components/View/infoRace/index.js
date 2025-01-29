import FixBar from "../../fixBar";
import twrnc from "twrnc";
import { ScrollView, View, Text, Linking, Pressable, Image, ActivityIndicator } from "react-native";
import { MaterialIcons, Feather , AntDesign, SimpleLineIcons , Octicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import Button from "../../../util/button";
import { useEffect, useState } from "react";
import { io } from 'socket.io-client';
import findOneRace from "../../../hooks/findOneRace";
import Mask from "../../../hooks/mask";
import ModalMid from "../../modalMid";
import Fly from '../../../img/uniqueIcons/fly.png'
import FindClient from "../../../hooks/findClient";
import GetVehicle from "../../../api/getVehicle";
import AllStorage from "../../../hooks/findAllStorage";
import updateRace from "../../../hooks/updateRace";
import Wating from "../../wating";
export default function InfoRace({navigation, code, setCode}){
    const [socket,setSocket] = useState(null)
    const [modal,setModal] = useState(null)
    const [price,setPrice] = useState(null)
    const [initial,setInitial] = useState(null)
    const [finish,setFinish] = useState(null)
    const [km,setKm] = useState(null)
    const [clientName,setClientName] = useState('carregando...')
    const [ioId, setIoId] = useState(null)
    const [plate, setPlate] = useState(null)
    const [idDriver, setIdDriver] = useState(null)
    const [idRace, setIdRace] = useState(null)
    const [loader, setLoader] = useState(false)
    const [codeInitial, setCodeInitial] = useState(false)
    const [codeFinish, setCodeFinish] = useState(false)
    const [updateRaceParams, setUpdateRaceParams] = useState('')
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://10.253.252.115:8080/'
    const URL = URLproduction
    const route = useRoute();

    useEffect(()=>{
        const fetchData = async () => {
            const socketIO = await io(URL);
            setSocket(socketIO);
        }
        fetchData()
    },[])

    useEffect(()=>{
        const dataUseEffect = async () => {
            const storage = await AllStorage(); 
            const client = await FindClient(route.params.idClient);
            const vehicle = await GetVehicle();
            const race = await findOneRace(route.params.id);
            const updatRace = {
                id: route.params.id,
                isVisible: "0"
            }
            route.params.name = client.name;
            route.params.phone = client.phone;
            setUpdateRaceParams(updatRace)
            setCodeInitial(race.codeInitial)
            setCodeFinish(race.codeFinish)
            setIdRace(route.params.id)
            setIdDriver(storage.uuid)
            setPlate(vehicle.plate)
            setClientName(client.name)
            setPrice(route.params.price)
            setInitial(race.initial)
            setFinish(race.finish)
            setKm(route.params.km)
        }
        dataUseEffect()
    },[])

    
    const handleRace = async () => {
        try{
            setLoader(true)
            const infoRace = await findOneRace(route.params.id);
            if(infoRace.isVisible == '0' || infoRace.delete_at != null){
                await setModal('')
                moodalRedirect()
                return 
            }
            socket.emit('updateStatus', updateRaceParams);
            const race = await findOneRace(route.params.id);
            const message = {
                message:'Start Race'
            }
            socket.emit('talk', race.idClientIo, message);
            const paramsUpdateRace = {
                plate:plate,
                idDriver:Number(idDriver)
            }
            await updateRace(idRace, paramsUpdateRace)
            AsyncStorage.setItem('raceId', route.params.id.toString())
            AsyncStorage.setItem('codeInitial', codeInitial)
            AsyncStorage.setItem('codeFinish', codeFinish)
            navigation.navigate('Work');
        }catch(e){
            console.log(e)
        }finally{
            setLoader(false)
        }
        
    }

    const handleBack = async () => {
        navigation.navigate('Race')
    }

    const moodalRedirect = () => {
        setModal(
        <ModalMid>
            <View style={twrnc`w-full bg-[#FF5F00] p-1 rounded-lg`}>
                <View style={twrnc`flex-row px-5 bg-white rounded-lg`}>
                    <View style={twrnc`w-1/2 py-3 gap-3`}>
                        <View>
                            <Text style={twrnc`text-lg font-bold text-[#FF5F00]`}>OPS!</Text>
                        </View>
                        <View style={twrnc`gap-5`}>
                            <Text style={twrnc`text-neutral-500`}>Alguém já iniciou esse frete</Text>
                            <Text style={twrnc`text-base font-medium text-neutral-500`}>Não desanime, precisamos de você</Text>
                        </View>
                    </View>
                    <View style={twrnc`w-1/2 items-center justify-center`}>
                        <View style={twrnc`h-50 w-50`}>
                            <Image 
                                style={twrnc`h-full w-full`}
                                source={Fly}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                </View>
                <View style={twrnc`bg-[#FF5F00] rounded`}>
                    <Button handle={handleBack}>
                        <View style={twrnc`bg-[#FF5F00] w-full justify-center items-center`}>
                            <Text style={twrnc`text-base font-bold text-white`}>Continuar voando</Text>
                        </View>
                    </Button>
                </View>
            </View>
        </ModalMid>
        )
    }

    return(
        <>
            {modal}
            <FixBar navigation={navigation} opition={'infoRace'} />
            { km ?
                <ScrollView style={twrnc`bg-white h-full`}>
                <View style={twrnc`px-5 py-5 gap-2`}>
                    <Text style={twrnc`text-2xl font-bold text-[#FF5F00]`}>Informações do frete</Text>
                </View>
                <View style={twrnc`mt-10 px-5`}>
                    <View style={twrnc` px-2 py-3 gap-3`}>
                        <View style={twrnc`flex-row items-center gap-2 px-2 border-b py-3 border-[#e5e5e5]`}>
                            <AntDesign name="user" size={23} color="#FF5F00" /> 
                            <Text style={twrnc`text-[#737373] font-medium`}>{clientName}</Text>
                        </View>
                        <View style={twrnc`gap-2 px-2 border-b py-3 border-[#e5e5e5]`}>
                            <View style={twrnc`flex-row gap-2 w-5/6 items-center`}> 
                                <Octicons name="location" size={23} color="#FF5F00" />
                                <Text style={twrnc`text-[#737373] `}>{initial}</Text>
                            </View>
                            <View style={twrnc`bg-[#FF5F00] rounded-full h-5 w-1 ml-2`}></View>
                            <View style={twrnc`flex-row gap-2 mx-1 w-5/6 items-center`}>
                                <AntDesign name="flag" size={23} color="#FF5F00" />
                                <Text style={twrnc`text-[#737373] `}>{finish}</Text>
                            </View>
                        </View>
                        <View style={twrnc`flex-row items-center gap-2 px-2 border-b py-3 border-[#e5e5e5]`}>
                            <Feather name="package" size={23} color="#FF5F00" />
                            <Text style={twrnc`text-[#737373]`}>O frete possui {km} km</Text>
                        </View>
                        <View style={twrnc`flex-row items-center gap-2 px-2 border-b py-3 border-[#e5e5e5]`}>
                            <Text style={twrnc`text-green-600 font-bold text-base`}>{Mask('amount',price)} reais</Text>
                        </View>
                    </View>
                </View>
                <View style={twrnc`mt-20 px-10`}>
                    <View style={twrnc``}> 
                        <Button background={`bg-[#FF5F00] ${loader ? 'opacity-70' : '' }`} handle={handleRace}> 
                           { loader ?
                            <ActivityIndicator size="small" color="white" style={twrnc`py-3`} />
                            :
                            <Text style={twrnc`text-lg text-white font-bold py-2`}>Inciar frete </Text>
                            }
                        </Button>
                    </View>
                </View>
                </ScrollView>
                :
                <Wating/>
            }
        </>
    )
}