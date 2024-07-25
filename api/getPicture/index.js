import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default async function GetPicture(picture, am = null, id = null,){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment
    let img = picture
    let pictureInfo = []
    try{

        if (am === null) {
            am = await AsyncStorage.getItem('am');
        }
        if (id === null) {
            console.log('é null ')
            id = await AsyncStorage.getItem('uuid');
        }

        const pathPicture = await axios.get(`${URL}upload-bucket/${uuid}/${am}/${img}`);
        await pictureInfo.push(pathPicture.data.buffer)
        await pictureInfo.push(pathPicture.data.type)
        return pictureInfo
    }catch(err){
        console.log(err)
    }
}