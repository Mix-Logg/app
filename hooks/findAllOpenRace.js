import axios from "axios";
import GetVehicle from "../api/getVehicle";

export default async function findAllRaceOpen(){
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment
    const vehicle = await GetVehicle();
    const typeVehicle = await vehicle.type

    const res = await axios.get(`${URL}race/open/${typeVehicle}`)
    return res.data
}