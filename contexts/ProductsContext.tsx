//React
import React, { createContext, useState, useEffect } from 'react'

//GraphQL
import { useMutation, useLazyQuery } from '@apollo/client'
import {
    GET_PRODUCTS_BY_CATEGORY,
    CREATE_PRODUCT, DELETE_PRODUCT,
    EDIT_PRODUCT
} from '../graphql/queries'

interface IProps {
    children: React.ReactNode
}

interface IProduct {
    id: string
    name: string
    currentAmount: number
    previousAmount: number
    categoryId: string
}

interface IContext {
    products: IProduct[]
    setCategoryId: (categoryId: string) => void
    addProduct: (product: IProduct) => void
    deleteProductApi: (productId: string) => void
    editProductApi: (productId: string, productName: string, categoryId: string) => void
}

const ProductsContext = createContext<Partial<IContext>>({})

const ProductsProvider = ({ children }: IProps) => {

    const [contextCategoryId, setCategoryId]: [string, (categoryId: string) => void] = useState('')
    const [products, setProducts] = useState<IProduct[]>([])

    const [getProducts, { data, loading }] = useLazyQuery(GET_PRODUCTS_BY_CATEGORY)
    const [createProduct] = useMutation(CREATE_PRODUCT)
    const [deleteProduct] = useMutation(DELETE_PRODUCT)
    const [editProduct] = useMutation(EDIT_PRODUCT)

    useEffect(() => {
        if (contextCategoryId.length) {
            getProducts({ variables: { categoryId: contextCategoryId } })
        }
    }, [contextCategoryId])

    useEffect(() => {
        if (data) {
            setProducts(data.productsByCategory)
        }
    }, [data])

    const addProduct = async (product: IProduct) => {
        await createProduct({ variables: { name: product.name, categoryId: product.categoryId } })
        getProducts({ variables: { categoryId: contextCategoryId } })
    }

    const deleteProductApi = async (productId: string) => {
        console.log('productId:', productId)
        await deleteProduct({ variables: { productId: productId } })

        getProducts({ variables: { categoryId: contextCategoryId } })
    }

    const editProductApi = async (productId: string, productName: string, categoryId: string) => {
        console.log('productId:', productId)
        console.log('productName:', productName)
        console.log('categoryId:', categoryId)
        await editProduct({ variables: { productId, name: productName, categoryId } })
        getProducts({ variables: { categoryId: contextCategoryId } })
    }

    if (loading) return <div><h2>Loading...</h2></div>
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
