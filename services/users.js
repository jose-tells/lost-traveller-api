const pool = require('../lib/mysql');

class UsersService {
  constructor() {
    this.table = 'users';
    this.pool = pool;
  }

  async getUsers() {
    const query = 'SELECT * FROM users;';
    const users = await this.pool.query(query);
    return users || [];
  }

  async getUser(userId) {
    const query = 'SELECT * FROM users WHERE user_id = ?';
    const user = await this.pool.query(query, [userId]);
    return user[0] || {};
  }

  async createUser(user) {
    const query = 'INSERT INTO users set ?';
    const userId = await this.pool.query(query, [user]);
    return userId.insertId;
  }

  async deleteUser(userId) {
    const query = 'DELETE FROM users WHERE user_id = ?';
    await this.pool.query(query, [userId]);
    return userId;
  }
};

module.exports = UsersService;