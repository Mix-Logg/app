import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default async function GetPicture(picture){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.1.10:8080/'
    const URL = URLproduction
    let img = picture
    let pictureInfo = []
    try{
        const am = await AsyncStorage.getItem('am');
        const uuid = await AsyncStorage.getItem('uuid');
        const pathPicture = await axios.get(`${URL}upload-bucket/${uuid}/${am}/${img}`);
        await pictureInfo.push(pathPicture.data.buffer)
        await pictureInfo.push(pathPicture.data.type)
        return pictureInfo
    }catch(err){
        console.log(err)
    }
}