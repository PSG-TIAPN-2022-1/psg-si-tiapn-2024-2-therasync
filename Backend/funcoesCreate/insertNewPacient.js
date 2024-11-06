import sequelize from '../db.js';
import Paciente from '../models/paciente.js';

async function CriarNovoPaciente(cpf, nome, email, idade, sobre, naturalidade, frequenciaPagamento, nomeResponsavel){
    try{
        const NovoPaciente = await Paciente.create({
            cpf: cpf,
            nome: nome,
            email: email,
            idade: idade,
            sobre: sobre,
            naturalidade: naturalidade,
            frequenciaPagamento: frequenciaPagamento,
            nomeResponsavel: nomeResponsavel,
        })
        console.log('Paciente criado com sucesso', NovoPaciente.toJSON())
    }
    catch(error){
        console.log('Erro ao criar o registro', error)
    }
    finally{
        await sequelize.close();
    }
}

CriarNovoPaciente(4, 'Gustavo', 'Gustav@gmail.com', '2024-11-10', 'Tenho TDAH moderado e problemas com ansiedade, de forma que atrapalhe meus estudos' , 'São Paulo', 'mensal', '');