import axios from "axios";
import AllStorage from "./findAllStorage";
export default async function FindWallet(){
    const storage = await AllStorage();
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://10.253.252.115:8080/'
    const URL = URLproduction

    try{
        const res = await axios.get(`${URL}payment/wallet/${storage.striper}`)
        return res.data
    }catch(e){
        console.log(e)
    }

}