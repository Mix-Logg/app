import axios from "axios";


export default async function findAllRace(){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment
    const res = await axios.get(`${URL}race`)
    
    return res.data
}