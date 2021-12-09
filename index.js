const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

const { port } = require('./config');
const users = require('./routes/users');
const posts = require('./routes/posts');
const userPosts = require('./routes/userPosts');
const auth = require('./routes/auth');
const comments = require('./routes/comments');
const userComments = require('./routes/userComments');
const rankings = require('./routes/rankings');
const postsRankings = require('./routes/postsRankings');
const postsRankingsUsersContributors = require('./routes/postsRankingsUsersContributors');

const debug = require('debug')('app:server')
const error = require('debug')('app:error')

const corsOptions = {
  origin: 'http://localhost:3001/'
}

app.use(cors(corsOptions));
app.use(helmet());

const {
  errorHandler,
  logErrors,
  wrapErrors
} = require('./utils/middlewares/errorHandlers');

const notFoundHandler = require('./utils/middlewares/notFoundHandler');

app.use(express.json());

// Routes
auth(app);
users(app)
posts(app);
comments(app);
userPosts(app);
userComments(app);
rankings(app);
postsRankings(app)
postsRankingsUsersContributors(app)

// errorHandlers
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

// 404 Not found
app.use(notFoundHandler);

app.listen(port, (err) => {
  err ? error(err) : debug(`Server running at port http://localhost:${port}`)
});
