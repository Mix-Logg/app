import axios from "axios";

export default async function updateRace(id, params){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://10.253.252.115:8080/'
    const URL = URLproduction
    try{
        const res = await axios.patch(`${URL}race/${id}`, params)
        return res.data
    }catch(e){
        console.log(e)
    }
}