const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(cors({ origin: '*' }));
app.use(express.json());


const postMotorista = require('./POST/motorista.js');
const postAuxiliar = require('./POST/auxiliar.js');
const postTransportadora = require('./POST/transportadora.js');
const postEmpresa = require('./POST/empresa.js');
// POST
app.use('/motorista', postMotorista);
app.use('/auxiliar', postAuxiliar);
app.use('/empresa', postEmpresa);
app.use('/transportadora', postTransportadora);
//

const port = 8081;
app.listen(port, () => {
  console.log(`Servidor intermediário está em execução na porta ${port}`);
});
