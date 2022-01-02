//React
import React, { createContext, useContext } from 'react'

//GraphQL
import { useMutation } from '@apollo/client'
import { CREATE_CATEGORY } from '../graphql/queries'

//Context
import { UserContext } from './UserContext'

interface ICategory {
    name: string
}

interface IProps {
    children: React.ReactNode
}

interface IContext {
    categories: ICategory[]
    createCategoryApi: (category: ICategory) => void

}


const CategoriesContext = createContext<Partial<IContext>>({})

const CategoriesProvider = ({ children }: IProps) => {

    const [createCategory, { data }] = useMutation(CREATE_CATEGORY)
    const { currentUser } = useContext(UserContext)

    const createCategoryApi = async ({ name }: ICategory) => {
        console.log(typeof currentUser)
        if (currentUser !== undefined) {
            await createCategory({ variables: { name: data.name, userId: currentUser.id } })
        }

    }
    console.log('CategoriesContext')

    return (
        <CategoriesContext.Provider value={{
            createCategoryApi
        }}>

        </CategoriesContext.Provider>
    )
}

export { CategoriesProvider, CategoriesContext }