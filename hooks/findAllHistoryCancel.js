import axios from "axios"
import AllStorage from "./findAllStorage"
export default async function FindAllHistoryCancel(){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://10.253.252.115:8080/'
    const URL = URLproduction
    const storage  = await AllStorage();
    try{
        const response  = await axios.get(`${URL}race-driver-cancel/${storage.uuid}/${storage.am}`)
        return response.data
    }catch(e){
        console.log(e)
    }
}