const mysql = require('mysql2');
const { promisify } = require('util');
const debug = require('debug')('app:db');
const error = require('debug')('app:error')

const { dbHost, dbUser, dbPassword, dbName } = require('../config')

const db = {
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName
};

const pool = mysql.createPool(db);

//  If you call pool.getConnection(), you must call connection.release() when you are done using the connection.
pool.getConnection((err, connection) => {
  if (err) {
    error(err);
  };
  // Otherwise, your application will get stuck waiting forever for connections to be returned to the pool once you hit the connection limit.
  if (connection) {
    connection.release();
    debug('Successfully connected to MySQL');
  };
});

pool.query = promisify(pool.query);

module.exports = pool;
