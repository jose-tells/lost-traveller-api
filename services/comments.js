const MongoLib = require('../lib/mongo');

class CommentsService {
  constructor() {
    this.collection = 'comments';
    this.mongoDB = new MongoLib();
  }

  async getComments({ postId }) {
    const query = postId && { postId }
    const comments = await this.mongoDB.getAll(this.collection, query);
    return comments || []
  }

  async getComment(commentId) {
    const comment = await this.mongoDB.get(this.collection, commentId);
    return comment || {}
  }

  async createComment({ comment }) {
    const createdCommentId = await this.mongoDB.create(this.collection, comment);
    return createdCommentId;
  }

  async updateComment({ commentId, comment } = {}) {
    const updatedCommentId = await this.mongoDB.update(this.collection, commentId, comment);
    return updatedCommentId
  }

  async deleteComment(commentId) {
    const deletedCommentId = await this.mongoDB.delete(this.collection, commentId);
    return deletedCommentId;
  }
};

module.exports = CommentsService;