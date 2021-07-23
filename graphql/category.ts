//GraphQl
import { gql } from 'apollo-server'

//Models
import dbConnect from '../utils/dbConnect'

//Controller
import {
    getCategory,
    editCategory,
    deleteCategory
} from '../controllers/category.controller'

interface IIds {
    [propName: string]: string
}

interface ICategory {
    categoryId: string
    name: string
    userId: string
}

const typeDefs = gql`
     type Category {
        id: ID
        name: String
        userId: String
    }

    type Query {
        category(categoryId: ID): Category
        categories(userId: String): [Category]
    }

    type Mutation {
        createCategory(name:String, userId: String): Category
        editCategory(categoryId:ID, name:String): Category
        deleteCategory(categoryId:ID): Category
    }
`

export const resolvers = {
    Query: {
        category: async (_: any, { categoryId }: IIds, { user }: any) => {
            try {
                console.log('categoryId', categoryId)
                if (!user) throw new Error("Not Authenticated")
                const category = await getCategory(categoryId)

                if (!category) throw new Error("No Category Found");

                return category
            }
            catch (err) {
                console.log(err)
                return err
            }
        },
        categories: async (_: any, { userId }: IIds, { user }: any) => {
            try {
                console.log('in getCategories')
                if (!user) throw new Error("Not Authenticated")
                const categories = await Category.find({ userId })
                if (!categories) throw new Error("No Categories Found")
                return categories.map(({ id, name, userId }) => ({
                    id, name, userId
                }))
            }
            catch (err) {
                console.log(err)
                return err
            }
        },
    },
    Mutation: {
        createCategory: async (_: any, { name, userId }: IIds, { user }: any) => {
            try {
                console.log('createCategory name', name)
                console.log('createCategory userId', userId)
                if (!user) throw new Error("Not Authenticated")
                let category = await Category.create({ name, userId })
                console.log('category::', category)
                if (!category) throw new Error("No Category Created")
                return category
            } catch (err) {
                console.log(err)
                return err
            }


        },
        editCategory: async (_: any, { categoryId, name }: ICategory, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                let editedCategory = await editCategory(categoryId, name)
                if (!editedCategory) throw new Error("No Category Found")
                return editedCategory
            } catch (err) {
                console.log(err)
                return err
            }

        },
        deleteCategory: async (_: any, { categoryId }: IIds, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                let deletedCategory = await deleteCategory(categoryId)
                if (!deletedCategory) throw new Error("No Category Found")
                return deletedCategory
            } catch (err) {
                console.log(err)
                return err
            }

        },
    }
}