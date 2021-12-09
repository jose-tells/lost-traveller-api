const MongoLib = require('../lib/mongo');

class RankingsServices {
  constructor() {
    this.collection = 'rankings';
    this.mongoDB = new MongoLib();
  }

  async getRankings(postId) {
    const query = postId && { postId };
    const rankings = await this.mongoDB.getAll(this.collection, query);
    return rankings || [];
  }

  async createRanking({ ranking }) {
    const createdRankingId = await this.mongoDB.create(this.collection, ranking);
    return createdRankingId;
  }

  async deleteRanking(rankingId) {
    const deletedRankingId = await this.mongoDB.delete(this.collection, rankingId);
    return deletedRankingId;
  }
}

module.exports = RankingsServices;
