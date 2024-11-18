import {DataTypes} from 'sequelize';
import sequelize from '../db.js';

const User = sequelize.define('user', {
    username:  {
      type: DataTypes.STRING(15),
      primaryKey: true
    },
    nivel: {
      type: DataTypes.STRING(20),
      allowNull: false
    } ,
    senha: {
      type: DataTypes.STRING(20),
      allowNull: false
    }
},{
  tableName: 'usuarios',
  timestamps: false
});

export default User;