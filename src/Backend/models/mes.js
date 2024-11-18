import {DataTypes} from 'sequelize';
import sequelize from '../db.js';
import Agenda from './agenda.js'

const Mes = sequelize.define('mes', {

    idMes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    mes: {
    type: DataTypes.STRING(9),
    },
    ano: {
        type: DataTypes.INTEGER
    },
    AgendaID: {
        type: DataTypes.INTEGER,
        references:{
            model: Agenda,
            key: 'id'
        }
    }
    },
    {
        tableName: 'mes',
        timestamps: false
});
Mes.belongsTo(Agenda, { foreignKey: 'id' });

export default Mes;