const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLInt
} = require('graphql');
const { fromSnakeCase } = require('../../lib/util');
const ContestType = require('./contest');
const pgdb = require('../../database/pgdb');
const mdb = require('../../database/mdb');
module.exports = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: obj => `${obj.firstName} ${obj.lastName}`
    },
    email: {
      type: new GraphQLNonNull(GraphQLString)
    },
    constest: {
      type: new GraphQLList(ContestType),
      resolve(obj, args, { pgPool }) {
        return pgdb(pgPool).getContests(obj);
      }
    },
    contestsCount: {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName }) {
        return mdb(mPool).getCounts(obj, fieldName);
      }
    },
    namesCount: {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName }) {
        return mdb(mPool).getCounts(obj, fieldName);
      }
    },
    votesCount: {
      type: GraphQLInt,
      resolve(obj, args, { mPool }, { fieldName }) {
        return mdb(mPool).getCounts(obj, fieldName);
      }
    }
  }
});
