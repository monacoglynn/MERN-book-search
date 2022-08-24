const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
}
type Book {
    _id: ID!
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
}

type Auth {
    token: ID!
    user: User
}


type Query {
    user(username: String): User
    savedBooks(bookId: String): [Book]
    me: User
}

type Mutations {
    addUser(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): Auth
}
`


module.exports = typeDefs;