import {DataTypes} from 'sequelize';
import sequelize from '../db.js';

const FinancasSaidas = sequelize.define('financasSaidas', {
    id:  {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    valor: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    datadebito:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    recorrente: {
      type: DataTypes.BOOLEAN
    },
    dataFimDebito:{
      type: DataTypes.DATE,
      allowNull: true,
    }
},
{
  tableName: 'financassaidas',
  timestamps: false
}
);

export default FinancasSaidas;