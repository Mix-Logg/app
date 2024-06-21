import axios from "axios";


export default async function findAllRace(){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.1.10:8080/'
    const URL = URLproduction
    const res = await axios.get(`${URL}race`)
    
    return res.data
}