const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const fss = require('fs')
const connection = require('../connection');
const multer = require('multer');
let numberId


const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        cb(null, 'uploads/auxiliar/'+ numberId); 
    },
    filename: function (req, file, cb) {
      const extendFile =  file.originalname.split('.')[1];
      const newNameFile = file.originalname.split('.')[0];
      cb(null, `${newNameFile}.${extendFile}`);
    },
});

const upload = multer({ storage });

router.post('/register', async (req, res) => {
    console.log('caiu aqui register')
    // 1 insert
    const email   = req.body.email;
    const celular = req.body.phone;
    const sqlInsertMotorista = 'INSERT INTO auxiliar (email, celular) VALUES (?, ?)';
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
    const sqlInsertAuxiliarEndereco = 'INSERT INTO endereco (sou, idSou, cep, logradouro, numero, complemento, bairro, cidade, uf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    connection.execute(sqlInsertMotorista,parametros,
        async function (err, results) {
          if(err  === null){
            souId = results.insertId;
            console.log('Success 1:', souId)
            const parametrosEndereco = ['auxiliar', souId, cep, logradouro, numero, complemento, bairro, cidade, uf];
            connection.execute(sqlInsertAuxiliarEndereco,parametrosEndereco,
                async function (err, results) {
                    if(err  === null){
                        numberId = souId
                        console.log('Success')
                        fss.mkdir('uploads/auxiliar/'+souId, (err) => {
                            if (err) {
                                console.error(err);
                            } else {
                                res.status(200).send({
                                    error: false,
                                    message: 'successfully',
                                    doc:req.body.imgDoc,
                                    id: numberId
                                });
                    }   })
                        
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
})

router.post('/image', upload.single('file'), (req, res) => {
    const file = req.file;
    // console.log(req.file)
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

router.post('/registerImage', async (req, res) => {
    console.log(req.body)
    try {
        const pasta    = 'uploads/auxiliar/' + numberId
        await fs.access(pasta, fs.constants.F_OK);
        const arquivos = await fs.readdir(pasta);
        let cnhImage = null; 
        let addressImage = null;
        let cpfImage = null; 
        let selfieImage = null; 
        for (const arquivo in arquivos) {
                if (arquivos[arquivo].startsWith('cnhImage')) {
                    cnhImage = arquivos[arquivo];
                } else if (arquivos[arquivo].startsWith('addressImage')) {
                    addressImage = arquivos[arquivo];
                } else if (arquivos[arquivo].startsWith('cpfImage')) {
                    cpfImage = arquivos[arquivo];
                } else if (arquivos[arquivo].startsWith('selfieImage')) {
                    selfieImage = arquivos[arquivo];
                }

        }
        const sqlInsertDoc = 'INSERT INTO imgdocfisica (sou, idSou, cnh, endereco, cpf, selfie) VALUES (?, ?, ? ,?, ?, ?)';
        const parametros = ['auxiliar', numberId, pasta+'/'+cnhImage, pasta+'/'+addressImage, pasta+'/'+cpfImage, pasta+'/'+selfieImage];
        connection.execute(sqlInsertDoc,parametros, 
            async function (err, results) {
                if(err === null){
                    return res.status(200).send({
                        error: false,
                        message: 'successfully',
                    });
                }
            }
        )
        
    } catch (err) {
        console.error('Erro ao verificar a pasta:', err);
    }

});

module.exports = router;