import express from 'express';
import cors from 'cors';
import {Sequelize} from 'sequelize';
import {QueryTypes} from 'sequelize';
import { PiAlarmThin } from 'react-icons/pi';
import bodyParser from 'body-parser';
import FinancasEntradas from './models/financasEntradas.js';

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

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


app.get('/api/financasCreditos', async (req, resp) => {
  try {
    const credito = await sequelize.query(' select * from `financasEntradas`', {
      type: QueryTypes.SELECT,
    });
    resp.json(credito);
  }
  catch (error) {
    
    resp.status(500).json({ error: 'Erro ao buscar financas' });
  }
});

app.get('/api/financasDebitos', async (req, resp) => {
  try {
    const debitos = await sequelize.query(' select * from `financasSaidas`', {
      type: QueryTypes.SELECT,
    });
    resp.json(debitos);
  }
  catch (error) {
    
    resp.status(500).json({ error: 'Erro ao buscar financas' });
  }
});

/*editar paciente*/
app.put('/api/pacientes/:cpf', async (req, res) => {
  const pacienteCpf = req.params.cpf;  // Obtendo o CPF da URL
  console.log('CPF recebido:', pacienteCpf); 
  const { nome, email, idade, sobre, naturalidade, frequenciaPagamento, nomeResponsavel, status } = req.body;

  // Validar se os campos obrigatórios estão presentes
  if (!nome || !email || !idade || !naturalidade) {
    return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });
  }

  try {
    // Encontrar o paciente pelo CPF
    const paciente = await Paciente.findOne({ where: { cpf: pacienteCpf } });

    if (!paciente) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    // Atualizar os dados do paciente
    await paciente.update({
      nome,
      email,
      idade,
      sobre,
      naturalidade,
      frequenciaPagamento,
      nomeResponsavel,
      status
    });

    // Resposta com o paciente atualizado
    res.status(200).json({ message: 'Paciente atualizado com sucesso', paciente });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar paciente', error });
  }
});

/* Novo paciente */
app.post('/api/pacientes', async (req, res) => {
  console.log('Body recebido:', req.body);  // Verifique o que está chegando no corpo da requisição

  const {
    cpf,
    nome,
    email,
    idade,
    sobre,
    naturalidade,
    frequenciaPagamento,
    nomeResponsavel,
  } = req.body;

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
      status: true, 
    });

    res.status(201).json({
      message: 'Paciente criado com sucesso!',
      paciente: novoPaciente,
    });

  } catch (error) {
    console.error('Erro ao criar o paciente:', error);
    res.status(500).json({ error: 'Erro ao criar paciente' });
  }
});

app.post('/api/financasCreditos', async (req, res) => {
  const { nome, valor, dataEntrada } = req.body;

  if (!nome || !valor || !dataEntrada) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const novaEntrada = await FinancasEntradas.create({
      nome,
      valor,
      dataEntrada,
    });

    return res.status(201).json({ message: 'Dados salvos com sucesso', data: novaEntrada });
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    return res.status(500).json({ error: 'Erro ao salvar os dados no servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});