import axios from "axios";


export default async function findOneRace(id){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.1.5:8080/'

    const URL = URLdevelopment
    const res = await axios.get(`${URL}race/${id}`)
    return res.data
}