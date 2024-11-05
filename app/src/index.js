const { Database } = require('./database/database');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

// Inicia o banco de dados
const db = new Database();

// Configura o servidor express para usar o body-parser, permitindo a leitura de dados enviados via POST
app.use(bodyParser.urlencoded({ extended: true }));
// Configura o servidor express para ler JSON
app.use(bodyParser.json());
// Configura o servidor express para ler cookies
app.use(cookieParser());

// Configura o servidor express para servir arquivos estáticos da pasta 'assets'
app.use(express.static(path.join(__dirname, 'pages', 'assets')));

// Serve o HTML Principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

// Rota para receber os dados enviados pelo formulário
app.post('/submit', (req, res) => {
  const { name, email, phone, address } = req.body;
  if (!name || !email || !phone || !address) {
    return res.status(400).send('Requisição inválida.');
  }

  // Salva os dados no banco de dados
  db.userModel.create({ name, email, phone, address })
    .then(() => {
      res.status(201).send('Usuário cadastrado com sucesso.');
    })
    .catch((error) => {
      console.error('Erro ao salvar usuário:', error);
      res.status(500).send('Erro ao salvar usuário.');
    });
});

app.get('/submit', (req, res) => {
  // Retorna um erro, pois o método GET não é permitido para esta rota
  res.status(405).send('Método não permitido.');
});

// Rota admin
app.get('/admin', (req, res) => {
  if (!isAuth(req)) {
    return res.redirect('/admin/login');
  }

  // Retorna a página admin
  res.sendFile(path.join(__dirname, 'pages', 'admin', 'admin.html'));
});

// Rota de login do admin
app.get('/admin/login', (req, res) => {
  if (isAuth(req)) return res.redirect('/admin');
  res.sendFile(path.join(__dirname, 'pages', 'admin', 'login.html'))
});

app.post('/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@corp.com' && password === 'admin') {
    res.cookie('authId', '1');
    return res.redirect('/admin');
  }

  res.status(401).send('Credenciais inválidas.');
});

// API
app.get('/api/listUsers', (req, res) => {
  db.userModel.find()
    .then((users) => {
      res.json(users);
    })
    .catch((error) => {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).send('Erro ao buscar usuários.');
    });
});

db.connect().then(() => {
  console.log('Conectado ao banco de dados');
}).catch((error) => {
  console.error('Erro ao conectar ao banco de dados:', error);
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Verifica se o usuário está autenticado via cookie
function isAuth(req) {
  const { authId } = req.cookies || {};
  if (authId !== '1') return false
  return true
}
