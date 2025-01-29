import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function findUser(){ 
    const am = await AsyncStorage.getItem('am');
    const uuid = await AsyncStorage.getItem('uuid');
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://10.253.252.115:8080/'
    const URL = URLproduction

    const res = await axios.get(`${URL}user/${uuid}/${am}`)
    return res.data;
}