import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v1 as uuidv1 } from 'uuid';

import User from '../models/user.js';
import authConfig from '../config/authConfig.js';


const signUp = async (req, res) =>{

  const _user = await User.findOne({email: req.body.email})

  if (!_user){
    const id = await uuidv1(req.body.email);
    const token_user = jwt.sign({id}, authConfig.secret);
    const chave = await bcrypt.genSalt();
    const user = await User.create({ 
      id ,
      nome: req.body.nome,
      email: req.body.email,
      chave, 
      senha: await bcrypt.hash(req.body.senha, chave),
      telefones: req.body.telefones,
      data_criacao : Date.now(),
      data_atualizacao: Date.now(),
      ultimo_login: Date.now(),
      token: token_user
    });
    
    res.status(200).json(user);
  
  }else{
    res.json({mensagem: "E-mail já existente."});
  }

}

export default signUp;