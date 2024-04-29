import axios from "axios";

export default async function CreatePerson(){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment
    
    try{
        const res = await axios.post(`${URL}payment/person`, params)
        return res.data
    }catch(e){
        console.log(e)
    }
}