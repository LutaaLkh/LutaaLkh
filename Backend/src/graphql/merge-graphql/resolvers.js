import { mergeResolvers } from '@graphql-tools/merge';
import userResolvers from '../user-graphql/resolversuser.js';
import cardResolvers from '../card-graphql/resolverscard.js';

const resolvers = mergeResolvers([userResolvers, cardResolvers]);

export default resolvers;
