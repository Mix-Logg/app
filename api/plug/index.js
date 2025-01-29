import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default async function Plug(){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://10.253.252.115:8080/'
    const URL = URLproduction
    const uuid = await AsyncStorage.getItem('uuid');
    const am = await AsyncStorage.getItem('am');

    try {
        const response = await axios.get(`${URL}record-plug/${uuid}/${am}`);
        return response.data
    } catch (error) {
        
    }
}