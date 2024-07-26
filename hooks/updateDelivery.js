import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default async function UpdateUser(params){ 
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.1.5:8080/'
    const URL = URLproduction

    const am = await AsyncStorage.getItem('am');
    const uuid = await AsyncStorage.getItem('uuid');

   try{
        const res = await axios.patch(`${URL}${am}/${uuid}`, params)
        return res.data;
   }catch(err){
        console.log(err)
   }
   
}