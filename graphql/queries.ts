//GraphQL
import { gql } from "@apollo/client";

//Authentication
export const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      user {
        id
        email
        theme
      }
      error
    }
  }
`;
export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        theme
      }
      error
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      email
      theme
    }
  }
`;

//Product
export const GET_PRODUCTS_BY_CATEGORY = gql`
  query ProductsByCategory($categoryId: String) {
    productsByCategory(categoryId: $categoryId) {
      id
      name
      currentAmount
      previousAmount
      categoryId
      unit
    }
  }
`;
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $categoryId: String!, $unit: String!) {
    createProduct(name: $name, categoryId: $categoryId, unit: $unit) {
      id
      name
      categories {
        categoryId
        currentAmount
        previousAmount
      }
      unit
      error
    }
  }
`;
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($productId: ID!) {
    deleteProduct(productId: $productId) {
      id
      name
    }
  }
`;
export const EDIT_PRODUCT = gql`
  mutation EditProduct(
    $productId: ID
    $name: String
    $categoryId: String
    $unit: String
  ) {
    editProduct(
      productId: $productId
      name: $name
      categoryId: $categoryId
      unit: $unit
    ) {
      id
      name
      categoryId
      unit
    }
  }
`;

//Category
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      id
      name
      error
    }
  }
`;

export const GET_NUM_CATEGORIES = gql`
  query GetNumOfCategories {
    numOfCategories
  }
`;

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($name: String!) {
    createCategory(name: $name) {
      id
      name
      error
    }
  }
`;

export const GET_CATEGORY = gql`
  query GetCategory($categoryId: ID!) {
    category(categoryId: $categoryId) {
      id
      name
    }
  }
`;
