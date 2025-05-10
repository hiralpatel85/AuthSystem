const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbUrl = process.env.DB_URL
const sequelize = new Sequelize(dbUrl, {
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => console.log('Database connected!'))
  .catch((err) => console.log('Error: ' + err));

module.exports = sequelize;
