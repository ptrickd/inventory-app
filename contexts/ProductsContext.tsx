//React
import React, { createContext, useState, useEffect } from 'react'

//GraphQL
import { gql, useMutation, useLazyQuery } from '@apollo/client'
import { CREATE_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT } from '../graphql/queries'
import { TCategory, IProduct } from '../types/types'

//Queries
const GET_PRODUCTS = gql`
    query Product{
        products{
            id
            name
            currentAmount
            previousAmount
            categoryId
        }
    }
`

interface IProps {
    children: React.ReactNode
}

interface IContext {
    products: IProduct[]
    productsByCategory: () => IProduct[] | []
    updateProducts: (list: IProduct[]) => void
    setCategoryId: (categoryId: string) => void
    addProduct: (product: IProduct) => void
    deleteProductApi: (productId: string) => void
    editProductApi: (productId: string, productName: string, categoryId: string) => void
}

const ProductsContext = createContext<Partial<IContext>>({})

const ProductsProvider = ({ children }: IProps) => {

    const [contextCategoryId, setCategoryId]: [string, (categoryId: string) => void] = useState('')
    const [products, setProducts] = useState<IProduct[] | []>([])

    const [getProducts, { data, loading }] = useLazyQuery(GET_PRODUCTS)
    const [createProduct] = useMutation(CREATE_PRODUCT)
    const [deleteProduct] = useMutation(DELETE_PRODUCT)
    const [editProduct] = useMutation(EDIT_PRODUCT)

    useEffect(() => {

        getProducts()

    }, [contextCategoryId])

    useEffect(() => {
        if (data) {
            setProducts(data.products)
        }
    }, [data])


    const updateProducts = (list: IProduct[]) => {
        setProducts(list)
    }
    useEffect(() => {
        if (products) console.log('products list on context', products)
    }, [products])

    const productsByCategory = () => {
        let productsToReturn: IProduct[] | [] = []
        if (contextCategoryId.length) {
            productsToReturn = products.filter(product => product.categoryId === contextCategoryId)
        }


        console.log('productsToReturn', productsToReturn)
        return productsToReturn
    }

    const addProduct = async (product: IProduct) => {
        await createProduct({ variables: { name: product.name, categoryId: product.categoryId } })
        getProducts({ variables: { categoryId: contextCategoryId } })
    }

    const deleteProductApi = async (productId: string) => {
        await deleteProduct({ variables: { productId: productId } })

        getProducts({ variables: { categoryId: contextCategoryId } })
    }

    const editProductApi = async (productId: string, productName: string, categoryId: string) => {
        await editProduct({ variables: { productId, name: productName, categoryId } })
        getProducts({ variables: { categoryId: contextCategoryId } })
    }

    if (loading) return <div><h2>Loading...</h2></div>
    return (
        <ProductsContext.Provider value={{
            products,
            productsByCategory,
            updateProducts,
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
