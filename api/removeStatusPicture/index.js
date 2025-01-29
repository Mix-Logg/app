import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function removeStatus(picture){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://10.253.252.115:8080/'
    const URL = URLproduction
    const uuid = await AsyncStorage.getItem('uuid');
    const id = await parseInt(uuid);
    const am = await AsyncStorage.getItem('am');
    
    try {
        const res = await axios.delete(`${URL}avalid-photo/${id}/${am}/${picture}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}