import gql from 'graphql-tag'

export const typeDefs = gql`
  type UserPermission {
    scope: String
    contentType: String
    roles: String
  }
  
  type AuthenticatedUser {
    fullName: String!
    email: String!
    groups: [String]
    permissions: [UserPermission]
  }
  
  type User {
    id: Int!
    fullName: String!
    email: String!
    username: String!
  }
  
  type Post {
    id: Int!
    title: String
    content: String
  }
  
  type Scope {
    id: Int!
    codename: String!
    name: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type Query {
    authenticatedUser: AuthenticatedUser
    
    user: User!
    users: [User]
    
    post(id: Int!): Post!
    posts(scopeCodename: String): [Post]

    scope(codename: String!): Scope!
    scopes: [Scope]
  }

  type Mutation {
    login(username: String!, password: String!): AuthenticatedUser
    logout: Boolean!
    
    createPost(title: String!, content: String): Post!
    updatePost(id: Int!, title: String, content: String): Post!
  }
`
