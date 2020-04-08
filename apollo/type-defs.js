import gql from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    viewer: User
  }

  type Mutation {
    login(username: String!, password: String!): User!
    logout: Boolean!
  }
`
