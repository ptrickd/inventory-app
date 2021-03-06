//GraphQL
import { gql } from '@apollo/client'

//Authentication
export const REGISTER = gql`
    mutation Register($email: String!, $password: String!) {
        register(email: $email, password: $password){
            user {
                id 
                email
            }
            error
        }
    }
   `
export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            user{
                id
                email
            }
            error
        }
    }
`

export const GET_CURRENT_USER = gql`
    query CurrentUser{
        currentUser{
            id
            email
        }
    }
`

//Product
export const GET_PRODUCTS_BY_CATEGORY = gql`
    query ProductsByCategory($categoryId: String){
        productsByCategory(categoryId: $categoryId){
            id
            name
            currentAmount
            previousAmount
            categoryId
        }
    }
`
export const CREATE_PRODUCT = gql`
    mutation CreateProduct($name: String!, $amount: Int!, $categoryId: String!){
        createProduct(name: $name, amount: $amount, categoryId: $categoryId){
            id
            name
        }
    }
`
export const DELETE_PRODUCT = gql`
    mutation DeleteProduct($productId: ID!){
        deleteProduct(productId: $productId){
            id
            name
        }
    }
`
export const EDIT_PRODUCT = gql`
    mutation EditProduct($productId: ID, $name: String, $categoryId: String){
        editProduct(productId: $productId, name: $name, categoryId: $categoryId){
            id
            name
            categoryId
        }
    }
`

//Category
export const GET_CATEGORIES = gql`
    query GetCategories{
        categories{
                id
                name
        }
    }
`

export const CREATE_CATEGORY = gql`
   mutation CreateCategory($name: String!){
    createCategory(name: $name){
        id
        name
    }
 }
`

export const GET_CATEGORY = gql`
    query GetCategory($categoryId: ID!){
        category(categoryId: $categoryId) {
            id
            name
        }
    }
`