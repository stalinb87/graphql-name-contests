const { nodeEnv } = require('./util');
console.log(`Running in ${nodeEnv} mode...`);

// Read the query from the command line arguments

const app = require('express')();
const ncSchema = require('../schema');
const { graphql } = require('graphql');
const graphqlHTTP = require('express-graphql');
const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);
const { MongoClient } = require('mongodb');
const assert = require('assert');
const mConfig = require('../config/mongo')[nodeEnv];

MongoClient.connect(mConfig.url, (err, mPool) => {
  assert.equal(err, null);
  app.use(
    '/graphql',
    graphqlHTTP({
      schema: ncSchema,
      graphiql: true,
      context: {
        pgPool,
        mPool
      }
    })
  );
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server Listenning on port ${PORT}`);
  });
});
