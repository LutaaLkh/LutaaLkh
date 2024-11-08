// src/graphql/schema.js
import { gql } from 'apollo-server-express';

const typeDefs = gql`
  # Хэрэглэгчийн оруулах мэдээллийн төрөл
   type Query {
    # Бүх хэрэглэгчийг авах
    getUsers: [User]
    getUser(id: ID!): User
  }
  input UserInput {
    name: String!
    email: String!
    password: String!
    createdBy: String
  }

  # Хэрэглэгчийн мэдээллийн төрөл
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    createdAt: String
    updatedAt: String
    createdBy: String
    deleted: Boolean
  }

  # Асуугчдын үндсэн төрөл
  type Query {
    # Бүх хэрэглэгчийг авах
    getUsers: [User]
    # Нэг хэрэглэгчийг ID-ээр нь авах
    getUser(id: ID!): User
  }

  # Мутациуд
  type Mutation {
    # Хэрэглэгчийг шинээр үүсгэх
    createUser(input: UserInput!): User
    # Хэрэглэгчийн мэдээллийг шинэчлэх
    updateUser(id: ID!, input: UserInput!): User
    # Хэрэглэгчийг устгах
    deleteUser(id: ID!): User
  }
`;

export default typeDefs;
