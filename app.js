// CARREGAR OS MÓDULOS
const express = require('express'); // Framework para criar o servidor e gerenciar rotas
const handlebars = require('express-handlebars'); // Template engine para renderizar páginas HTML
const session = require('express-session'); // Middleware para gerenciar sessões no servidor

const app = express(); // Inicializando o aplicativo Express
const porta = 8900; // Definindo a porta onde o servidor será executado
const path = require('path');

// CONFIGURAR O EXPRESS PARA RECEBER DADOS DO FORMULÁRIO
app.use(express.urlencoded({ extended: true })); // Permite que o Express interprete dados enviados via formulário HTML
app.use(express.json()); // Permite que o Express interprete dados no formato JSON

// CONFIGURAÇÃO DA SESSÃO
app.use(session({
    secret: 'geeksforgeeks', // Chave secreta usada para assinar a sessão
    saveUninitialized: true, // Define se sessões não inicializadas serão salvas
    resave: false // Evita que sessões sejam salvas novamente se não forem modificadas
}));

// CONFIGURANDO HANDLEBARS
app.engine('handlebars', handlebars.engine({ extend: true })); // Configura o Handlebars como mecanismo de templates
app.set('view engine', 'handlebars'); // Define o Handlebars como o mecanismo de visualização padrão

// CARREGAR OS ARQUIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, 'assets')));

// CARREGAR AS ROTAS
const funcionandoRouter = require('./routes/livros'); // Importa as rotas relacionadas a "livros"
const funcionandoRouter2 = require('./routes/autores'); // Importa as rotas relacionadas a "autores"

// UTILIZANDO AS ROTAS
app.use('/livros', funcionandoRouter); // Define a rota base "/livros" e associa ao arquivo de rotas de livros
app.use('/autores', funcionandoRouter2); // Define a rota base "/autores" e associa ao arquivo de rotas de autores

// EXIBINDO INFORMAÇÕES NA TELA
app.get('/', (req, res) => {
    res.render('home'); // Renderiza a página "home" quando o usuário acessa a rota raiz
});

// EXECUTANDO O SERVIDOR
app.listen(porta, () => {
    console.log("Servidor executado na porta ", porta); // Exibe uma mensagem no console indicando que o servidor está em execução
});