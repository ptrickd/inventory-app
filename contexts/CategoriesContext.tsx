//React
import React,
{ createContext, useContext, useState, useEffect }
    from 'react'

//GraphQL
import { useMutation, useLazyQuery } from '@apollo/client'
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
}

const CategoriesContext = createContext<Partial<IContext>>({})

const CategoriesProvider = ({ children }: IProps) => {

    const [createCategory] = useMutation(CREATE_CATEGORY)
    const { currentUser } = useContext(UserContext)

    //Get set by the useQuery below
    const [categories, setCategories] = useState<TCategory[] | []>([])

    //Get the data from the backend using the categoryId
    const [getCategories, { data, loading }] = useLazyQuery(GET_CATEGORIES, { fetchPolicy: 'network-only' })

    useEffect(() => {
        console.log('getting the categories')

        getCategories()
    }, [])

    useEffect(() => {
        if (data?.categories) {
            console.log('the categories are', data.categories)
            setCategories(data.categories)
        }
    }, [data])

    //add a new category 
    const createCategoryApi = async ({ name }: TCategory) => {

        if (currentUser !== undefined) {
            await createCategory({ variables: { name: name, userId: currentUser.id } })
            getCategories()
        }
    }

    if (loading) return <div><h2>Loading...</h2></div>
    return (
        <CategoriesContext.Provider value={{
            createCategoryApi,
            categories
        }}>
            {children}
        </CategoriesContext.Provider>
    )
}

export { CategoriesProvider, CategoriesContext }