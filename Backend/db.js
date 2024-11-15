import {Sequelize, QueryTypes} from 'sequelize';

const sequelize = new Sequelize('therasync', 'root', '', {
    host: 'localhost',   
    dialect: 'mysql',    
    port: 3306         
  });

async function testConnection(){
   try {
    await sequelize.authenticate();
    console.log('Conexão estabelecida')
   }
   catch(error){
    console.error("Conexão não estabelecida",error)
   }
}

export default sequelize
