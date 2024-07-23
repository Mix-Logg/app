import axios from "axios";

export default async function verifyCpf(am, cpf){ 
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment

    const params = {
        cpf:cpf
    }
    const res = await axios.post(`${URL}${am}/verifyCpf`, params)
    return res.data;
}