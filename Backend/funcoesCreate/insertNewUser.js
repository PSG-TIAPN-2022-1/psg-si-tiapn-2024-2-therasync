import sequelize from '../db.js'; 
import User from '../models/users.js'; 

async function CriarNovoUsuario(username, nivel, senha) {
    try {
      const novoUsuario = await User.create({
        username: username,
        nivel: nivel,
        senha: senha
      });
  
      console.log('Usuário criado:', novoUsuario.toJSON());
  
    } catch (error) {
      console.error('Erro ao sincronizar ou criar usuário:', error);
    } finally {
      await sequelize.close(); 
    }
}

