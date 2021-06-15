//React
import React, { createContext, useState, useEffect } from 'react'

//GraphQL
import { useQuery, useMutation } from '@apollo/client'
import {
    GET_PRODUCTS_BY_CATEGORY, CREATE_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT
} from '../graphql/queries'

interface IProps {
    children: React.ReactNode
}

interface IProduct {
    id: string
    name: string
    amount: number
    categoryId: string
}

interface IContext {
    products: IProduct[]
    setCategoryId: (categoryId: string) => void
    addProduct: (product: IProduct) => void
    deleteProductApi: (productId: string) => void
    editProductApi: (productId: string, productName: string, categoryId: string) => void
}

// const ProductsContext = createContext<Partial<IContext>>({})
const ProductsContext = createContext<Partial<IContext>>({})

const ProductsProvider = ({ children }: IProps) => {

    const [contextCategoryId, setCategoryId]: [string, (categoryId: string) => void] = useState('')
    const [products, setProducts] = useState<IProduct[]>([])

    const { data, loading, error, refetch } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
        variables: { categoryId: contextCategoryId },
        skip: !contextCategoryId.length
    })
    const [createProduct] = useMutation(CREATE_PRODUCT)
    const [deleteProduct] = useMutation(DELETE_PRODUCT)
    const [editProduct] = useMutation(EDIT_PRODUCT)


    useEffect(() => {
        console.log('contextCategoryId', contextCategoryId)
        console.log('data', data)
        if (contextCategoryId.length && data) {
            console.log('getProductsByCategory', data.getProductsByCategory)
            setProducts(data.getProductsByCategory)
        }
    }, [contextCategoryId, data])

    const addProduct = async (product: IProduct) => {
        await createProduct({ variables: { name: product.name, amount: product.amount, categoryId: product.categoryId } })
        refetch()
    }

    const deleteProductApi = async (productId: string) => {
        console.log('productId:', productId)
        await deleteProduct({ variables: { productId: productId } })

        refetch()
    }

    const editProductApi = async (productId: string, productName: string, categoryId: string) => {
        console.log('productId:', productId)
        console.log('productName:', productName)
        console.log('categoryId:', categoryId)
        await editProduct({ variables: { productId, name: productName, categoryId } })
        refetch()
    }

    if (loading) return <div><h2>Loading...</h2></div>
    if (error) return <div>`Error!hh ${error.message}`</div>
    return (

        <ProductsContext.Provider value={{
            products,
            setCategoryId,
            addProduct,
            deleteProductApi,
            editProductApi
        }}>
            {children}
        </ProductsContext.Provider>
    )
}

export { ProductsProvider, ProductsContext }
