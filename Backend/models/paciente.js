import {DataTypes} from 'sequelize';
import sequelize from '../db.js';
const Paciente = sequelize.define('paciente', {
    cpf:{
        type: DataTypes.STRING(11),
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
    frequenciapagamento:{
        type: DataTypes.STRING(7),
        allowNull: false,
    },
    nomeresponsavel: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    valorporconsulta: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

},
{
    tableName: 'paciente',
    timestamps: false
}
)
export default Paciente;