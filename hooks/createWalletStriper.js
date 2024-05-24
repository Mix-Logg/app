import axios from "axios";

export default async function RegisterWallet(params){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    URL = URLproduction

    const res = await axios.post(`${URL}payment`, params)
    return res.data
}