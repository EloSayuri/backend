import mongoose from 'mongoose';

const telefone = {
  _id: String,
  numero: String,
  ddd: String
}


const User = mongoose.model(
  "User", new mongoose.Schema({
    id: String,
    nome: String,
    email: String,
    senha: String,
    chave: String,
    telefones:[telefone],
    data_criacao: Date,
    data_atualizacao: Date,
    ultimo_login: Date,
    token: String,
  }) 
  );

export default User;