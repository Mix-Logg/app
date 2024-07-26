import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default async function deleteFile(filename){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.1.5:8080/'
    const URL = URLproduction

    const uuid = await AsyncStorage.getItem('uuid');
    const am = await AsyncStorage.getItem('am');
     deleteParms = await {
        id : uuid,
        am : am,
        file: filename,
    }
    try{
        const response = await axios.post(`${URL}upload-bucket/delete`, deleteParms);
        return response.data
    }catch(err){
        console.error(err);
    }
}