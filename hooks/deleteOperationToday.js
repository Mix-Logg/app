import axios from "axios";
export default async function DeleteOperationToday(id){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment
    try{
        const  response = await axios.delete(`${URL}operation-today/${id}`);
        return response.data;
    }catch(e){
        console.log(e)
    }
}