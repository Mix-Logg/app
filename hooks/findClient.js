import axios from "axios";

export default async function findClient(id){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment

    try{
        const res = await axios.get(`${URL}client/id/${id}`)
        return res.data
    }catch(e){
        console.log(e)
    }
}