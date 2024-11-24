// Importa o modelo "autores" para criar a relação entre livros e autores
const autores = require('./autores')

// Importa as configurações do Sequelize e o tipo de dados do Sequelize
const { sequelizeConfig, sequelizeDb } = require('./database')

// Define o modelo "livros" usando o Sequelize
const livros = sequelizeConfig.define(
    'livros', // Nome do modelo
    {
        // Define os campos da tabela "livros" com seus respectivos tipos de dados
        titulo: { type: sequelizeDb.STRING }, // Campo "titulo" do tipo STRING
        ano_publicacao: { type: sequelizeDb.NUMBER } // Campo "ano_publicacao" do tipo NUMBER
    }
)

// Cria a relação entre "autores" e "livros": um autor pode ter muitos livros
autores.hasMany(livros, {
    onDelete: 'CASCADE', // Se um autor for deletado, todos os livros associados serão deletados
    onUpdate: 'CASCADE' // Se os dados do autor forem atualizados, os livros associados serão atualizados
})

// Cria a relação inversa: um livro pertence a um único autor
livros.belongsTo(autores)

// Garante que a tabela "livros" será criada no banco de dados, se ainda não existir
livros.sync()

// Exporta o modelo "livros" para ser usado em outros arquivos
module.exports = livros