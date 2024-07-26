import axios from "axios";
import AllStorage from "./findAllStorage";
export default async function findOneOperation(){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.1.5:8080/'
    const URL = URLproduction
    const storage = await AllStorage()
    try{
        const res = await axios.get(`${URL}operation/${storage.uuid}/${storage.am}`)
        return res.data
    }catch(e){
        console.log(e)
    }
}