const { ObjectId, MongoClient } = require('mongodb');
const { dbName, dbHost, dbUser, dbPassword } = require('../config');

const DB_USER = encodeURIComponent(dbUser);
const DB_PASSWORD = encodeURIComponent(dbPassword);

const MongoURI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${dbHost}/${dbName}?retryWrites=true&w=majority`

class MongoLib {
  constructor() {
    this.client = new MongoClient(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = dbName;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }

          const debug = require('debug')('app:db');
          debug('Successfully connected to MongoDB');
          resolve(this.client.db(this.dbName));
        })
      });
    }
    return MongoLib.connection;
  }

  async getAll(collection, query) {
    const db = await this.connect();
    const result = await db.collection(collection).find(query).toArray();
    return result;
  }

  async get(collection, id) {
    const db = await this.connect();
    const result = await db.collection(collection).findOne({ _id: ObjectId(id) });
    return result;
  }

  async getByUsername(collection, username) {
    const db = await this.connect();
    const result = await db.collection(collection).findOne({ username });
    return result;
  }

  async create(collection, data) {
    const db = await this.connect();
    await db.collection('users').createIndex({ email: 1}, { unique: true });
    await db.collection('users').createIndex({ username: -1}, { unique: true });
    const result = await db.collection(collection).insertOne(data)
    return result.insertedId
  }

  async update(collection, id, data) {
    const db = await this.connect();
    const result = await db.collection(collection).updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
    return result.upsertedId || id;
  }

  async delete(collection, id) {
    const db = await this.connect();
    await db.collection(collection).deleteOne({ _id: ObjectId(id) });
    return id;
  }
}

module.exports = MongoLib;