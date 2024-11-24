// Importa as configurações do Sequelize e o tipo de dados do Sequelize
const { sequelizeConfig, sequelizeDb } = require('./database')

// Define o modelo "autores" usando o Sequelize
const autores = sequelizeConfig.define(
    'autores', // Nome do modelo (será o nome da tabela no banco de dados)
    {
        // Define os campos da tabela "autores" com seus respectivos tipos de dados
        nome: { type: sequelizeDb.STRING }, // Campo "nome" do tipo STRING (texto)
        nacionalidade: { type: sequelizeDb.STRING }, // Campo "nacionalidade" do tipo STRING
        data_nascimento: { type: sequelizeDb.STRING } // Campo "data_nascimento" do tipo STRING (idealmente deveria ser do tipo DATE para datas)
    }
)

// Cria ou sincroniza a tabela "autores" no banco de dados
autores.sync()

// Exporta o modelo "autores" para ser usado em outros arquivos
module.exports = autores