const typeDefs = `
  type User {
    _id: ID
    username: String!
    email: String!
    password: String
    client: Client
    phone: String!
  }
type Admin {
    adminId: ID
    firstname: String!
    lastname: String!
    company: String!
    bid: [Bid]

}
type Client {
    _id: ID
    firstname: String!
    lastname: String!
    contact: String
    cart: [Cart]
}
type Bid {
    bidId: ID
    product: [Product]
    total: Int!
    client: Client
}
type Cart {
    cartId: ID
    product: [Product]
    total: Int!
    client: Client
}
type Product {
    _id: ID
    productname: String!
    description: String!
    price: Float!
    stock: Int!
    image: String
  }
input ProductInput {
    productname: String!
    description: String!
    price: Float!
    stock: Int!
    image: String
}
  
 type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    me: User
    products: [Product]
    product(_id: ID!): Product
    clients: [Client]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, phone: String!): Auth
    login(email: String!, password: String!): Auth

    updateUser(_id: ID!, username: String, email: String): User
    deleteUser(_id: ID!): User
    addProduct(productname: String!, description: String!, price: Float!, stock: Int!, image: String): Product
    addToCart(product: ProductInput!): Client
    addProfile(firstname: String!, lastname: String!, contact: String): User


    addProduct(productname: String!, description: String!, price: Int!, stock: Int!, image: String): Product
    updateUser(_id: ID!, username: String, email: String, phone: String): User
    deleteUser(_id: ID!): User


  }
`;

module.exports = typeDefs;


