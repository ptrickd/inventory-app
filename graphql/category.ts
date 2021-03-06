//GraphQl
import { gql } from 'apollo-server-micro'

//Models
import dbConnect from '../utils/dbConnect'
import { Category } from '../models/category.model'

//Types
import { TIds } from '../types/types'

dbConnect()


interface ICategory {
    categoryId: string
    name: string
    userId: string
}

export const typeDef = gql`
     type Category {
        id: ID
        name: String
        userId: String
    }

    extend type Query {
        category(categoryId: ID): Category
        categories: [Category]
    }

    extend type Mutation {
        createCategory(name:String, userId: String): Category
        editCategory(categoryId:ID, name:String): Category
        deleteCategory(categoryId:ID): Category
    }
`

export const resolvers = {
    Query: {
        category: async (_: any, { categoryId }: TIds, { user }: any) => {
            try {
                console.log('categoryId', categoryId)
                if (!user) throw new Error("Not Authenticated")
                let category = await Category.findById(categoryId)

                if (!category) throw new Error("No Category Found");

                return category
            }
            catch (err) {
                console.log(err)
                return err
            }
        },
        categories: async (_: any, _1: any, { user }: any) => {
            try {
                console.log('in getCategories')
                console.log('user', user)
                if (!user) throw new Error("Not Authenticated")
                const categories = await Category.find({ userId: user.id })
                if (!categories) throw new Error("No Categories Found")

                return categories.map(({ id, name, userId }) => ({
                    id, name, userId
                }))
            }
            catch (err) {
                console.log('printing error', err)
                return err
            }
        },
    },
    Mutation: {
        createCategory: async (_: any, { name, userId }: TIds, { user }: any) => {
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
                let editedCategory = await Category.findById(categoryId)
                if (!editedCategory) throw new Error("No Category Found")
                editedCategory.name = name
                editedCategory = await editedCategory.save()
                return editedCategory
            } catch (err) {
                console.log(err)
                return err
            }

        },
        deleteCategory: async (_: any, { categoryId }: TIds, { user }: any) => {
            try {
                if (!user) throw new Error("Not Authenticated")
                let deletedCategory = await Category.findById(categoryId)
                if (!deletedCategory) throw new Error("No Category Found")
                await Category.deleteOne({ _id: categoryId })
                return deletedCategory
            } catch (err) {
                console.log(err)
                return err
            }

        },
    }
}