const { Sequelize } = require('sequelize');

database_name = process.env.DATABASE_NAME || 'inventory'
database_user = process.env.DATABASE_USER || 'root'
database_password = process.env.DATABASE_PASSWORD || ''
database_host = process.env.DATABASE_HOST || 'localhost'

// Connect to MySQL Database
const sequelize = new Sequelize(database_name, database_user, database_password, {
  host: database_host,
  dialect: 'mysql'
});

module.exports = sequelize;