import axios from "axios"
import UpFile from "./uploadFile"
export default async function RegisterUser(params){
    const time  = await axios.get('https://worldtimeapi.org/api/timezone/America/Sao_Paulo')
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment

    const am = params.user.am
    const user = {
        uuid: '',
        am: am,
        email:  params.user.email ,
        phone:  params.user.phone , 
        name :  params.user.name , 
        cpf  :  params.user.login,
        create_at : time.data.datetime
    }
    const address = {
        am : am,
        uuid : '',
    }
    try{
        const newCadaster = await axios.post(`${URL}${am}`, user)
        const id = newCadaster.data
        user.uuid = id;
        user.password = params.user.password;
        address.uuid = id;
        await CadasterUser(user);
        await CadasterAddress(address);
        await CadasterImage('human',params.picture.human,id,am)
        if(am != 'auxiliary'){
            const vehicle = {
                am: am,  
                uuid:  id,
                cadastre : params.vehicle.cadaster,
                owner : params.vehicle.owner,
                type : params.vehicle.typeVehicle,
                plate : params.vehicle.plate,
                phoneOwner: params.vehicle.phoneOwner,
                trackerStatus: params.vehicle.tracker.status,
                trackerBrand : params.vehicle.tracker.brand,
                trackerNumber : params.vehicle.tracker.number,
                relationOwner : params.vehicle.relationOwner,
                noStop : params.vehicle.noStop.number,
                noStopStatus : params.vehicle.noStop.status,
            }
            await CadasterVehicle(vehicle);
            await CadasterImage('vehicle',params.picture.vehicle,id,am)
        }
        return 200;
    }catch(err){
        console.log(err)
        return 500
    }
    
}

async function CadasterAddress(address) {
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment
    return new Promise( async (resolve, reject) => {
        try{
            const res  = await axios.post(`${URL}address`, address)
            resolve()
            return;
        }catch(err){
            return console.log('erro endereço:', err)
        }

    });
}

async function CadasterUser(user) {
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.0.35:8080/'
    const URL = URLdevelopment
    
    return new Promise( async (resolve, reject) => {
        try{
            const res  = await axios.post(`${URL}user`,user)
            if(res.data == 200){
                resolve('Usuario Registrado!');
            }
            return;
        }catch(err){
            reject(console.log('Usuario Não Registrado!'));
        }
    });
}

async function CadasterVehicle(vehicle){
    return new Promise( async (resolve, reject) => {
        const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
        const URLdevelopment = 'http://192.168.0.35:8080/'
        const URL = URLdevelopment
        try{
            const res  = await axios.post(`${URL}vehicle`,vehicle)
            resolve()
        }catch(err){
            reject(console.log('Veículo Não Registrado:', err));
        }
    });
}

async function CadasterImage(action, pictures, id, am){ 
    if(action == 'human'){
        for (let key in pictures) {
            if (pictures.hasOwnProperty(key)) {
                let value = pictures[key];
                if(value == null){
                    continue;
                }
                let res = await UpFile(value, key, 'physical', id, am)
            }
        }
        return;
    }
    for (let key in pictures) {
    if (pictures.hasOwnProperty(key)) {
        let value = pictures[key];
        if(value == null){
            continue;
        }
        let res = await UpFile(value, key, 'vehicle', id, am)
    }
    }
}
