// CARREGAR OS MÓDULOS
const express = require('express'); // Framework para criar o servidor e gerenciar rotas
const router = express.Router(); // Módulo de roteamento do Express
const flash = require('connect-flash'); // Middleware para exibir mensagens temporárias (flash)

// IMPORTAR MODELOS
const livros = require('../models/livros'); // Modelo da tabela "livros"
const autores = require('../models/autores'); // Modelo da tabela "autores"

// CONECTANDO O CONNECT-FLASH
router.use(flash()); // Ativando o middleware flash
router.use((req, res, next) => {
    // Configura variáveis globais para mensagens de sucesso ou erro
    res.locals.sucess_msg = req.flash('sucess_msg'); 
    res.locals.error_msg = req.flash('error_msg');
    next(); // Passa para o próximo middleware ou rota
});

// CRIANDO ROTAS

// 1ª ROTA - INSERIR DADOS NA TABELA
router.post('/store', async (req, res) => {
    const { titulo, ano_publicacao, autores: autoreId } = req.body; // Obtendo os dados enviados no formulário

    // Verifica se todos os campos foram preenchidos
    if (!titulo || !ano_publicacao || !autoreId) {
        req.flash('error_msg', "Preencha todos os campos"); // Mensagem de erro
        return res.redirect('/'); // Redireciona para a página inicial
    }

    // Insere os dados no banco
    const resultado = await livros.create({
        titulo,
        ano_publicacao,
        autoreId // Esse é o campo da chave estrangeira relacionado ao autor
    });

    // Envia mensagem de sucesso e redireciona
    req.flash('sucess_msg', "Livro cadastrado com sucesso!");
    res.redirect('/livros');
});

// 2ª ROTA - EXIBIR A PÁGINA INICIAL DOS LIVROS
router.get('/show', async (req, res) => {
    res.send("<h1> Página inicial dos livros </h1>"); // Exibe uma página simples (exemplo estático)
});

// 3ª ROTA - CONSULTAR DADOS DA TABELA
router.get('/', async (req, res) => {
    // Consulta os livros com os autores associados usando JOIN
    const resultado = await livros.findAll({ include: autores });

    if (resultado) {
        console.log(resultado); // Exibe os resultados no console
        res.render("livros/index", { dados: resultado }); // Renderiza a página com os dados
    } else {
        console.log("Não foi possível exibir os dados"); // Log de erro
    }
});

// 4ª ROTA - DELETAR DADOS DA TABELA
router.get('/destroy/:id', async (req, res) => {
    // Deleta o livro cujo ID é informado na rota
    const resultado = await livros.destroy({
        where: {
            id: req.params.id // Obtém o ID do parâmetro da URL (:id)
        }
    });

    res.redirect('/'); // Redireciona para a página inicial
});

// 5ª ROTA - EXIBIR FORMULÁRIO DE CADASTRO
router.get('/create', async (req, res) => {
    // Consulta todos os autores para exibição no formulário
    let resultado = await autores.findAll();

    if (resultado) {
        res.render('livros/addLivros', { dados: resultado }); // Renderiza o formulário com os autores disponíveis
    } else {
        console.log("Não foi possível carregar os dados"); // Log de erro
        res.redirect('/'); // Redireciona para a página inicial em caso de erro
    }
});

// EXPORTAR O ROUTER
module.exports = router; // Permite que o router seja usado em outros arquivos