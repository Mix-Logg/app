import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default async function verifyStatus(){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLproduction
    
    const am = await AsyncStorage.getItem('am');
    const uuid = await AsyncStorage.getItem('uuid');
    const res   = await axios.get(`${URL}avalid-photo/${uuid}/${am}`)
    // const res   = await axios.get(`${URL}avalid-photo/9/driver`)
    let photo   = res.data.find(item => item.photo === 'photo') 
    let cnh     = res.data.find(item => item.photo === 'cnh') 
    let cpf     = res.data.find(item => item.photo === 'cpf') 
    let address = res.data.find(item => item.photo === 'address')
    let antt    = res.data.find(item => item.photo === 'antt') 
    let clv     = res.data.find(item => item.photo === 'clv')
    let addressOwner = res.data.find(item => item.photo === 'addressOwner')  
    let cpfOwner = res.data.find(item => item.photo === 'cpfOwner')  
    let cnpj     = res.data.find(item => item.photo === 'cnpj') 
    let legal    = res.data.find(item => item.photo === 'legal') 
    const pictures = {

    }
    if(photo != undefined){
        console.log(photo.avalid)
        if(photo.valid == 1){
            pictures['photo'] = true;
        }else{
            pictures['photo'] = false;
        }
    }else{
        pictures['photo'] = null;
    }
    if(cnh != undefined){
        if(cnh.valid == 1){
            pictures['cnh'] = true;
        }else{
            pictures['cnh'] = false;
        }
    }else{
        pictures['cnh'] = null;
    }
    if(cpf != undefined){
        if(cpf.valid == 1){
            pictures['cpf'] = true;
        }else{
            pictures['cpf'] = false;
        }
    }else{
        pictures['cpf'] = null;
    }
    if(address != undefined){
        if(address.valid == 1){
            pictures['address'] = true;
        }else{
            pictures['address'] = false;
        }
    }else{
        pictures['address'] = null;
    }
    if(antt != undefined){
        if(antt.valid == 1){
            pictures['antt'] = true;
        }else{
            pictures['antt'] = false;
        }
    }else{
        pictures['antt'] = null;
    }
    if(clv != undefined){
        if(clv.valid == 1){
            pictures['clv'] = true;
        }else{
            pictures['clv'] = false;
        }
    }else{
        pictures['clv'] = null;
    }
    if(cnpj != undefined){
        if(cnpj.valid == 1){
            pictures['cnpj'] = true;
        }else{
            pictures['cnpj'] = false;
        }
    }else{
        pictures['cnpj'] = null;
    }
    if(addressOwner != undefined){
        if(addressOwner.valid == 1){
            pictures['addressOwner'] = true;
        }else{
            pictures['addressOwner'] = false;
        }
    }else{
        pictures['addressOwner'] = null;
    }
    if(cpfOwner != undefined){
        if(cpfOwner.valid == 1){
            pictures['cpfOwner'] = true;
        }else{
            pictures['cpfOwner'] = false;
        }
    }else{
        pictures['cpfOwner'] = null;
    }
    if(legal != undefined){
        if(legal.valid == 1){
            pictures['legal'] = true;
        }else{
            pictures['legal'] = false;
        }
    }else{
        pictures['legal'] = null;
    }
    // console.log(pictures)
    return pictures
}