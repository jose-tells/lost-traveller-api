const express = require('express');
const { port } = require('./config');
const posts = require('./routes/posts');
const users = require('./routes/users');
const {errorHandler, logErrors, wrapErrors} = require('./utils/middlewares/errorHandlers');
const notFoundHandler = require('./utils/middlewares/notFoundHandler');
const debug = require('debug')('app:server')
const error = require('debug')('app:error')

const app = express();
app.use(express.json());

// Routes
users(app);
posts(app);

// errorHandlers
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

// 404 Not found
app.use(notFoundHandler);

app.listen(port, (err) => {
  err ? error(err) : debug(`Server running at port http://localhost:${port}`)
});
