import axios from "axios"
import UpFile from "./uploadFile"
import moment from 'moment-timezone';
export default async function RegisterUser(params){
    // const time  = await axios.get('https://worldtimeapi.org/api/timezone/America/Sao_Paulo')
    const today = new Date();
    const formattedDate = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss');
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://10.253.252.115:8080/'
    const URL = URLproduction
    
    const am = params.user.am

    const user = {
        uuid: '',
        am: am,
        email:  params.user.email ,
        phone:  params.user.phone , 
        name :  params.user.name , 
        cpf  :  params.user.login,
        create_at : formattedDate
    }

    const address = {
        am : am,
        uuid : '',
    }

    try{
        const newCadaster = await axios.post(`${URL}${am}`, user)
        console.log('cadastro',newCadaster) 
        const id = newCadaster.data
        user.uuid = id;
        user.password = params.user.password;
        address.uuid = id;
        console.log('user',user)    
        await CadasterUser(user);
        await CadasterAddress(address)
        console.log('address',address)
        await CadasterImage('human',params.picture.human,id,am)
        console.log('params.picture.human',params.picture.human)
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
    const URLdevelopment = 'http://10.253.252.115:8080/'
    const URL = URLproduction
    return new Promise( async (resolve, reject) => {
        try{
            const res  = await axios.post(`${URL}address`, address)
            console.log('endereço',res)
            resolve()
            return;
        }catch(err){
            return console.log('erro endereço:', err)
        }

    });
}

async function CadasterUser(user) {
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://10.253.252.115:8080/'
    const URL = URLproduction
    
    return new Promise( async (resolve, reject) => {
        try{
            const res  = await axios.post(`${URL}user`,user)
            console.log('usuario',res)
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
        const URLdevelopment = 'http://10.253.252.115:8080/'
        const URL = URLproduction
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
                console.log('imagem',res)
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
