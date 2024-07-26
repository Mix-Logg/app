import axios from 'axios';

export default async function upFile(path, nameFile, functionn, id, paramAm  ) {
    const URLproduction  = 'https://seashell-app-inyzf.ondigitalocean.app/'
    const URLdevelopment = 'http://192.168.1.5:8080/'
    const URL = URLdevelopment;

    let uuid = id
    let am = paramAm
    const extend = path.split('.')[3];
    const formData = new FormData();
    formData.append('file', JSON.parse(JSON.stringify({
      name: nameFile+'.'+extend,
      uri: path,
      type: 'image/' + extend,
    })));
    formData.append('id', uuid)
    formData.append('am', am)
    formData.append('function', functionn)
    try {
      const response = await axios.post(URL+'upload-bucket/upload', formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      if(await response.data.msg === 'success'){
        return true
      }else{
        return false
      }
    } catch (error) {
      console.error(`Erro ao enviar o arquivo ${nameFile}:`, error);
    }
}