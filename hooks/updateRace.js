import axios from "axios";

export default async function updateRace(id, params){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.1.10:8080/'
    const URL = URLproduction
    try{
        const res = await axios.patch(`${URL}race/${id}`, params)
        return res.data
    }catch(e){
        console.log(e)
    }
}