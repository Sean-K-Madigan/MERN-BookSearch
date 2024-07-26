const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(input: SaveBookInput!): User
    removeBook(bookId: ID!): User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  type Auth {
    token: String!
    user: User!
  }

  input SaveBookInput {
    authors: [String]
    description: String
    title: String
    bookId: ID!
    image: String
    link: String
  }
`;

module.exports = typeDefs;

// unsure of how correct this is??