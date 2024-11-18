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
    },
    horarioInicio: {
        type: DataTypes.STRING(5)
    },
    horarioFim: {
        type: DataTypes.STRING(5)
    },
    diaID: {
        type: DataTypes.INTEGER,
        references:{
            model: Dia,
            key: 'id'
        }
    }
});

Evento.belongsTo(Dia, { foreignKey: 'id' });

export default Evento;