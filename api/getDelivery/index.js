import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
export default async function GetDelivery(am = null, id = null){
       const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
       const URLdevelopment = 'http://192.168.0.35:8080/'
       const URL = URLdevelopment

       if(am == null && id ==null){
              am   = am
              uuid = id
       }else{
              am   = await AsyncStorage.getItem('am');
              uuid = await AsyncStorage.getItem('uuid');
       }
       try{
        const res = await axios.get(`${URL}${am}/${uuid}`);
        return res.data
       }catch(err){
        console.log(err)
       }
}