//import Library

const Sequelize = require("sequelize");

//keys

const conexaoBanco = new Sequelize ("teste", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

const Criacao = conexaoBanco.define("postagens", {
    titulo: {
        type: Sequelize.STRING, //VARCHAR
    },

    conteudo: {
        type: Sequelize.TEXT, //TextArea
    }
});

//Criacao.sync({force:true}); - Realiza a criação da tabela

//Insert 

Criacao.create({
    titulo: "Primeira inserção",
    conteudo: "Deu certo!",
});