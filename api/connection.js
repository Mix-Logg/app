const mysql = require('mysql2');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
//   password: 'sua_senha',
  database: 'mix',
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

