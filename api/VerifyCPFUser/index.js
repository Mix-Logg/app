import axios from "axios";

export default async function VerifyCPFUser(cpf){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://10.253.252.115:8080/'
    const URL = URLproduction
    
    try{
        const res = await axios.get(`${URL}user/${cpf}`)
        return res.data
    }catch(erro){
        console.log(erro)
    }
}