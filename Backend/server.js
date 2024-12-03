import express from 'express';
import cors from 'cors';
import {Sequelize} from 'sequelize';
import {QueryTypes} from 'sequelize';
import { PiAlarmThin } from 'react-icons/pi';
import bodyParser from 'body-parser';
import FinancasEntradas from './models/financasEntradas.js';
import FinancasSaidas from './models/financasSaidas.js';
import Paciente from './models/paciente.js';
import Consulta from './models/consulta.js';
import User from './models/users.js';
import { parseISO, isValid } from 'date-fns';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
      const users = await sequelize.query('SELECT * FROM usuarios', {
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
    const consultas = await sequelize.query('SELECT paciente.nome, consulta.dataConsulta FROM paciente INNER JOIN consulta ON paciente.cpf = consulta.id_paciente;', {
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


app.delete('/api/pacientes/:cpf', async (req, res) => {
  const pacienteCpf = req.params.cpf; 
  console.log('CPF recebido:', pacienteCpf); 

  try {
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

  const dataFormatada = new Date(dataEntrada).toISOString();

  try {
    const [results, metadata] = await sequelize.query(
      `
      INSERT INTO FinancasEntradas (nome, valor, datacredito) 
      VALUES (:nome, :valor, :dataEntrada)
      RETURNING *;
      `,
      {
        replacements: { nome, valor, dataEntrada: dataFormatada },
        type: sequelize.QueryTypes.INSERT,
      }
    );

    return res.status(201).json({ message: 'Entrada salva com sucesso', data: results[0] });
  } catch (error) {
    console.error('Erro ao salvar a entrada:', error);
    return res.status(500).json({ error: 'Erro ao salvar a entrada no servidor' });
  }
});


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

app.use(express.json());
const SECRET = 'JoaoVitorClienteTheraSync';

app.get('/api/validate', verificarJWT, (req, res) => {
  // Se o token for válido, a requisição vai continuar aqui
  res.status(200).json({ message: 'Token válido', userID: req.UserID });
});
//VerificarLogin
function verificarJWT(req,res){
  const token = req.headers['x-access-token'];
  jwt.verify(token, SECRET, (err, decoded) => {
    if(err) return res.status(401).end();

    req.UserID = decoded.UserID;
    next();
  })
}


app.post('/api/users', async (req, res) => {
  const {email, senha} = req.body;
  const usuario = await User.findOne({ where: {email: email.trim().toLowerCase()}
});
  if(!usuario){
    return res.json({auth: false});
  };
  const Verificacao = await bcrypt.compare(senha, usuario.senha);

  if(!Verificacao){
    return res.json({auth: false});
  }
  const token = jwt.sign({UserID: usuario.id},SECRET, {expiresIn: 300})
  return res.json({auth: true, token});
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
  const { nome, valor, dataDebito, recorrente } = req.body;

  if (!nome || !valor || !dataDebito || recorrente === undefined) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  // Validar e formatar a data
  const dataDebitoFormatada = parseISO(dataDebito);
  if (!isValid(dataDebitoFormatada)) {
    return res.status(400).json({ error: 'Formato de data inválido' });
  }
  const dataDebitoISO = dataDebitoFormatada.toISOString();

  try {
    // Inserir débito no banco usando sequelize.query
    const [results, metadata] = await sequelize.query(
      `
      INSERT INTO FinancasSaidas (nome, valor, datadebito, recorrente) 
      VALUES (:nome, :valor, :dataDebito, :recorrente)
      RETURNING *;
      `,
      {
        replacements: { nome, valor, dataDebito: dataDebitoISO, recorrente },
        type: sequelize.QueryTypes.INSERT,
      }
    );

    return res.status(201).json({ message: 'Débito salvo com sucesso', data: results[0] });
  } catch (error) {
    console.error('Erro ao salvar o débito:', error);
    return res.status(500).json({ error: 'Erro ao salvar o débito no servidor' });
  }
});

app.post('/api/consultas', async (req, res) => {
  const { id_paciente, observacoesconsultas, dataconsulta } = req.body;

  const dataFormatada = new Date(dataconsulta);

  if (isNaN(dataFormatada)) {
    return res.status(400).send('Data inválida');
  }

  try {
    // Se a data for válida, converte para ISO 8601
    const novaConsulta = await sequelize.query(
      `INSERT INTO consulta (id_paciente, observacoesconsultas, dataconsulta) 
      VALUES ($1, $2, $3) RETURNING *`,
      {
        bind: [id_paciente, observacoesconsultas, dataFormatada.toISOString()]
      }
    );

    res.status(201).json(novaConsulta[0][0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao inserir consulta');
  }
});



app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});