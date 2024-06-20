import axios from "axios";
import AllStorage from "./findAllStorage";
export default async function FindAllHistory(){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment
    const storage = await AllStorage();
    const driverId = await Number(storage.uuid)
    try{
        const res = await axios.get(`${URL}race/history/delivery/${driverId}`)
        return res.data
    }catch(e){
        console.log(e)
    }

}