import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import authConfig from '../config/authConfig.js';
import User from '../models/user.js'

const signIn = async (req, res) =>{

  const _user = await User.findOne({email: req.body.email});

  if (_user){
    const senha = await bcrypt.hash(req.body.senha, _user.chave);

    if (senha === _user.senha){
      const token_user = jwt.sign({id: _user.id }, authConfig.secret);
      await User.updateOne({token: token_user , ultimo_login: Date.now()});
      res.json(_user);

    }else{
      res.status(401).json({mensagem: "aaaUsuário e/ou senha inválidos"});
    }
  
  }else{
    res.status(401).json({mensagem: "Usuário e/ou senha inválidos"});
  }

};

export default signIn;