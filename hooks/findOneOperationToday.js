import axios from "axios";
import AllStorage from "./findAllStorage";
export default async function findOneOperationToday(){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.1.5:8080/'
    const URL = URLdevelopment
    const storage = await AllStorage()
    try{
        const response = await axios.get(`${URL}operation-today/${storage.uuid}`);
        return response.data;
    }catch(e){
        console.log(e)
    }
}