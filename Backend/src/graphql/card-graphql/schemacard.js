import { gql } from 'apollo-server-express';

const CardDefs = gql`
  type SafetyMeasure {
    name: String!
    details: String!
  }

  type Organization {
    name: String!
    location: String
    equipment: String
    document_number: String
  }

  type TechnologyCard {
    title: String!
    description: String!
    TK_number: String!
    organization: Organization!
    goal: String!
  }

  type Card {
    id: ID!
    technology_card: TechnologyCard!
    risk_sources: [String]
    related_documents: [String]
    safety_measures: [SafetyMeasure]
  }

  input SafetyMeasureInput {
    name: String!
    details: String!
  }

  input OrganizationInput {
    name: String!
    location: String
    equipment: String
    document_number: String
  }

  input TechnologyCardInput {
    title: String!
    description: String!
    TK_number: String!
    organization: OrganizationInput!
    goal: String!
  }

  input CardInput {
    technology_card: TechnologyCardInput!
    risk_sources: [String]
    related_documents: [String]
    safety_measures: [SafetyMeasureInput]
  }

  type Query {
    getCards: [Card]
    getCard(id: ID!): Card
  }

  type Mutation {
    createCard(input: CardInput!): Card
    updateCard(id: ID!, input: CardInput!): Card
    deleteCard(id: ID!): Card
  }
`;

export default CardDefs;
