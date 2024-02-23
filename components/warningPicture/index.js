import { useState, useEffect } from "react";
import twrnc from "twrnc";
import { View, ScrollView, Text, RefreshControl, Pressable, SafeAreaView,ActivityIndicator, Button  } from "react-native";
import verifyStatus from "../../api/verifyPicture";
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetVehicle from "../../api/getVehicle";

export default async function warningPicture(){
    const info = await searchInfo()
    const analyze = Object.values(info).find(value => value === null);
    const reprove = Object.values(info).find(value => value === false);
    if(reprove === undefined && analyze === undefined){
        return {'picture':'success','txt':'Fotos aprovada!'}
    }else if(reprove != undefined){
        return {'picture':'reprove','txt':'Foto reprovada, clique no botão abaixo pra reenviar.'}
    }else{
        return {'picture':'analyze','txt':'Fotos em análise'}
    }
}

 const searchInfo = async () => {
    const res = await verifyStatus()
    const am = await AsyncStorage.getItem('am');
    const pictures = {
    }
    if(am === 'driver' ){
        const vehicle = await GetVehicle();
        pictures['cpf'] = res.cpf;
        pictures['address'] = res.address;
        pictures['photo'] = res.photo;
        pictures['cnh'] = res.cnh;
        pictures['antt'] = res.antt;
        pictures['clv'] = res.clv;
        if(vehicle.cadastre === 'juridica'){
            pictures['legal'] = res.legal;
            pictures['cnpj'] = res.cnpj;
            return pictures
        }
        if(vehicle.owner === "outraPessoa" && vehicle.cadastre === "fisica"){
            pictures['cpfOwner'] = res.legal;
            pictures['addressOwner'] = res.cnpj;
            return pictures
            
        }
    }
    if(am === 'auxiliary'){
        pictures['cpf'] = res.cpf;
        pictures['address'] = res.address;
        pictures['photo'] = res.photo;
        const paste = await verifyPaste()
        if( paste.length > 3 ){
                    pictures['cnh'] = res.cnh;
        }
        return pictures
    }
}


