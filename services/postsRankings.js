const MongoLib = require('../lib/mongo');

class PostsRankingsService {
  constructor() {
    this.collection = 'posts-rankings';
    this.mongoDB = new MongoLib();
  }

  async getPostsRankings(postId) {
    const query = postId && { postId };
    const postRankings = await this.mongoDB.getAll(this.collection, query);
    return postRankings || [];
  }

  async createPostRanking({ postRanking }) {
    const createdPostRankingId = await this.mongoDB.create(this.collection, postRanking);
    return createdPostRankingId;
  }

  async updatePostRankings({ postRankingId, postRanking } = {}) {
    const updatedPostRankingId = await this.mongoDB.update(this.collection, postRankingId, postRanking);
    return updatedPostRankingId;
  }

  async deletePostRankings(postRankingId) {
    const deletedPostRankingId = await this.mongoDB.delete(this.collection, postRankingId);
    return deletedPostRankingId;
  }
}

module.exports = PostsRankingsService;