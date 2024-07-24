import axios from "axios";

export default async function FindUserCpf(cpf){

    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment

    const res = await axios.get(`${URL}user/one/${cpf}`)
    return res.data;
}