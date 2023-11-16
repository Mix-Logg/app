const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const fss = require('fs')
const connection = require('../connection');
const multer = require('multer');
let numberId


const destiny = async () => {
    const pasta = 'uploads/motorista/' + numberId;

    try {
        await fs.access(pasta, fs.constants.F_OK);
        // console.log('A pasta existe.');
        const arquivos = await fs.readdir(pasta);
        // console.log(arquivos)
        // console.log(arquivos.length)
        if (arquivos.length > 4) {
            return 'uploads/motorista/' + numberId + '/carro';
        } else {
            return 'uploads/motorista/' + numberId;
        }
    } catch (err) {
        console.error('Erro ao verificar a pasta:', err);
    }
};

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        try {
            const diretorioDefinido = await destiny();
            // console.log(diretorioDefinido);
            cb(null, diretorioDefinido);
        } catch (err) {
            console.error('Erro ao definir o diretório:', err);
            cb(null, 'uploads/motorista/'+ numberId); 
        }

    },
    filename: function (req, file, cb) {
      const extendFile =  file.originalname.split('.')[1];
      const newNameFile = file.originalname.split('.')[0];
      cb(null, `${newNameFile}.${extendFile}`);
    },
});

const upload = multer({ storage });

router.post('/register', async (req, res) => {

    // 1 insert
    const email   = req.body.email;
    const celular = req.body.phone;
    const sqlInsertMotorista = 'INSERT INTO motorista (email, celular) VALUES (?, ?)';
    const parametros = [email, celular];

    // 2 insert
    let souId = ''
    const cep = req.body.address.cep
    const logradouro = req.body.address.logradouro
    const numero = req.body.address.numero
    const complemento = req.body.address.complemento
    const bairro = req.body.address.bairro
    const cidade = req.body.address.cidade
    const uf = req.body.address.uf
    const sqlInsertMotoristaEndereco = 'INSERT INTO endereco (sou, idSou, cep, logradouro, numero, complemento, bairro, cidade, uf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    // insert 3
    let tipo = ''
    if(req.body.dataCar.txtInputCar === false){
        // checkCar
        tipo = req.body.dataCar.checkCar
    }else{
        // txtInputCar
        tipo = req.body.dataCar.txtInputCar
    } 
    const cadastroVeiculo = req.body.dataCar.cadastroVeiculo;
    const proprietario = req.body.dataCar.proprietario; 
    const peso = req.body.dataCar.typeCar;
    const sqlInsertMotoristaCar = 'INSERT INTO dataveiculo (sou, idSou, peso, tipo, cadastro, proprietario) VALUES (?, ?, ?, ?, ?, ?)';
    
    
    connection.execute(sqlInsertMotorista,parametros,
        async function (err, results) {
          if(err  === null){
            souId = results.insertId;
            console.log('Success 1:', souId)
            const parametrosEndereco = ['motorista', souId, cep, logradouro, numero, complemento, bairro, cidade, uf];
            connection.execute(sqlInsertMotoristaEndereco,parametrosEndereco,
                async function (err, results) {
                    if(err  === null){
                        console.log('Success 2')
                        const parametrosCar = ['motorista', souId, peso, tipo, cadastroVeiculo, proprietario];
                        connection.execute(sqlInsertMotoristaCar,parametrosCar,
                            async function (err, results) {
                                if(err  === null){
                                    console.log('Success 3')
                                    fss.mkdir('uploads/motorista/'+souId, (err) => {
                                        if (err) {
                                            console.error(err);
                                        } else {
                                            fss.mkdir('uploads/motorista/'+souId+'/carro',(err)=>{
                                                if (err) {
                                                    console.error(err);
                                                }else{
                                                    numberId = souId
                                                    res.status(200).send({
                                                        error: false,
                                                        message: 'successfully',
                                                        data:{
                                                           doc:    req.body.imgDoc,
                                                           docCar: req.body.imgDocCar,
                                                           id: numberId
                                                        }
                                                    });
                                                }
                                            })
                                        }
                                    });
                                }else{
                                    res.status(500).send({
                                        error: true,
                                        message: 'err three!',
                                    });    
                                }
                            })
                    }else{
                        res.status(500).send({
                            error: true,
                            message: 'err second!',
                        });     
                    }
                })
          }else{
            console.log('erro')
            res.status(500).send({
                error: true,
                message: 'err first!',
            });     
          }
        }
    );
});

