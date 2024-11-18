import {DataTypes} from 'sequelize';
import sequelize from '../db.js';

const Agenda = sequelize.define('consulta', {
id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
},
nomeAgenda: {
type: DataTypes.STRING(30),
allowNull: false
},
descricao: {
    type: DataTypes.STRING(30),
    allowNull: false
}
},
{tableName: 'agenda',
    timestamps: false
});

export default Agenda;