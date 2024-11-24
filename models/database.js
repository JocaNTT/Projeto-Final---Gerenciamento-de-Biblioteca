// Importa o Sequelize, uma biblioteca ORM (Object Relational Mapping) para interagir com o banco de dados
const sequelizeDb = require('sequelize')

// Cria uma nova instância do Sequelize com as configurações do banco de dados
const sequelizeConfig = new sequelizeDb(
    'biblioteca_db', // Nome do banco de dados
    'root', // Nome do usuário (não é usado no SQLite, mas necessário para outros dialetos)
    '', // Senha do banco de dados (não é usada no SQLite, mas necessária para outros dialetos)
    {
        // Configurações adicionais para o Sequelize
        dialect: 'sqlite', // Define que o banco de dados usado será o SQLite
        storage: './biblioteca_db.sqlite' // Especifica o arquivo onde o banco de dados SQLite será armazenado
    }
)

// Exporta as configurações para serem usadas em outros módulos
module.exports = { sequelizeDb, sequelizeConfig }