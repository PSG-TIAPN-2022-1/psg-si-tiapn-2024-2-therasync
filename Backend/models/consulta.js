import {DataTypes} from 'sequelize';
import sequelize from '../db.js';
import Paciente from '.models/paciente.js'
const Consulta = sequelize.define('consulta', {

CodConsulta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
},
id_paciente: {
type: DataTypes.INTEGER,
allowNull: false,
primaryKey: true,
references:{
    model: Paciente,
    key: 'cpf'
},
allowNull: false
}
},
{tableName: 'cliente',
    timestamps: false
}

)
Consulta.belongsTo(Paciente, { foreignKey: 'idPaciente' });

export default Consulta;