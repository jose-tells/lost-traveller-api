const MongoLib = require('../lib/mongo');

class UserCommentsService {
  constructor() {
    this.collection = 'User-comments';
    this.mongoDB = new MongoLib();
  }

  async getUserComments({ userId }) {
    const query = userId && { userId };
    const userComments = await this.mongoDB.getAll(this.collection, query);
    return userComments || [];
  }

  async createUserComment({ userComment }) {
    const createdUserCommentId = await this.mongoDB.create(this.collection, userComment);
    return createdUserCommentId;
  }

  async deleteUserComment({ userCommentId }) {
    const deletedUserCommentId = await this.mongoDB.delete(this.collection, userCommentId);
    return deletedUserCommentId;
  }
};

module.exports = UserCommentsService;