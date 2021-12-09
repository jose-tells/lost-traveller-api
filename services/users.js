// const pool = require('../lib/mysql');
const MongoLib = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UsersService {
  constructor() {
    this.collection = 'users';
    this.mongoDB = new MongoLib();
  }

  async getUserByUsername({ username }) {
    const user = await this.mongoDB.getByUsername(this.collection, username);
    delete user.password
    delete user.email
    return user || {};
  };

  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  async createUser({ user }) {
    const { password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUserId = await this.mongoDB.create(this.collection, {
      ...user,
      password: hashedPassword
    });

    return createdUserId;
  }
};

module.exports = UsersService;