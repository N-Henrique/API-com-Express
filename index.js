const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "projetoapidados",
  port: 3306,
});

// Operação DDL para criar uma tabela no banco de dados
db.connect((err) => {
  if (err) {
    console.error("Deu erro ao conectar com o banco: ", err.message);
  } else {
    console.log("Conectado ao Banco MySQL.");

    const createTable = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id INT PRIMARY KEY AUTO_INCREMENT,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        idade INT NOT NULL
      )
    `;

    db.query(createTable, (err, result) => {
      if (err) {
        console.error("Deu erro ao criar tabela: ", err.message);
      } else {
        console.log("Tabela 'usuarios' criada com sucesso!");
      }
    });
  }
});

app.use(express.json());

// Rota GET
app.get("/", (req, res) => {
  try {
    console.log("Requisição GET recebida.");
    res.send("Rota GET: Deu Certo!");
  } catch (error) {
    const errorMessage = "Erro 500: " + error.message;
    console.log(errorMessage);
    res.status(500).send(errorMessage);
  }
});

// Rota POST
app.post("/", (req, res) => {
  const { message } = req.body;
  console.log("Requisição POST recebida.");
  res
    .status(201)
    .json({ message: `Rota POST: Você enviou a mensagem "${message}"` });
});

// Rota PUT
app.put("/", (req, res) => {
  console.log("Requisição PUT recebida.");
  res.status(200).send("Rota PUT: Requisição bem-sucedida!");
});

// Rota DELETE
app.delete("/", (req, res) => {
  console.log("Requisição DELETE recebida.");
  res.sendStatus(204);
});

// Rota POST para adicionar usuário
app.post("/usuarios", (req, res) => {
  const { nome, email, idade } = req.body;

  // Operação DML para inserir usuário na tabela
  const insertUser = `
    INSERT INTO usuarios (nome, email, idade) VALUES (?, ?, ?)
  `;
  db.query(insertUser, [nome, email, idade], (err, result) => {
    if (err) {
      console.error("Error ao adicionar usuario: ", err.message);
      res.status(500).send("Error ao adicionar usuario.");
    } else {
      console.log("Usuario adicionado com sucesso!");
      res.status(201).json({ message: "Usuario adicionado com sucesso!" });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
