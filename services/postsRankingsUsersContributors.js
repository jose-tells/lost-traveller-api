const MongoLib = require('../lib/mongo');

class PostsRankingsUsersContributorsService {
  constructor() {
    this.collection = 'posts-rankings-users-contributors';
    this.mongoDB = new MongoLib();
  }

  async getPostsRankingsUsersContributors(postRankingId) {
    const query = postRankingId && { postRankingId };
    const postsRankingsUsersContributors = await this.mongoDB.getAll(this.collection, query);
    return postsRankingsUsersContributors || [];
  }

  async createPostsRankingsUsersContributors({ userContributor }) {
    const createdPostsRankingsUsersContributorsId = await this.mongoDB.create(this.collection, userContributor);
    return createdPostsRankingsUsersContributorsId;
  }

  async updatePostsRankingsUsersContributors({ postRankingUserContributorId, userContributor }) {
    const updatedPostRankingUserContributorId = await this.mongoDB.update(this.collection, postRankingUserContributorId, userContributor);
    return updatedPostRankingUserContributorId;
  }

  async deletePostsRankingsUsersContributors(postRankingUserContributorId) {
    const deletedPostRankingsUserContributorId = await this.mongoDB.delete(this.collection, postRankingUserContributorId);
    return deletedPostRankingsUserContributorId;
  }
}

module.exports = PostsRankingsUsersContributorsService;