router.post('/registerImage', async (req, res) => {
    // console.log(req.body)
    try {
        const pasta    = 'uploads/motorista/' + numberId
        const pastaCar = 'uploads/motorista/' + numberId + '/carro';
        await fs.access(pasta, fs.constants.F_OK);
        const arquivos = await fs.readdir(pasta);
        let cnhImage = null; 
        let addressImage = null;
        let cpfImage = null; 
        let selfieImage = null; 
        for (const arquivo in arquivos) {
                if(arquivos[arquivo] === 'carro'){
                }else if (arquivos[arquivo].startsWith('cnhImage')) {
                    cnhImage = arquivos[arquivo];
                } else if (arquivos[arquivo].startsWith('addressImage')) {
                    addressImage = arquivos[arquivo];
                } else if (arquivos[arquivo].startsWith('cpfImage')) {
                    cpfImage = arquivos[arquivo];
                } else if (arquivos[arquivo].startsWith('selfieImage')) {
                    selfieImage = arquivos[arquivo];
                }

        }
        const sqlInsertDoc ='INSERT INTO imgdocfisica (sou, idSou, cnh, endereco, cpf, selfie) VALUES (?, ?, ? ,?, ?, ?)';
        const parametros = ['motorista', numberId, pasta+'/'+cnhImage, pasta+'/'+addressImage, pasta+'/'+cpfImage, pasta+'/'+selfieImage];
        connection.execute(sqlInsertDoc,parametros, 
            async function (err, results) {
                let antt = null;
                let clv = null;
                let cnpj = null;
                let estadual = null;
                let cpfDono = null;
                let addressDono = null;
                if(err === null){
                    await fs.access(pastaCar, fs.constants.F_OK);
                    const arquivosCar = await fs.readdir(pastaCar);
                    for (const arquivo in arquivosCar) {
                        // console.log(arquivosCar[arquivo])
                        if(arquivosCar[arquivo].startsWith('cpfDonoImage')){
                            cpfDono =  pastaCar+'/'+arquivosCar[arquivo];
                        }else if (arquivosCar[arquivo].startsWith('anttImage')) {
                            antt =  pastaCar+'/'+arquivosCar[arquivo];
                        } else if (arquivosCar[arquivo].startsWith('residenciaDono')) {
                            addressDono =  pastaCar+'/'+arquivosCar[arquivo];
                        } else if (arquivosCar[arquivo].startsWith('clvImage')) {
                            clv =  pastaCar+'/'+arquivosCar[arquivo];
                        } else if (arquivosCar[arquivo].startsWith('cnpjImage')) {
                            cnpj =  pastaCar+'/'+arquivosCar[arquivo];
                        } else if (arquivosCar[arquivo].startsWith('estadualImage')) {
                            estadual =  pastaCar+'/'+arquivosCar[arquivo];
                        }
                }
                console.log(clv)
                const sqlInsertDocCar = 'INSERT INTO imgdoccar (sou, idSou, clv, antt, estadual, cnpj, cpfDono, residenciaDono) VALUES (?, ?, ? ,?, ?, ?, ?, ?)'
                const parametrosCar = ['motorista', numberId, clv, antt, estadual, cnpj, cpfDono, addressDono];
                connection.execute(sqlInsertDocCar,parametrosCar, 
                    async function (err, results) {
                        if(err === null){
                            console.log('success')
                            return res.status(200).send({
                                error: false,
                                message: 'successfully',
                              });
                        }else{
                            console.log('erro: ', err)
                        }
                    })
                }
            }
        )
        
    } catch (err) {
        console.error('Erro ao verificar a pasta:', err);
    }

});

router.post('/image', upload.single('file'), (req, res) => {
    const file = req.file;
    if (file !== undefined) {
      return res.status(200).send({
        error: false,
        message: 'File uploaded successfully',
      });
    } else {
      return res.status(400).send({
        error: true,
        message: 'File cannot be accepted',
      });
    }
});

router.get('/teste', async (req, res) => {
    res.send('hello!')
})




module.exports = router;
