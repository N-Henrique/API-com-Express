const express = require("express");
const app = express();
const PORT = 3000;

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
//http://localhost:3000

// Rota POST
app.post("/", (req, res) => {
  const { message } = req.body;
  console.log("Requisição POST recebida.");
  res
    .status(201)
    .json({ message: `Rota POST: Você enviou a mensagem "${message}"` });
});
//localhost:3000
//JSON {"message": "Mensagem de Teste"}

// Rota PUT
app.put("/", (req, res) => {
  console.log("Requisição PUT recebida.");
  res.status(200).send("Rota PUT: Requisição bem-sucedida!");
});
//localhost:3000

// Rota DELETE
http: app.delete("/", (req, res) => {
  console.log("Requisição DELETE recebida.");
  res.sendStatus(204);
});
//http://localhost:3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
