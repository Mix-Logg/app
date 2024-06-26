import axios from "axios";
import AllStorage from "./findAllStorage";
export default async function CreatePayment(params_retrieve){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.1.10:8080/'
    const URL = URLproduction

    const storge = await AllStorage();
    params_retrieve.am   = storge.am 
    params_retrieve.uuid = storge.uuid 
    try{
        const response = await axios.post(`${URL}cel-cash/advance`, params_retrieve);
        return response.data;
    }catch(e){
        console.log(e)
    }
}