import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default async function GetDelivery(){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.45:8080/'
    const URL = URLdevelopment
    try{
        const am = await AsyncStorage.getItem('am');
        const cpf = await AsyncStorage.getItem('cpf', cpf);
        const delivery = {
            cpf:cpf
        }
        const res = await axios.post(`${URL}${am}/getUser`, delivery)
        return res.data
    }catch(err){
        console.log(err)
    }
}