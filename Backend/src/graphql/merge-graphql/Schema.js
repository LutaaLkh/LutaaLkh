import { mergeTypeDefs } from '@graphql-tools/merge';
import userTypeDefs from '../user-graphql/userTypeDefs.js';
import cardTypeDefs from '../card-graphql/schemacard.js';

const typeDefs = mergeTypeDefs([userTypeDefs, cardTypeDefs]);

export default typeDefs;
