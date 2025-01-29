import axios from "axios";
export default async function UpdateUser(id, params, ){ 
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://10.253.252.115:8080/'
    const URL = URLproduction

   try{
    const res = await axios.patch(`${URL}user/${id}`, params)
    return res.data;
   }catch(err){
    console.log(err)
   }
   
}