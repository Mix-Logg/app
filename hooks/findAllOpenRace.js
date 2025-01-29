import axios from "axios";
import GetVehicle from "../api/getVehicle";

export default async function findAllRaceOpen(){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://10.253.252.115:8080/'
    const URL = URLproduction
    const vehicle = await GetVehicle();
    const typeVehicle = await vehicle.type

    const res = await axios.get(`${URL}race/open/${typeVehicle}`)
    return res.data
}