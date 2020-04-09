import gql from 'graphql-tag'

export const typeDefs = gql`
  type AuthenticatedUser {
    fullName: String!
    email: String!
  }
  
  type User {
    id: ID!
    fullName: String!
    email: String!
    username: String!
  }
  
  type Post {
    id: ID!
    title: String
    body: String
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    authenticatedUser: AuthenticatedUser!
    
    user: User!
    users: [User]
    
    post(id: ID!): Post!
    posts: [Post]
  }

  type Mutation {
    login(username: String!, password: String!): AuthenticatedUser!
    logout: Boolean!
    
    createPost(title: String!, body: String): Post!
    updatePost(id: ID!, title: String, body: String): Post!
  }
`
