import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default async function GetVehicle(){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://10.253.252.115:8080/'
    const URL = URLproduction

    let uuid = await AsyncStorage.getItem('uuid');
    const am = await AsyncStorage.getItem('am');
    uuid = parseInt(uuid)
    
    try {
        const response = await axios.get(`${URL}vehicle/${uuid}/${am}`);
        return response.data
      } catch (err) {
        console.error(err);
      }
}