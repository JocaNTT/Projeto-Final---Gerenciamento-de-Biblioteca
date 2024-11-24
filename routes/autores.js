// Importa o módulo Express para criar o roteador
const express = require('express')

// Importa o connect-flash, usado para exibir mensagens temporárias entre requisições
const flash = require('connect-flash')

// Cria uma nova instância do roteador do Express
const router = express.Router()

// Importa os modelos "livros" e "autores" que são usados para interagir com o banco de dados
const livros = require('../models/livros')
const autores = require('../models/autores')

// Configura o connect-flash no roteador
router.use(flash()) // Permite o uso do flash para mensagens temporárias
router.use((req, res, next) => {
    // Define variáveis globais locais para armazenar mensagens de sucesso e erro
    res.locals.sucess_msg = req.flash('sucess_msg')
    res.locals.error_msg = req.flash('error_msg')
    next() // Continua para o próximo middleware ou rota
})

// 1ª rota - Insere dados na tabela de autores
router.post('/store', async (req, res) => {
    // Usa o Sequelize para criar um novo autor no banco de dados
    const resultado = await autores.create({
        nome: req.body.nome,
        nacionalidade: req.body.nacionalidade,
        data_nascimento: req.body.data_nascimento,
    })

    // Verifica se algum campo obrigatório está vazio
    if (req.body.nome == "" || req.body.nacionalidade == "" || req.body.data_nascimento == "") {
        // Define uma mensagem de erro e redireciona para a página inicial
        req.flash('error_msg', "Preencha todos os campos")
        res.redirect('/')
    } else {
        // Define uma mensagem de sucesso e redireciona para a página de autores
        req.flash('sucess_msg', "Autor criado com sucesso")
        res.redirect('/autores')
    }
})

// 2ª rota - Exibe a página inicial de autores
router.get('/show', async (req, res) => {
    // Retorna uma mensagem simples para indicar a página inicial
    res.send("<h1> página inicial dos autores </h1>")
})

// 3ª rota - Consulta dados da tabela de autores e os relaciona com livros
router.get('/', async (req, res) => {
    // Busca todos os autores, incluindo os livros relacionados
    const resultado = await autores.findAll({ include: livros })

    // Se os dados forem encontrados, renderiza a página de autores com os dados
    if (resultado) {
        console.log(resultado)
        res.render("autores/index", { dados: resultado })
    } else {
        // Caso contrário, exibe uma mensagem de erro no console
        console.log("Não foi possível exibir os dados")
    }
})

// 4ª rota - Deleta um autor baseado no ID
router.get('/destroy/:id', async (req, res) => {
    // Remove um autor com base no ID passado como parâmetro na rota
    const resultado = await autores.destroy({
        where: {
            id: req.params.id // O ID é extraído dos parâmetros da URL
        }
    })

    // Se o autor for deletado com sucesso, redireciona para a página inicial
    if (resultado) {
        res.redirect('/')
    } else {
        // Caso contrário, retorna uma mensagem de erro no formato JSON
        res.json({ erro: "Não foi possível excluir" })
    }
})

// 5ª rota - Exibe o formulário de cadastro de autores
router.get('/create', async (req, res) => {
    // Busca todos os livros para exibir no formulário
    let resultado = await livros.findAll()

    // Se os dados forem encontrados, renderiza o formulário com os dados dos livros
    if (resultado) {
        res.render('autores/addAutores', { dados: resultado })
    } else {
        // Caso contrário, exibe uma mensagem de erro e redireciona para a página inicial
        console.log("Não foi possível carregar os dados")
        res.redirect('/')
    }
})

// Exporta o roteador para ser usado em outros arquivos
module.exports = router