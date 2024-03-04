import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default async function GetVehicle(){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment

    const uuid = await AsyncStorage.getItem('uuid');
    try {
        const response = await axios.get(`${URL}vehicle/${uuid}/`);
        return response.data
      } catch (err) {
        console.error(err);
      }
}