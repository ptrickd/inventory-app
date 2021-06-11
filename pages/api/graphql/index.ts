
//GraphQL
import { ApolloServer, gql } from 'apollo-server-micro'

//Controller
import {
    createProduct,
    getProducts,
    getProductsByCategory,
    editProduct,
    deleteProduct
} from '../../../controllers/product.controller'
import {
    getCategories,
    createCategory,
    getCategory,
    editCategory,
    deleteCategory
} from '../../../controllers/category.controller'

const typeDefs = gql`
    type Product {
        id: ID
        name: String
        amount: Int
        categoryId: ID
    }

    type Category {
        id: ID
        name: String
    }

    type Query {
        getProducts: [Product]
        getProductsByCategory(categoryId: String): [Product]

        getCategory(categoryId: ID):Category
        getCategories: [Category]
    }

    type Mutation {
        createProduct(name:String, amount:Int, categoryId: String): Product
        editProduct(id:ID, name:String, categoryId: String): Product
        deleteProduct(productId: ID): Product
        
        createCategory(name:String): Category
        editCategory(categoryId:ID, name:String): Category
        deleteCategory(categoryId:ID): Category
    }
`

interface IProduct {
    id: string
    name: string
    amount: number
    categoryId: string
}

interface ICreateProduct {
    name: string
    amount: number
    categoryId: string
}

interface IIds {
    [propName: string]: string
}

interface IEditProduct {
    id: string
    name: string
    categoryId: string
}

interface ICategory {
    categoryId: string
    name: string
}


const resolvers = {
    Query: {
        getProducts: async () => {
            try {
                const products = await getProducts()
                return products.map(({ id, amount, name, categoryId }: IProduct) => ({
                    id,
                    name,
                    amount,
                    categoryId
                }))
            } catch (err) {
                console.log(err)
            }
        },
        getProductsByCategory: async (_: any, { categoryId }: IIds) => {
            try {
                const products = await getProductsByCategory(categoryId)
                if (!products) throw new Error('No products found')
                return products.map(({ id, amount, name, categoryId }: IProduct) => ({
                    id,
                    name,
                    amount,
                    categoryId
                }))
            }
            catch (err) {
                console.log(err)
            }
        },
        getCategory: async (_: any, { categoryId }: IIds) => {
            try {
                const category = await getCategory(categoryId)
                if (!category) throw new Error("No Category Found");

                return category
            }
            catch (err) {
                console.log(err)
            }
        },
        getCategories: async () => {
            try {
                console.log('in getCategories')
                const categories = await getCategories()
                if (!categories) throw new Error("No Categories Found")
                return categories.map(({ id, name }) => ({
                    id, name
                }))
            }
            catch (err) {
                console.log(err)
            }
        }
    },
    Mutation: {
        createProduct: async (_: any, { name, amount, categoryId }: ICreateProduct) => {

            let product = await createProduct(name, amount, categoryId)
            return product
        },
        editProduct: async (_: any, { id, name, categoryId }: IEditProduct) => {
            let product = await editProduct(id, name, categoryId)
            if (!product) throw new Error('No product found')
            return product
        },
        deleteProduct: async (_: any, { productId }: IIds) => {
            let product = await deleteProduct(productId)
            if (!product) throw new Error('No product found')
            return product
        },
        createCategory: async (_: any, { name }: IIds) => {
            console.log('createCategory', name)
            let category = await createCategory(name)
            if (!category) throw new Error("No Category Create")
            return category

        },
        editCategory: async (_: any, { categoryId, name }: ICategory) => {
            let editedCategory = await editCategory(categoryId, name)
            if (!editedCategory) throw new Error("No Category Found")
            return editedCategory
        },
        deleteCategory: async (_: any, { categoryId }: IIds) => {
            let deletedCategory = await deleteCategory(categoryId)
            if (!deletedCategory) throw new Error("No Category Found")
            return deletedCategory
        }
    }
}


const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
    api: {
        bodyParser: false
    }
}

export default apolloServer.createHandler({ path: "/api/graphql" })
