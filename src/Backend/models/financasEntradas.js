import {DataTypes} from 'sequelize';
import sequelize from '../db.js';

const FinancasEntradas = sequelize.define('financasEntrada', {
    id:  {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(15),
      allowNull: false
    } ,
    valor: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    datacredito:{
        type: DataTypes.DATE
    },
    recorrente: {
      type: DataTypes.BOOLEAN
    }
},{
  tableName: 'financasentradas',
  timestamps: false
}
);

export default FinancasEntradas;