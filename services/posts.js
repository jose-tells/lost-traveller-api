const pool = require('../lib/mysql');

class PostsService {
  constructor() {
    this.table = 'posts';
    this.pool = pool;
  }

  async getPosts() {
    const query = `SELECT * FROM ${this.table}`;
    const posts = await this.pool.query(query);
    return posts;
  }

  async getPost(postId) {
    const query = `SELECT * FROM ${this.table} WHERE post_id = ?`;
    const post = await this.pool.query(query, [postId]);
    return post[0] || {};
  }

  async createPost(post) {
    const query = `INSERT INTO ${this.table} set ?`;
    const postId = await this.pool.query(query, [post]);
    return postId.insertId
  }

  async deletePost(postId) {
    const query = `DELETE FROM ${this.table} WHERE post_id = ?`
    await this.pool.query(query, [postId]);
    return postId;
  }
};

module.exports = PostsService;
