import {DataTypes} from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define('user', {

    nome: {
      type: DataTypes.STRING(50)
    },
    email:  {
      type: DataTypes.STRING(100),
      primaryKey: true,
      unique: true,
      allowNull: false
    },
    nivel: {
      type: DataTypes.STRING(20),
      allowNull: false
    } ,
    senha: {
      type: DataTypes.STRING(120),
      allowNull: false
    }
},{
  tableName: 'usuarios',
  timestamps: false
});

export default User;
