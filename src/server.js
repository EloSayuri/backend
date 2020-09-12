import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
 
import routes from './routes.js';
import dbConfig from './config/dbConfig.js';

dotenv.config();

//instanciando o expresse
const server = express();

// permitir acesso externo
server.use(cors());
server.use(express.json());

// conectando com o banco de dados
mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Conexão com o bd com sucesso!");
})
.catch(err => {
  console.error("Erro de conexão com bd", err);
});


//Rotas 
server.use(routes);

const port = process.env.PORT ||3000;
server.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
});