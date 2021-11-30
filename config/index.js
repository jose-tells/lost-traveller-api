require('dotenv').config();

const {
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  DEFAULT_ADMIN_PASSWORD,
  DEFAULT_USER_PASSWORD,
  AUTH_JWT_SECRET,
  PUBLIC_API_KEY_TOKEN,
  ADMIN_API_KEY_TOKEN,
} = process.env

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  port: PORT,
  dbUser: DB_USER,
  dbPassword: DB_PASSWORD,
  dbHost: DB_HOST,
  dbName: DB_NAME,
  defaultAdminPassword: DEFAULT_ADMIN_PASSWORD,
  defaultUserPassword: DEFAULT_USER_PASSWORD,
  authJwtSecret: AUTH_JWT_SECRET,
  publicApiKeyToken: PUBLIC_API_KEY_TOKEN,
  adminApiKeyToken: ADMIN_API_KEY_TOKEN,
}
