import axios from "axios";
export default async function codeForgot(number,option){

    const URLproduction  = 'http://whatsapp-mix-active.shop/'
    const URLdevelopment = 'http://192.168.1.5:5050/'
    const URL            = URLproduction
    const randomNumber = Math.floor(Math.random() * 10000);
    const randomCode   = String(randomNumber).padStart(4, '0');
    let   response;
    try{
        switch (option) {
            case 'whatsapp':
                response = await axios.get(`${URL}whats/appDriver/forgotPassword/55${number}/${randomCode}`)
                if(response.data.status == 200){
                    return {
                        status: 200,
                        code  : randomCode
                    }
                }
                return {
                    status:500,
                    code  :randomCode
                }
                break;
            default:
                break;
        }
    }catch(e){
        console.log(e)
    }
}