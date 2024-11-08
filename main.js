const express = require("express");
const rotas = express();
const Sequelize = require ("sequelize");
const cors = require ("cors")

rotas.use(cors())
rotas.use(express.json())



const conexaoBanco = new Sequelize("projeto", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

  const aluno = conexaoBanco.define("aluno", {
    nome: {
      type: Sequelize.STRING,
    },
    idade: {
      type: Sequelize.INTEGER,
    },
    atividade: {
      type: Sequelize.STRING,
    }
  });

aluno.sync({ force: false }); 

rotas.get("/", function (req, res) {
    res.send("Rota principal");
});

rotas.get("/salvar/:nome/:idade/:atividade", async function (req, res) {
    const { nome, idade, atividade } = req.params;

    const novoAluno = await aluno.create({ nome, idade, atividade }); //função que espera
  
    res.json({
      resposta: "Aluno criado com sucesso",
      aluno: novoAluno,
    });
});

rotas.get("/deletar/:id", async function (req, res) {
    const { id } = req.params;
    const idNumber = parseInt(id, 10); // Converte o ID para número
  
    const deleted = await aluno.destroy({
      where: { id: idNumber },
    });
  
    if (deleted) {
      res.json({ mensagem: "Aluno deletado com sucesso" });
    } else {
      res.status(404).json({ mensagem: "Aluno não encontrado" });
    }
});

rotas.get("/editar/:id/:nome/:idade/:atividade", async function (req, res) {
  const { id, nome, idade, atividade } = req.params;
  const idNumber = parseInt(id, 10); // Converte o ID para número

    const [updated] = await aluno.update(
    { nome, idade, atividade },
    {
      where: { id: idNumber }, // Usa o ID numérico
    }
  );

  res.json({
    mensagem: "Aluno atualizado com sucesso",
  });
}); 

rotas.get("/mostrar", async function (req, res) {
    const alunos = await aluno.findAll(); // Busca todos os registros
    res.json(alunos); // Retorna os registros em formato JSON
});

rotas.listen(3031, function () {
    console.log("Server is running on port 3031");
});