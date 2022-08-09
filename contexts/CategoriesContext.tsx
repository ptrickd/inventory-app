//React
import React,
{ createContext, useContext, useState, useEffect }
    from 'react'

//GraphQL
import { useMutation, useLazyQuery, gql } from '@apollo/client'
import { CREATE_CATEGORY, GET_CATEGORIES } from '../graphql/queries'

//Context
import { UserContext } from './UserContext'

//Types
import { TCategory } from '../types/types'

interface IProps {
    children: React.ReactNode
}

interface IContext {
    categories: TCategory[] | []
    createCategoryApi: (category: TCategory) => void
    deleteCategoryApi: (category: TCategory) => void
}

const DELETE_CATEGORY = gql`
    mutation DeleteCategory($categoryId: ID!){
        deleteCategory(categoryId: $categoryId){
            id
            name
        }
    }
    `

const CategoriesContext = createContext<Partial<IContext>>({})

const CategoriesProvider = ({ children }: IProps) => {

    const [createCategory] = useMutation(CREATE_CATEGORY)
    const [deleteCategory] = useMutation(DELETE_CATEGORY)
    const { currentUser } = useContext(UserContext)

    //Get set by the useQuery below
    const [categories, setCategories] = useState<TCategory[] | []>([])

    //Get the data from the backend using the categoryId
    // const [getCategories, { data, loading }] = useLazyQuery(GET_CATEGORIES)

    const [getCategories, { data, loading }] = useLazyQuery(GET_CATEGORIES, { fetchPolicy: 'network-only' })

    useEffect(() => {
        // console.log('getting the categories')

        getCategories()
    }, [currentUser])

    useEffect(() => {
        if (data?.categories) {
            // console.log('the categories are', data.categories)
            setCategories(data.categories)
        }
    }, [data])

    //add a new category 
    const createCategoryApi = async ({ name }: TCategory) => {
        console.log('currentUser', currentUser)
        console.log('new category name', name)

        if (currentUser !== undefined) {
            await createCategory({ variables: { name: name, userId: currentUser.id } })
            getCategories()
        }
    }
    //Delete a category 
    const deleteCategoryApi = async (category: TCategory) => {
        if (category.id != undefined) {
            await deleteCategory({
                variables: {
                    categoryId: category.id
                }
            })
        }
        else console.log('No category id passed')
    }

    if (loading) return null
    return (
        <CategoriesContext.Provider value={{
            createCategoryApi,
            deleteCategoryApi,
            categories
        }}>
            {children}
        </CategoriesContext.Provider>
    )
}

export { CategoriesProvider, CategoriesContext }