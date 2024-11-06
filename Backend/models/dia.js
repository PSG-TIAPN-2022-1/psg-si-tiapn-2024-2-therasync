import {DataTypes} from 'sequelize';
import sequelize from '../db.js';
import Mes from './mes.js';

const Dia = sequelize.define('dia', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    mesID: {
        type: DataTypes.INTEGER,
        references:{
            model: Mes,
            key: 'idMes'
        }
    }
});

Dia.belongsTo(Mes, { foreignKey: 'idMes' });

export default Dia;