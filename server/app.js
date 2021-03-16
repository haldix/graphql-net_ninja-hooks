const express = require('express');
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config();

const schema = require('./schema/schema');
const connectDB = require('./db.js');
const cors = require('cors');

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to mlab database
connectDB();

// bind express with graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('now listening for requests on port 4000');
});
