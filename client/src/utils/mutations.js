import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!, $phone: String!) {
  addUser(username: $username, email: $email, password: $password, phone: $phone) {
    token
    user {
      _id
      username
      email
      password
      phone
      
    }
  }
}
`;


export const UPDATE_USER_ADMIN = gql`
mutation udateUser($id: ID!, $admin: Boolean) {
  updateUser(_id: $id, admin: $admin) {
    _id
    username
    email
    password
    phone
    admin
  }
}
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(_id: $id) {
      _id
    }
  }
`;


export const ADD_TO_CART = gql`
  mutation addToCart($product: [ID]!) {
    addToCart(product: $product) {
      product{
        _id
      productname
      description
      price
      stock
      image
      }
      }
    }
  
`;

