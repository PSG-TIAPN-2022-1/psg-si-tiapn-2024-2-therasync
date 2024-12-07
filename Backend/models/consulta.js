import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import Paciente from './paciente.js';

const Consulta = sequelize.define('consulta', {
  codconsulta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  pacienteCpf: {  // Renomeado para evitar conflito
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

// Ajustando a associação para usar o novo nome do atributo
Consulta.belongsTo(Paciente, { foreignKey: 'pacienteCpf' });

export default Consulta;
