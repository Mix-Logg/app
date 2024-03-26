import axios from "axios";

export default async function UpdateUser(id,password){ 
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLproduction

    const params = { 
        password : password
    }

    console.log(`${URL}user/${id}`)
   try{
    const res = await axios.patch(`${URL}user/${id}`, params)
    return res.data;
   }catch(err){
    console.log(err)
   }
   
}