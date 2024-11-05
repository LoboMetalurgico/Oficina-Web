const { DatabaseManager, MariaDBConnection } = require('promisedb');
const { UserModel } = require('./models');

class Database {
  dbm;
  mariadbconn;
  connection;
  userModel;

  constructor() {
    // Inicia o gerenciador de Banco de Dados
    this.dbm = new DatabaseManager();
    // Cria uma nova conexão com o banco de dados
    this.mariadbconn = new MariaDBConnection('localhost', 3306, 'testuser', 'pass', 'app');
  }

  async connect() {
    // Registra a conexão no gerenciador de banco de dados e inicia a conexão
    this.connection = await this.dbm.registerConnection('default', this.mariadbconn);
    // Cria um novo modelo de usuário
    this.userModel = new UserModel();
    // Registra o modelo de usuário no banco de dados
    this.userModel.register('users', this.mariadbconn);
  }
}

module.exports = {
  Database
};
