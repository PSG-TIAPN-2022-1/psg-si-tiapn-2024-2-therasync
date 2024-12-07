import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Paciente from './models/paciente.js';

const Consulta = sequelize.define('consulta', {
  codconsulta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  paciente: {
    type: DataTypes.CHAR(11),
    allowNull: false,
    references: {
      model: Paciente,
      key: 'cpf',
    },
  },
  observacoesconsultas: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  dataconsulta: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  cancelada: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  valorpago: {
    type: DataTypes.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  },
}, {
  tableName: 'consulta',
  timestamps: false,
});

Consulta.belongsTo(Paciente, { foreignKey: 'id_paciente' });

export default Consulta;