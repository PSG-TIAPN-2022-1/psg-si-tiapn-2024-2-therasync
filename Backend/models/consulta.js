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
},
observacoesConsultas: {
    type: DataTypes.STRING(500),
    allowNull: true,

},
dataConsulta: {
    type: DataTypes.DATE,
    allowNull: false
}
},
{tableName: 'consulta',
    timestamps: false
}

)
Consulta.belongsTo(Paciente, { foreignKey: 'idPaciente' });

export default Consulta;