import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function verifyPaste(){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    URL = URLproduction
    const am = await AsyncStorage.getItem('am');
    const uuid = await AsyncStorage.getItem('uuid');
    try {
        const response = await axios.get(`${URL}upload-bucket/${uuid}/${am}`);
        return response.data
    } catch (err) {
        console.error(err);
        throw err;
    }
}