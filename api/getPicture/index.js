import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default async function GetPicture(picture, am = null, id = null,){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://10.253.252.115:8080/'
    const URL = URLproduction
    let img = picture
    let pictureInfo = []
    try{

        if (am === null) {
            am = await AsyncStorage.getItem('am');
        }
        if (id === null) {
            id = await AsyncStorage.getItem('uuid');
        }

        const pathPicture = await axios.get(`${URL}upload-bucket/${id}/${am}/${img}`);
        await pictureInfo.push(pathPicture.data.buffer)
        await pictureInfo.push(pathPicture.data.type)
        return pictureInfo
    }catch(err){
        console.log(err)
    }
}