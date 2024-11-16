import express from 'express';
import cors from 'cors';
import {Sequelize} from 'sequelize';
import {QueryTypes} from 'sequelize';
import { PiAlarmThin } from 'react-icons/pi';

const app = express();
const PORT = 3000;

const sequelize = new Sequelize('therasync2', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});

app.use(cors());

app.get('/api/users', async (req, res) => {
  try {
      const users = await sequelize.query('SELECT * FROM `usuarios`', {
          type: QueryTypes.SELECT,
      });
      res.json(users);
  } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

app.get('/api/consultas', async (req, resp) => {
  try {
    const consultas = await sequelize.query('SELECT * FROM `consulta`', {
      type: QueryTypes.SELECT,
    });
    resp.json(consultas);
  } catch (error) {
    console.error('Erro ao buscar consultas:', error);
    resp.status(500).json({ error: 'Erro ao buscar consultas' });
  }
});

app.get('/api/pacientes', async (req, resp) => {
  try {
    const pacientes = await sequelize.query('select * FROM `paciente`', {
      type: QueryTypes.SELECT,
    });
    resp.json(pacientes);
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    resp.status(500).json({ error: 'Erro ao buscar pacientes' });
  }
});

app.get('/api/pacientesOrdered', async (req, resp) => {
  try{
    const pacientes = await sequelize.query('SELECT * FROM pacientes ORDER BY nome ASC;',{
      type: QueryTypes.SELECT,
    });
    resp.json(pacientes);
  }catch(error){
    console.error('Erro ao buscar pacientes ordenados: ', error);
    resp.status(500).json({error: 'erro ao buscar pacientes A - Z'});
  }
})

app.get('/api/financasCreditos', async (req, resp) => {
  try {
    const credito = await sequelize.query(' select * from `financasEntradas`', {
      type: QueryTypes.SELECT,
    });
    resp.json(credito);
  }
  catch (error) {
    alert('erro ao buscar as finanças', error);
    resp.status(500).json({ error: 'Erro ao buscar financas' });
  }
});

app.get('/api/financasDebitos', async (req, resp) => {
  try {
    const debitos = await sequelize.query(' select * from `financassaidas`', {
      type: QueryTypes.SELECT,
    });
    resp.json(debitos);
  }
  catch (error) {
    alert('erro ao buscar as finanças', error);
    resp.status(500).json({ error: 'Erro ao buscar financas' });
  }
});

// Endpoint para criar um novo paciente
app.post('/pacientes', async (req, res) => {
  const { cpf, nome, email, idade, sobre, naturalidade, frequenciaPagamento, nomeResponsavel, status } = req.body;

  try {
      const novoPaciente = await Paciente.create({
          cpf,
          nome,
          email,
          idade,
          sobre,
          naturalidade,
          frequenciaPagamento,
          nomeResponsavel,
          status
      });
      res.status(201).json(novoPaciente);
  } catch (error) {
      console.error('Erro ao criar o paciente:', error);
      res.status(500).json({ error: 'Erro ao criar o paciente' });
  }
});

/*editar paciente */
app.put('/paciente/:cpf', async (req, res) => {
  const { cpf } = req.params;
  const { nome, email, idade, sobre, naturalidade, frequenciaPagamento, nomeResponsavel, status } = req.body;

  try {
    console.log(`Atualizando paciente com CPF: ${cpf}`);
    console.log('Dados recebidos:', req.body);

    const paciente = await Paciente.findOne({ where: { cpf } });

    if (!paciente) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    const dadosAtualizados = {};
    if (nome) dadosAtualizados.nome = nome;
    if (email) dadosAtualizados.email = email;
    if (idade) dadosAtualizados.idade = idade;
    if (sobre) dadosAtualizados.sobre = sobre;
    if (naturalidade) dadosAtualizados.naturalidade = naturalidade;
    if (frequenciaPagamento) dadosAtualizados.frequenciaPagamento = frequenciaPagamento;
    if (nomeResponsavel) dadosAtualizados.nomeResponsavel = nomeResponsavel;
    if (status) dadosAtualizados.status = status;

    await paciente.update(dadosAtualizados);

    return res.status(200).json({
      message: 'Paciente atualizado com sucesso!',
      data: paciente
    });

  } catch (error) {
    console.error('Erro ao atualizar paciente:', error);
    return res.status(500).json({
      message: 'Erro ao atualizar paciente. Verifique os dados e tente novamente.',
      error: error.message
    });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});