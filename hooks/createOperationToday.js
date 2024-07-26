import axios from "axios";
export default async function CreateOperationToday(params){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.1.5:8080/'
    const URL = URLproduction

    try{
        const response = await axios.post(`${URL}operation-today`, params);
        return response.data;
    }catch(e){
        console.log(e)
    }
}