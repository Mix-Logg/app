const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '82.180.153.52',
  user: 'u316289084_mix_admin',
  password: 'aT7=7Pyo>&to',
  database: 'u316289084_mix_teste',
});

// Iniciar a conexão
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco');
});

// Exportar a conexão para que outros arquivos possam usá-la
module.exports = connection;

