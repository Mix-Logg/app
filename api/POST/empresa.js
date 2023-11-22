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
        cb(null, 'uploads/empresa/'+ numberId); 
    },
    filename: function (req, file, cb) {
      const extendFile =  file.originalname.split('.')[1];
      const newNameFile = file.originalname.split('.')[0]; 
      cb(null, `${newNameFile}.${extendFile}`);
    },
});
const upload = multer({ storage });
/////////////////////////////////////////

router.post('/register', async (req, res) => {
    console.log('api')
    // 1 insert
    const dataHora = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
    const email   = req.body.email;
    const celular = req.body.phone;
    const ramo    = req.body.ramo;
    const sqlInsertEmpresa = 'INSERT INTO empresa (email, celular, ramo, create_at) VALUES (?, ?, ?, ?)';
    const parametros = [email, celular, ramo, dataHora];

    // 2 insert
    let souId = ''
    const cep = req.body.address.cep
    const logradouro = req.body.address.logradouro
    const numero = req.body.address.numero
    const complemento = req.body.address.complemento
    const bairro = req.body.address.bairro
    const cidade = req.body.address.cidade
    const uf = req.body.address.uf
    const sqlInsertEmpresaEndereco = 'INSERT INTO endereco (sou, idSou, cep, logradouro, numero, complemento, bairro, cidade, uf) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    
    connection.execute(sqlInsertEmpresa,parametros,
        async function (err, results) {
          if(err  === null){
            souId = results.insertId;
            console.log('Success 1:', souId)
            const parametrosEndereco = ['empresa', souId, cep, logradouro, numero, complemento, bairro, cidade, uf];
            connection.execute(sqlInsertEmpresaEndereco,parametrosEndereco,
                async function (err, results) {
                    if(err  === null){
                        numberId = souId
                        fss.mkdir('uploads/empresa/'+souId, (err) => {
                            if (err) {
                                console.log('não crio a pasta LOCAL:', err)
                            } else {
                               console.log('success')
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
    try {
        setTimeout(async () => {
            const pasta    = '/workspace/uploads/empresa/' + numberId
            await fs.access(pasta, fs.constants.F_OK);
            const arquivos = await fs.readdir(pasta);
            let cnpj = null; 
            let inscricaoEstadual = null;
            let comprovanteResidencia = null; 
            console.log(arquivos)
            for (const arquivo in arquivos) {
                console.log(arquivos)
                if (arquivos[arquivo].startsWith('cnpjimage')) {
                    cnpj = arquivos[arquivo];
                } else if (arquivos[arquivo].startsWith('addressImage')) {
                    comprovanteResidencia = arquivos[arquivo];
                } else if (arquivos[arquivo].startsWith('inscricaoEstadual')) {
                    inscricaoEstadual = arquivos[arquivo];
                }
            }
            const sqlInsertDoc = 'INSERT INTO imgdocparceiro (sou, idSou, cnpj, endereco, inscricaoEstadual) VALUES (?, ?, ? ,?, ?)';
            const parametros = ['empresa', numberId, pasta+'/'+cnpj, pasta+'/'+comprovanteResidencia, pasta+'/'+inscricaoEstadual];
            connection.execute(sqlInsertDoc,parametros, 
                async function (err, results) {
                    if(err === null){
                        res.status(200).json({
                            error: false,
                            message: 'successfully',
                        });
                    }else{
                        console.log('erro:', err)
                        res.status(500).json({
                            error: true,
                            message: 'error',
                        });
                    }
                }
            )
        }, 5000);
    } catch (err) {
        console.error('Erro ao verificar a pasta:', err);
    }

});

router.post('/uploadBucker', async (req, res) => {
    // console.log('entrou na API')
    const diretorio = `/workspace/uploads/empresa/${numberId}/`
    // const diretorio = `uploads/empresa/${numberId}/`
    const diretorioBucket = `uploads/empresa/${numberId}/`
    const paramsDir = {
        Bucket: bucketName,
        Key: diretorioBucket,
        Body: 'uploads/empresa/'
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
    })}, 5000);
    setTimeout(() => {let direExist = deleteDiretorio(diretorio)
        if(direExist === true){
            res.send(200)
        }else{
            console.log('?')
    }}, 7000);
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