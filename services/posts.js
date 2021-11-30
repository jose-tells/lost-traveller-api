// const pool = require('../lib/mysql');
const MongoLib = require('../lib/mongo');

class PostsService {
  constructor() {
    this.collection = 'posts';
    this.mongoDB = new MongoLib();
  }

  async getPosts({ rankings }) {
    const query = rankings && { rankings: { $in: rankings } };
    // const query = `SELECT * FROM ${this.table}`;
    const posts = await this.mongoDB.getAll(this.collection, query)
    return posts || [];
  }

  async getPost(postId) {
    // const query = `SELECT * FROM ${this.table} WHERE post_id = ?`;
    const post = await this.mongoDB.get(this.collection, postId)
    return post || {};
  }

  async createPost({ post }) {
    // const query = `INSERT INTO ${this.table} set ?`;
    const createdPostId = await this.mongoDB.create(this.collection, post);
    return createdPostId;
  }

  async updatePost({ postId, post } = {}) {
    const updatedPostId = await this.mongoDB.update(this.collection, postId, post);
    return updatedPostId;
  }

  async deletePost(postId) {
    // const query = `DELETE FROM ${this.table} WHERE post_id = ?`
    const deletedPostId = await this.mongoDB.delete(this.collection, postId);
    return deletedPostId;
  }
};

module.exports = PostsService;
