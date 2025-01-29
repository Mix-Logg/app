import axios from "axios";


export default async function findOneRace(id){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://10.253.252.115:8080/'

    const URL = URLproduction
    const res = await axios.get(`${URL}race/${id}`)
    return res.data
}