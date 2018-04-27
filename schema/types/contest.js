const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList
} = require('graphql');
const ContestStatusType = require('./contest-status');
const pgdb = require('../../database/pgdb');
const NameType = require('./names');
module.exports = new GraphQLObjectType({
  name: 'ContestType',
  fields: {
    id: { type: GraphQLID },
    code: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    status: { type: new GraphQLNonNull(ContestStatusType) },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString)
    },
    names: {
      type: new GraphQLList(NameType),
      resolve(obj, args, { pgPool }) {
        return pgdb(pgPool).getNames(obj);
      }
    }
  }
});
