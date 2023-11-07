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

        if (arquivos.length > 4) {
            // console.log('true > 4');
            return 'uploads/motorista/' + numberId + '/carro';
        } else {
            // console.log('false < 4');
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
      const extendFile = file.originalname.split('.')[1];
      const newNameFile = 'icode-' + file.originalname.split('.')[0];
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
                                                           docCar: req.body.imgDocCar
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




module.exports = router;