import {Sequelize, QueryTypes} from 'sequelize';

const sequelize = new Sequelize('postgresql://therasync_owner:chY8lTZDbVF5@ep-dawn-dew-a4syknso.us-east-1.aws.neon.tech/therasync?sslmode=require', {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
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

testConnection();

export default sequelize
