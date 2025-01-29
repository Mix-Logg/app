import axios from "axios";

export default async function verifyCpf(am, cpf){ 
    try{
        const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
        const URLdevelopment = 'http://10.253.252.115:8080/'
        const URL = URLproduction
    
        const params = {
            cpf:cpf
        }
        const res = await axios.post(`${URL}${am}/verifyCpf`, params)
        return res.data;
    }catch(err){
        console.log(err)
    }
}