import {DataTypes} from 'sequelize';
import sequelize from '../db.js';
const Paciente = sequelize.define('paciente', {
    cpf:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    idade:{
        type: DataTypes.DATE,
    },
    sobre:{type: DataTypes.STRING(500),
        allowNull: false,
    },
    naturalidade:{
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    frequenciaPagamento:{
        type: DataTypes.STRING(7),
        allowNull: false,
    },
    nomeResponsavel: {
        type: DataTypes.STRING(50),
        allowNull: true,
}
},
{
    tableName: 'paciente',
    timestamps: false
}
)
export default Paciente;