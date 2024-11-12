// graphql/schemas/user.js
import { gql } from 'apollo-server';
import cardTypeDefs from '../card-graphql/schemaCard.js'; // Эндээс Card схемийг импортлох
export const userTypeDefs = gql`
  # Хэрэглэгчийн төрөл
  ${cardTypeDefs}
  type User {
    id: ID!
    name: String!
    email: String!
    createdBy: String
    deleted: Boolean
    createdAt: String!
    updatedAt: String!
    cards: [Card!]! # Хэрэглэгчийн холбогдсон картууд
  }

  # Хэрэглэгчийн шинээр үүсгэх мэдээллийн төрөл
  input CreateUserInput {
    name: String!
    email: String!
    password: String!
    createdBy: String
  }

  # Хэрэглэгчийн мэдээлэл шинэчлэх төрөл
  input UpdateUserInput {
    name: String
    email: String
    password: String
    updatedBy: String
  }

  # Хүсэлтүүд (Queries)
  type Query {
    getUsers: [User!]! # Бүх хэрэглэгчийг авах
    getUser(id: ID!): User # Нэг хэрэглэгчийг авах
  }

  # Өөрчлөлтүүд (Mutations)
  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUser(id: ID!, input: UpdateUserInput!): User
    deleteUser(id: ID!): User
    addCardToUser(userId: ID!, cardId: ID!): User # Хэрэглэгчид карт нэмэх
  }
`;

export default userTypeDefs;