// src/server.js
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import userTypeDefs  from '../src/graphql/user-graphql/userTypeDefs.js';
import Userresolvers from './graphql/user-graphql/resolversUser.js';
import connectDB from './config/database.js'; // database холболтыг импортлох

const startServer = async () => {
  const app = express();

  // MongoDB холболт хийх
  await connectDB();

  // Apollo Server үүсгэх
  const server = new ApolloServer({ 
     typeDefs:userTypeDefs, 
     resolvers: Userresolvers});
  await server.start();
  server.applyMiddleware({ app });

  // Express сервер эхлүүлэх
  app.listen({ port: 4000 }, () =>
    console.log(`Server is running on http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
