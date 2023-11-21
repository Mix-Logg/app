const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const fss = require('fs')
const connection = require('../connection');
const multer = require('multer');
let numberId
const AWS = require('aws-sdk');
const moment = require('moment-timezone');

const spacesEndpoint = new AWS.Endpoint('nyc3.digitaloceanspaces.com');
const bucket = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: 'DO0036EUWG2DKLNMYVT6',
    secretAccessKey: 'TWXtI00AUnHVkgpZuYAjEYyKiWkv/mMH1KAvUIN5qeY'
});
const bucketName = 'miximg';


/////////////////////////////////////////
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
///////////////////////////////////////////



router.post('/register', async (req, res) => {
    console.log('api')
    // 1 insert
    const dataHora = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
    const email   = req.body.email;
    const celular = req.body.phone;
    const sqlInsertMotorista = 'INSERT INTO auxiliar (email, celular, create_at) VALUES (?, ?, ?)';
    const parametros = [email, celular, dataHora];

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
                        // const paramBucket = {
                        //     Bucket: bucketName,
                        //     Key: 'uploads/auxiliar/' + numberId + '/',
                        // };
                        // bucket.putObject(paramBucket, (err, data) => {
                        //     if (err) {
                        //       console.error('Erro ao enviar arquivo para o Space:', err);
                        //       return;
                        //     }
                        //     console.log('Arquivo enviado com sucesso para o Space:', data);
                        //     res.status(200).send({
                        //         error: false,
                        //         message: 'successfully',
                        //         doc:req.body.imgDoc,
                        //         id: numberId
                        //     });
                        // });
                        fss.mkdir('uploads/auxiliar/'+souId, (err) => {
                            if (err) {
                                console.log('não crio a pasta LOCAL:', err)
                            } else {
                                res.status(200).send({
                                    error: false,
                                    message: 'successfully',
                                    doc:req.body.imgDoc,
                                    id: numberId
                                })
                            }
                        });
                    }else{
                        res.status(500).send({
                            error: true,
                            message: 'err second!',
                        });     
                    }
                })
          }else{
            // console.log(err)
            console.log('erro no BD:', err)
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
                    return res.status(200).json({
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

router.post('/uploadBucker', async (req, res) => {
    // console.log('entrou na API')
    const diretorio = `/workspace/uploads/auxiliar/${numberId}/`
    const diretorioBucket = `uploads/auxiliar/${numberId}/`
    const paramsDir = {
        Bucket: bucketName,
        Key: diretorioBucket,
        Body: 'uploads/auxiliar/'
    };
    bucket.upload(paramsDir, (err, data) => {
        if (err) {
          console.error('Erro ao enviar o diretorio para o bucket:', err);
          return;
        }
        console.log('Diretorio enviado com sucesso. Informações:', data);
    });
    setTimeout(() => {fss.readdir(diretorio, (err, files) => {
        console.log('caminho:', __dirname);
        console.log('entrou no read: ', files)
        if (err) {
          console.log('Erro ao ler diretório local:', err);
          return
        }
        files.forEach((file) => {
          console.log('entrou no read 2')
          const filePath = `${diretorio}/${file}`;
          fss.readFile(filePath, (err, data) => {
            console.log('entrou no read 3')
            console.log(data)
            if (err) {
              console.error(`Erro ao ler arquivo ${filePath}:`, err);
              return;
            }
            // console.log(file)
            const params = {
              Bucket: bucketName,
              Key: `${diretorioBucket}${file}`,
              Body: data, 
            };
            bucket.upload(params, (err, data) => {
              if (err) {
                console.error(`Erro ao enviar arquivo ${filePath} para o S3:`, err);
                return;
              }else{
                console.log('upload erro:', err)
              }
            });
          });
        });
        let direExist = deleteDiretorio(diretorio)
        if(direExist === true){
            res.send(200)
        }else{
            console.log('?')
        }
    })}, 5000);

})

router.get('/testbucket', async (req,res) => {
    bucket.listBuckets((err, data) => {
        if (err) {
          res.send('Erro ao conectar-se ao DigitalOcean Space:', err);
          return;
        }
        console.log(data.Buckets)
        res.send('Conexão bem-sucedida! Buckets disponíveis: ' + JSON.stringify(data.Buckets));
    });
})


function deleteDiretorio(diretorio){
    if (fss.existsSync(diretorio)) {
        try {
            fss.rmSync(diretorio, { recursive: true });
            return true; // Retorna true se a exclusão foi bem-sucedida
        } catch (err) {
            deleteDiretorio(diretorio)
        }
    } else {
        return true; // Retorna true se o diretório não existir
    }
}

module.exports = router;