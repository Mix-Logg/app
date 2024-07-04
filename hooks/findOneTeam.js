import AllStorage from "./findAllStorage"
import axios from "axios"
export default async function FindOneTeam(){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLproduction
    const storage = await AllStorage()
    try{
        const res = await axios.get(`${URL}team/operation/${storage.uuid}`)
        return res.data
    }catch(e){
        console.log(e)
    }
}