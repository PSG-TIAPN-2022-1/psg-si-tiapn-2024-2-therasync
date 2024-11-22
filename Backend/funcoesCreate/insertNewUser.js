import bcrypt from 'bcrypt';   
import sequelize from '../db.js'; 
import User from '../models/users.js';

async function CriarNovoUsuario(username, email, senha, cargo) {
  try {
    
    const senhaHasheada = await bcrypt.hash(senha, 10); // botei o salt com 10 rounds pq eh o padrao 
                                                        //mas como sera praticamente so
                                                        //o joao que vai acessar o sistema pode-se diminuir
                                                        //para melhorar o desempenho

    const novoUsuario = await User.create({
      username: username,
      email: email,
      senha: senhaHasheada,  
      cargo: cargo
    });

    console.log('Usuário criado:', novoUsuario.toJSON());
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
  } finally {
    await sequelize.close();
  }
}

export default CriarNovoUsuario;




