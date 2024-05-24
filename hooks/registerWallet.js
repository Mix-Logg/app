import axios from "axios";
import AllStorage from "./findAllStorage";
export default async function RegisterWallet(){
    const storage = await AllStorage();
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    URL = URLproduction

    try{
        const res = await axios.get(`${URL}payment/register/${storage.striper}`)
        return res.data
    }catch(e){
        console.log(e)
    }

}