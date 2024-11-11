// graphql/schemas/card.js
import { gql } from 'apollo-server-express';

export const cardTypeDefs = gql`
  # Аюулгүй ажиллагааны арга хэмжээний төрөл
  type SafetyMeasure {
    name: String!
    details: String!
  }

  # Байгууллагын мэдээллийн төрөл
  type Organization {
    name: String!
    location: String
    equipment: String
    document_number: String
  }

  # Технологийн картын төрөл
  type TechnologyCard {
    title: String!
    description: String!
    TK_number: String!
    organization: Organization!
    goal: String!
  }

  # Картын төрөл
  type Card {
    id: ID!
    technology_card: TechnologyCard!
    risk_sources: [String]
    related_documents: [String]
    safety_measures: [SafetyMeasure]
  }

  # Аюулгүй ажиллагааны арга хэмжээний орц
  input SafetyMeasureInput {
    name: String!
    details: String!
  }

  # Байгууллагын орц
  input OrganizationInput {
    name: String!
    location: String
    equipment: String
    document_number: String
  }

  # Технологийн картын орц
  input TechnologyCardInput {
    title: String!
    description: String!
    TK_number: String!
    organization: OrganizationInput!
    goal: String!
  }

  # Картын орц
  input CardInput {
    technology_card: TechnologyCardInput!
    risk_sources: [String]
    related_documents: [String]
    safety_measures: [SafetyMeasureInput]
  }

  # Хүсэлтүүд (Queries)
  type Query {
    getCards: [Card]
    getCard(id: ID!): Card
  }

  # Өөрчлөлтүүд (Mutations)
  type Mutation {
    createCard(input: CardInput!): Card
    updateCard(id: ID!, input: CardInput!): Card
    deleteCard(id: ID!): Card
  }
`;

export default cardTypeDefs;