import axios from "axios";
import AllStorage from "./findAllStorage";
export default async function RegisterWallet(){
    const storage = await AllStorage();
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://10.253.252.115:8080/'
    const URL = URLproduction

    const wallet = {
        idDelivery : parseInt(storage.uuid),
        am         : storage.am
    }

    try{
        const res = await axios.post(`${URL}cel-cash/wallet`, wallet)
        return res.data
    }catch(e){
        console.log(e)
    }

}