import {DataTypes} from 'sequelize';
import sequelize from '../db.js';
import Dia from './dia.js';

const Evento = sequelize.define('dia',{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    nomeEvento: {
    type: DataTypes.STRING(15),
    allowNull: false
    },
    horarioInicio: {
        type: DataTypes.STRING(5),
        allowNull: false
    },
    horarioFim: {
        type: DataTypes.STRING(5),
        allowNull: false
    },
    diaID: {
        type: DataTypes.INTEGER,
        references:{
            model: Dia,
            key: 'id'
        },
        allowNull: false
    }
},
{tableName: 'eventos',
    timestamps: false
});

Evento.belongsTo(Dia, { foreignKey: 'id' });

export default Evento;