const Consulta = sequelize.define('consulta', {
  codconsulta: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  id_paciente: {  // Alterado para refletir o nome correto da coluna
    type: DataTypes.CHAR(11),
    allowNull: false,
    references: {
      model: Paciente,
      key: 'cpf', // O campo no modelo `Paciente`
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

// Ajustar o relacionamento
Consulta.belongsTo(Paciente, { foreignKey: 'id_paciente' });

export default Consulta;
