// app.js
const express = require('express');
const { HtmlToRtfController } = require('./controllers');

const app = express();

// middlewares
app.use(express.json());

// rotas
app.get('/', HtmlToRtfController.startProcess);

// erro 404
app.use((req, res, next) => {
  res.status(404).send('Página não encontrada');
});

// erro 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro interno do servidor');
});

// iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});