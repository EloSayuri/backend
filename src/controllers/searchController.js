import User from '../models/user.js';

const searchUser = async (req, res) =>{
  
  const token = req.headers["bearer"];

  if (!token){
    res.status(403).json({mensagem: "Não autorizado"});
  }

  const _user = await User.findOne({id:req.params.id_user });
  
  if (!_user){
    res.status(403).json({mensagem: "Não autorizado"});
  }

  if ( token !== _user.token){
    res.status(403).json({mensagem: "Não autorizado"});
  }

  const logDate = new Date(_user.ultimo_login)
  const dateNow = Date.now();

  const newDateObj  = new Date(logDate.getTime() + 30*60000);

  
  if(dateNow > newDateObj){
    res.status(403).json({mensagem: "Sessão inválida"});
  }

  res.status(200).json(_user);

};

export default searchUser;