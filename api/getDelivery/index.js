import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function GetDelivery(){
       const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
       const URLdevelopment = 'http://192.168.0.35:8080/'
       const URL = URLdevelopment
       const am = await AsyncStorage.getItem('am');
       const uuid = await AsyncStorage.getItem('uuid');
       try{
        const res = await axios.get(`${URL}${am}/${uuid}`);
        return res.data
       }catch(err){
        console.log(err)
       }
}