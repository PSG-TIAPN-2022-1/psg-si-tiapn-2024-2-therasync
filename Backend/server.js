import express from 'express';
import cors from 'cors';
import {Sequelize} from 'sequelize';
import {QueryTypes} from 'sequelize';
import { PiAlarmThin } from 'react-icons/pi';
import bodyParser from 'body-parser';
import FinancasEntradas from './models/financasEntradas.js';
import FinancasSaidas from './models/financasSaidas.js';
import Paciente from './models/paciente.js'
import { parseISO, isValid } from 'date-fns';
import { Op } from 'sequelize';

const app = express();
const PORT = 3000;
app.use(bodyParser.json());

const sequelize = new Sequelize('postgresql://therasync_owner:chY8lTZDbVF5@ep-dawn-dew-a4syknso.us-east-1.aws.neon.tech/therasync?sslmode=require', {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
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
    const consultas = await sequelize.query('select paciente.nome, consulta.dataConsulta from paciente inner join consulta where paciente.cpf = consulta.id_paciente;', {
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
    const pacientes = await sequelize.query('select * FROM paciente', {
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
    const credito = await sequelize.query(' select * from financasentradas', {
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
    const debitos = await sequelize.query(' select * from financassaidas', {
      type: QueryTypes.SELECT,
    });
    resp.json(debitos);
  }
  catch (error) {
    
    resp.status(500).json({ error: 'Erro ao buscar financas' });
  }
});


app.put('/api/pacientes/:cpf', async (req, res) => {
  const pacienteCpf = req.params.cpf;
  console.log('CPF recebido:', pacienteCpf); 
  const { nome, email, idade, sobre, naturalidade, frequenciaPagamento, nomeResponsavel, status } = req.body;

  // Validar se os campos obrigatórios estão presentes
  if (!nome || !email || !idade || !naturalidade) {
    return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });
  }

  try {
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

/* deleta paciente */
app.delete('/api/pacientes/:cpf', async (req, res) => {
  const pacienteCpf = req.params.cpf;  // Obtendo o CPF da URL
  console.log('CPF recebido:', pacienteCpf); 

  try {
    // Encontrar o paciente pelo CPF
    const paciente = await Paciente.findOne({ where: { cpf: pacienteCpf } });

    if (!paciente) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    // Deletar o paciente encontrado
    await paciente.destroy();

    return res.status(200).json({ message: 'Paciente deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar paciente:', error);
    return res.status(500).json({ message: 'Erro no servidor', error });
  }
});

/*cria paciente */
app.post('/api/pacientes', async (req, res) => {
  console.log('Body recebido:', req.body);
  const {
    cpf,
    nome,
    email,
    idade,
    sobre,
    naturalidade,
    frequenciapagamento,
    nomeresponsavel,
    valorporconsulta
  } = req.body;

  try {
    // Validando que o CPF já não exista na base
    const pacienteExistente = await Paciente.findOne({
      where: { cpf }
    });

    if (pacienteExistente) {
      return res.status(400).json({ error: 'Paciente com esse CPF já existe.' });
    }

    // Criando o novo paciente
    const novoPaciente = await Paciente.create({
      cpf,
      nome,
      email,
      idade: idade ? new Date(idade) : null,
      sobre,
      naturalidade,
      frequenciapagamento: frequenciapagamento  || 'mensal',
      nomeresponsavel,
      valorporconsulta : 60
    });

    // Respondendo ao cliente
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

  const dataEntradaFormatada = parseISO(dataEntrada);
  if (!isValid(dataEntradaFormatada)) {
    return res.status(400).json({ error: 'Formato de data inválido' });
  }

  try {
    const novaEntrada = await FinancasEntradas.create({
      nome,
      valor,
      dataCredito: dataEntradaFormatada,
    });

    return res.status(201).json({ message: 'Entrada salva com sucesso', data: novaEntrada });
  } catch (error) {
    console.error('Erro ao salvar a entrada:', error);
    return res.status(500).json({ error: 'Erro ao salvar a entrada no servidor' });
  }
});

/* Excluir ganho */
app.delete('/api/financasCreditos/:id', async (req, res) => {
  const idCredito = req.params.id; // Obtém o ID do ganho
  console.log('ID do ganho:', idCredito);

  if (isNaN(idCredito)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    // Procurar a finança pelo ID
    const credito = await FinancasEntradas.findOne({ where: { id: idCredito } });

    // Verificar se a finança existe
    if (!credito) {
      return res.status(404).json({ message: 'Finança de entrada não encontrada' });
    }

    // Excluir a finança encontrada
    await credito.destroy();

    // Retornar uma resposta bem-sucedida
    return res.status(200).json({ message: 'Finança de entrada excluída com sucesso', id: idCredito });
  } catch (error) {
    console.error('Erro ao excluir finança de entrada:', error.message);
    return res.status(500).json({ message: 'Erro interno ao excluir finança de entrada' });
  }
});

/* Excluir saída */
app.delete('/api/financasSaidas/:id', async (req, res) => {
  const idDebito = req.params.id; 
  console.log('ID da saída:', idDebito);

  if (isNaN(idDebito)) {
    return res.status(400).json({ message: 'ID inválido' });
  }

  try {
    const debito = await FinancasSaidas.findOne({ where: { id: idDebito } });

    if (!debito) {
      return res.status(404).json({ message: 'Finança de saída não encontrada' });
    }

    await debito.destroy();

    return res.status(200).json({ message: 'Finança de saída excluída com sucesso', id: idDebito });
  } catch (error) {
    console.error('Erro ao excluir finança de saída:', error.message);
    return res.status(500).json({ message: 'Erro interno ao excluir finança de saída' });
  }
});

// Rota PUT para atualizar um gasto
app.put('/api/gastos/:id', async (req, res) => {
  const gastoId = req.params.id;  // Obtendo o ID do gasto da URL
  console.log('ID do gasto recebido:', gastoId);
  
  const { nome, valor, dataDebito } = req.body;

  // Validar se os campos obrigatórios estão presentes
  if (!nome || !valor || !dataDebito) {
    return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });
  }

  try {
    // Encontrar o gasto pelo ID
    const gasto = await FinancasSaidas.findByPk(gastoId);

    if (!gasto) {
      return res.status(404).json({ message: 'Gasto não encontrado' });
    }

    // Atualizar os dados do gasto
    await gasto.update({
      nome,
      valor,
      dataDebito,
    });

    // Resposta com o gasto atualizado
    res.status(200).json({ message: 'Gasto atualizado com sucesso', gasto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar gasto', error });
  }
});

app.put('/api/ganhos/:id', async (req, res) => {
  const ganhoId = req.params.id;  
  console.log('ID do ganho recebido:', ganhoId);
  console.log('Corpo da requisição:', req.body);  // Adicione esse log para verificar os dados recebidos

  const { nome, valor, dataCredito } = req.body;

  // Validar se os campos obrigatórios estão presentes
  if (!nome || !valor || !dataCredito) {
    return res.status(400).json({ message: 'Campos obrigatórios não preenchidos' });
  }

  try {
    const ganho = await FinancasEntradas.findByPk(ganhoId);
    if (!ganho) {
      return res.status(404).json({ message: 'Ganho não encontrado' });
    }

    await ganho.update({
      nome,
      valor,
      dataCredito,
    });

    res.status(200).json({ message: 'Ganho atualizado com sucesso', ganho });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar ganho', error });
  }
});

app.post('/api/financasDebitos', async (req, res) => {
  const { nome, valor, dataDebito } = req.body;

  if (!nome || !valor || !dataDebito) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  const dataDebitoFormatada = parseISO(dataDebito);
  if (!isValid(dataDebitoFormatada)) {
    return res.status(400).json({ error: 'Formato de data inválido' });
  }

  try {
    const novoDebito = await FinancasSaidas.create({
      nome,
      valor,
      dataDebito: dataDebitoFormatada,
    });

    return res.status(201).json({ message: 'Débito salvo com sucesso', data: novoDebito });
  } catch (error) {
    console.error('Erro ao salvar o débito:', error);
    return res.status(500).json({ error: 'Erro ao salvar o débito no servidor' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});