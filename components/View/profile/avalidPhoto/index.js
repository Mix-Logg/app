import React from "react";
import twrnc from "twrnc";
import { View, ScrollView, Text, RefreshControl, Pressable, SafeAreaView,ActivityIndicator, Button  } from "react-native";
import Modal from "react-native-modal";
import verifyStatus from '../../../../api/verifyPicture'
import FixBar from "../../../fixBar";
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetVehicle from "../../../../api/getVehicle";
import verifyPaste from "../../../../api/verifyPaste";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import SelectOpition from "../../../../function/getPathPicture";
import uploadFile from "../../../../api/upLoadFiles";
import deleteFile from "../../../../api/removeUploadFiles";
import removeStatus from "../../../../api/removeStatusPicture";
export default function AvalidPhoto({ navigation }) {
    const [am,setAm] = useState('')
    const [ownerVehicle,setOwnerVehicle] = useState('')
    const [cadastreVehicle,setCadastreVehicle] = useState('')
    const [haveCNH, setHaveCNH] = useState(true);
    const [cpf, setCpf] = useState(null);
    const [address, setAddress] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [cnh, setCnh] = useState(null);
    const [antt, setAntt] = useState(null);
    const [clv, setClv] = useState(null);
    const [cpfOwner, setCpfOwner] = useState(null);
    const [addressOwner, setAddressOwner] = useState(null);
    const [legal, setLegal] = useState(null);
    const [cnpj, setCnpj] = useState(null);
    const [modal, setModal] = useState(false);
    const [picture, setPicture] = useState(null); 
    const [pictureAvalid, setPictureAvalid] = useState(null);
    const [refreshing, setRefreshing] = useState(false); 
    const [wating, setWating] = useState(false); 
    const [sendPicture, setSendPicture] = useState(false); 

    const handleModal = (picture, pictureAvalid) => {
        if(pictureAvalid || pictureAvalid == null){
            return
        }
        if(!modal){
            setModal(true)
            setPicture(picture)
            setPictureAvalid(pictureAvalid)
        }
    }

    const closeModal = () => {
        setModal(false)
        setSendPicture(false)
        setWating(false)
    }

    const handleSelectPicture = async (option) => {
        let picturesName = {
            cpf:'cpfImage',
            address:'addressImage',
            photo:'selfieImage',
            cnh:'cnhImage',
            antt:'anttImage',
            clv:'clvImage',
            cpfOwner:'cpfDonoImage',
            addressOwner:'residenciaDono',
            legal:'estadualImage',
            cnpj:'cnpjImage',
        }
        const path = await SelectOpition(option)
        switch (picture) {
            case 'cpf':
                setWating(true)
                const cpfDelete = await deleteFile('cpfImage')
                if(cpfDelete === 200){
                    const respo = await uploadFile(path, 'cpfImage', 'physical' )
                    if(respo){
                        const res = await removeStatus('cpf')
                        if(res === 200){
                            setCpf(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            case 'address':
                setWating(true)
                const addressDelete = await deleteFile('addressImage')
                if(addressDelete === 200){
                    const respo = await uploadFile(path, 'addressImage', 'physical' )
                    if(respo){
                        const res = await removeStatus('address')
                        if(res === 200){
                            setAddress(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            case 'photo':
                setWating(true)
                const selfieDelete = await deleteFile('selfieImage')
                if(selfieDelete === 200){
                    const respo = await uploadFile(path, 'selfieImage', 'physical' )
                    if(respo){
                        const res = await removeStatus('photo')
                        if(res === 200){
                            setPhoto(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            case 'cnh':
                setWating(true)
                const respo = await deleteFile('cnhImage')
                if(respo === 200){
                    const respo = await uploadFile(path, 'cnhImage', 'physical' )
                    if(respo){
                        const res = await removeStatus('cnh')
                        if(res === 200){
                            setCnh(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                
                break;
            case 'antt':
                setWating(true)
                const anttDelete = await deleteFile('anttImage')
                if(anttDelete === 200){
                    const respo = await uploadFile(path, 'anttImage', 'vehicle' )
                    if(respo){
                        const res = await removeStatus('antt')
                        if(res === 200){
                            setAntt(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            case 'clv':
                setWating(true)
                const clvDelete = await deleteFile('clvImage')
                if(clvDelete === 200){
                    const respo = await uploadFile(path, 'clvImage', 'vehicle' )
                    if(respo){
                        const res = await removeStatus('clv')
                        if(res === 200){
                            setClv(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            case 'cpfOwner':
                setWating(true)
                const cpfOwnerDelete = await deleteFile('cpfDonoImage')
                if(cpfOwnerDelete === 200){
                    const respo = await uploadFile(path, 'cpfDonoImage', 'vehicle' )
                    if(respo){
                        const res = await removeStatus('cpfOwner')
                        if(res === 200){
                            setCpfOwner(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            case 'addressOwner':
                setWating(true)
                const addressOwnerDelete = await deleteFile('residenciaDono')
                if(addressOwnerDelete === 200){
                    const respo = await uploadFile(path, 'residenciaDono', 'vehicle' )
                    if(respo){
                        const res = await removeStatus('addressOwner')
                        if(res === 200){
                            setAddressOwner(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            case 'legal':
                setWating(true)
                const legalDelete = await deleteFile('estadualImage')
                if(legalDelete === 200){
                    const respo = await uploadFile(path, 'estadualImage', 'vehicle' )
                    if(respo){
                        const res = await removeStatus('legal')
                        if(res === 200){
                            setLegal(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            case 'cnpj':
                setWating(true)
                const cnpjDelete = await deleteFile('cnpjImage')
                if(cnpjDelete === 200){
                    const respo = await uploadFile(path, 'cnpjImage', 'vehicle' )
                    if(respo){
                        const res = await removeStatus('cnpj')
                        if(res === 200){
                            setCnpj(null)
                            setSendPicture(true)
                        }else{
                            console.log('erro')
                        }
                    }else{
                        console.log('erro')
                    }
                }else{
                    console.log('erro')
                }
                break;
            default:
                break;
        }
    }

    const onRefresh = () => {
        setRefreshing(true);
    };

    useEffect(() => {
        dataEffect = async () => {
            const am = await AsyncStorage.getItem('am');
            setAm(am)
            if(am === 'driver' ){
                const res = await GetVehicle();
                await setOwnerVehicle(res.owner)
                await setCadastreVehicle(res.cadastre)
            }
            if(am === 'auxiliary'){
                setHaveCNH(false)
                const paste = await verifyPaste()
                if( paste.length > 3 ){
                    setHaveCNH(true)
                }
            }
            const res = await verifyStatus()
            setCpf(res.cpf)
            setAddress(res.address)
            setPhoto(res.photo)
            setCnh(res.cnh)
            setAntt(res.antt)
            setClv(res.clv)
            setCpfOwner(res.cpfOwner)
            setAddressOwner(res.addressOwner)
            setLegal(res.legal)
            setCnpj(res.cnpj)

            setRefreshing(false);
            return
        }
        dataEffect()
    }, [refreshing]);

    

  return (
    <SafeAreaView>
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={twrnc`flex h-full items-center gap-10 mb-50 `}>
            <FixBar navigation={navigation} opition={"avalidPhoto"}/>
                <Modal 
                    isVisible={modal} 
                    // onBackdropPress={()=>setAcessModal(!acessModal)}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    animationInTiming={300}
                    animationOutTiming={300}
                >
                    <View style={twrnc`justify-center items-center`}>
                        <View style={twrnc`bg-white rounded-lg w-1/2 h-auto w-auto p-5 justify-center items-center gap-2 bg-white `}>
                            { !wating ?
                            <>
                                <View style={twrnc`flex-col gap-5 justify-center items-center`}>
                                    <Text style={twrnc`font-bold `}>Reenvio de imagem</Text>
                                    <Pressable style={twrnc`flex-row items-center w-50 py-2 px-1 text-center bg-[#FF5F00] rounded`}
                                        onPress={()=>handleSelectPicture('camera')}
                                    >
                                        <MaterialIcons name="photo-camera" size={29} color="white" />
                                        <Text style={[twrnc`text-white font-bold text-lg`, {marginLeft:'20%'}]}>Foto</Text>
                                    </Pressable>
                                    <Pressable style={twrnc`flex-row items-center w-50 py-2 px-1 text-center bg-[#FF5F00] rounded`}
                                        onPress={()=>handleSelectPicture('gallery')}
                                    >
                                        <FontAwesome name="file-picture-o" size={28} color="white" />
                                        <Text style={[twrnc`text-white font-bold text-lg`, {marginLeft:'21%'}]}>Galeria</Text>
                                    </Pressable>
                                    <Pressable style={twrnc`flex-row items-center w-50 py-2 px-1 text-center bg-[#FF5F00] rounded`}
                                        onPress={()=>handleSelectPicture('file')}
                                    >
                                        <AntDesign name="pdffile1" size={28} color="white" />
                                        <Text style={[twrnc`text-white font-bold text-lg`, {marginLeft:'18%'}]}>Documentos</Text>
                                    </Pressable>
                                </View>
                                <View style={twrnc`bg-white mt-2 rounded bg-green-500`} >
                                    <Button
                                        onPress={()=>closeModal()}
                                        title="Fechar"
                                        color="#7b7b7b"
                                    />
                                </View>
                            </>
                            : 
                            <View>
                                { !sendPicture ?
                                <>
                                    <ActivityIndicator size="large" color="#FF5F00" />
                                    <Text style={twrnc`mt-2`}>Enviando Imagem, aguarde</Text>
                                </>
                                :
                                <>
                                    <Text style={twrnc`font-bold`}>Foto enviada com sucesso!</Text>
                                    <View style={twrnc`bg-white py-2 px-8 mt-2 rounded`} >
                                        <Button
                                            onPress={()=>closeModal()}
                                            title="Fechar"
                                            color="#FF5F00"
                                        />
                                    </View>
                                </>
                                }
                            </View>
                            }
                        </View>
                    </View>
                </Modal>
                <View style={twrnc`gap-5 flex flex-row`}>
                <View style={twrnc`flex flex-row gap-1`}>
                    <View style={twrnc`bg-yellow-500 p-3 rounded`}></View>
                    <Text style={twrnc`text-[#7B7B7B]`}>Análise</Text>
                </View>
                <View style={twrnc`flex flex-row gap-1`}>
                    <View style={twrnc`bg-green-500 p-3 rounded`}></View>
                    <Text style={twrnc`text-[#7B7B7B]`}>Aprovado</Text>
                </View>
                <View style={twrnc`flex flex-row gap-1`}>    
                    <View style={twrnc`bg-red-600 p-3 rounded`}></View>
                    <Text style={twrnc`text-[#7B7B7B]`}>Reenviar</Text>
                </View>
                </View>
                <View style={twrnc`w-full justify-center items-center gap-5`}>
                    <Text style={twrnc`font-bold text-lg`}>Documentos</Text>
                    <View style={twrnc`gap-5`}>
                        <View style={twrnc`flex-row gap-5`}>
                            <Pressable style={twrnc` ${cpf === true ? 'bg-green-500' : cpf === false ? 'bg-red-600' : 'bg-yellow-500'} py-5 px-8 rounded-xl justify-center items-center`}
                                onPress={()=>handleModal('cpf',cpf)}
                            >
                                <Text style={twrnc`w-20 text-center text-white font-bold`}>RG</Text>
                            </Pressable>
                            <Pressable style={twrnc` ${address === true ? 'bg-green-500' : address === false ? 'bg-red-600' : 'bg-yellow-500'} py-5 px-8 rounded-xl justify-center items-center`}
                                onPress={()=>handleModal('address', address)}
                            >
                                <Text style={twrnc` w-20 text-center text-white font-bold`}>ENDEREÇO</Text>
                            </Pressable>
                        </View>
                        <View style={twrnc`flex-row gap-5 `}>
                            <Pressable style={twrnc` ${photo === true ? 'bg-green-500' : photo === false ? 'bg-red-600' : 'bg-yellow-500'} py-5 px-8 rounded-lg justify-center items-center`}
                                onPress={()=>handleModal('photo',photo)}
                            >
                                <Text style={twrnc`w-20 text-center text-white font-bold`}>FOTO</Text>
                            </Pressable>
                            <Pressable style={twrnc` ${cnh === true ? 'bg-green-500' : cnh === false ? 'bg-red-600' : 'bg-yellow-500'}  ${haveCNH ? '' : 'hidden'} py-5 px-8 rounded-lg justify-center items-center`}
                                onPress={()=>handleModal('cnh',cnh)}
                            >
                                <Text style={twrnc`w-20 text-center text-white font-bold`}>CNH</Text>
                            </Pressable>
                        </View>
                    </View>
                    { am == 'driver' &&
                    <>
                        <Text style={twrnc`font-bold text-lg`}>Veículo</Text>
                        <View style={twrnc`gap-5`}>
                            <View style={twrnc`flex-row gap-5`}>
                                <Pressable style={twrnc`${antt === true ? 'bg-green-500' : antt === false ? 'bg-red-600' : 'bg-yellow-500'} py-5 px-8 rounded-xl justify-center items-center`}
                                    onPress={()=>handleModal('antt', antt)}
                                >
                                    <Text style={twrnc`w-20 text-center text-white font-bold`}>
                                            ANTT
                                    </Text>
                                </Pressable>
                                <Pressable style={twrnc`${clv === true ? 'bg-green-500' : clv === false ? 'bg-red-600' : 'bg-yellow-500'}  py-5 px-8 rounded-xl justify-center items-center`}
                                    onPress={()=>handleModal('clv', clv)}
                                >
                                    <Text style={twrnc`w-20 text-center text-white font-bold`}>CLV</Text>
                                </Pressable>
                            </View>
                            { ownerVehicle === "outraPessoa" && cadastreVehicle === "fisica" &&( 
                                <View style={twrnc`flex-row gap-5 `}>
                                    <Pressable style={twrnc` ${cpfOwner === true ? 'bg-green-500' : cpfOwner === false ? 'bg-red-600' : 'bg-yellow-500'} py-5 px-8 rounded-lg justify-center items-center`}
                                        onPress={()=>handleModal('cpfOwner', cpfOwner)}
                                    >
                                        <Text style={twrnc`w-20 text-center text-white font-bold`}>CPF DONO</Text>
                                    </Pressable>
                                    <Pressable style={twrnc` ${addressOwner === true ? 'bg-green-500' : addressOwner === false ? 'bg-red-600' : 'bg-yellow-500'} py-5 px-8 rounded-lg justify-center items-center`}
                                        onPress={()=>handleModal('addressOwner',addressOwner)}
                                    >
                                        <Text style={twrnc` w-20 text-center text-white font-bold`}>ENDEREÇO DONO</Text>
                                    </Pressable>
                                </View>
                            )}
                            {cadastreVehicle === "juridica" &&(
                            <View style={twrnc`flex-row gap-5 `}>
                                <Pressable style={twrnc` ${cnpj === true ? 'bg-green-500' : cnpj === false ? 'bg-red-600' : 'bg-yellow-500'} py-5 px-8 rounded-lg justify-center items-center`}
                                    onPress={()=>handleModal('cnpj', cnpj)}
                                >
                                    <Text style={twrnc`w-20 text-center text-white font-bold`}>CNPJ</Text>
                                </Pressable>
                                <Pressable style={twrnc` ${legal === true ? 'bg-green-500' : legal === false ? 'bg-red-600' : 'bg-yellow-500'} py-5 px-8 rounded-lg justify-center items-center`}
                                    onPress={()=>handleModal('legal',legal)}
                                >
                                    <Text style={twrnc`w-20 text-center text-white font-bold`}>Inscrição Estadual</Text>
                                </Pressable>
                            </View>
                            )}
                        </View>
                    </>
                    }
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    
  );
}
