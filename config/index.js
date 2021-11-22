require('dotenv').config();

const {
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME
} = process.env

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  port: PORT,
  dbUser: DB_USER,
  dbPassword: DB_PASSWORD,
  dbHost: DB_HOST,
  dbName: DB_NAME,
}
