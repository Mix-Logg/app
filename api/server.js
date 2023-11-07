const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(cors({ origin: '*' }));
app.use(express.json());


const postMotorista = require('./POST/motorista.js');
app.use('/motorista', postMotorista);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor intermediário está em execução na porta ${port}`);
});
