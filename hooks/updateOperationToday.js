import axios from "axios";
export default async function UpdateOperationToday(id, params){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment
    try{
        const  response = await axios.patch(`${URL}operation-today/${id}`, params);
        return response.data;
    }catch(e){
        console.log(e)
    }
}