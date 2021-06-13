//React
import React, { createContext, useState, useEffect } from 'react'

//GraphQL
import { gql, useQuery, useMutation } from '@apollo/client'

interface IProps {
    children: React.ReactNode
}

interface IProduct {
    _id: string
    name: string
    amount: number
    categoryId: string
}

interface IContext {
    products: IProduct[]
    setCategoryId: (categoryId: string) => void
    addProduct: (product: IProduct) => void
    deleteProduct: (productId: string) => void
    editProduct: (productId: string, productName: string, categoryId: string) => void
}

const GET_PRODUCTS_BY_CATEGORY = gql`
    query GetProductsByCategory($categoryId: String){
        getProductsByCategory(categoryId: $categoryId){
            id
            name
            amount
            categoryId
        }
    }
`
const CREATE_PRODUCT = gql`
    mutation CreateProduct($name: String!, $amount: Int!, $categoryId: String!){
        createProduct(name: $name, amount: $amount, categoryId: $categoryId){
            id
            name
            amount
        }
    }
`
// const ProductsContext = createContext<Partial<IContext>>({})
const ProductsContext = createContext<IContext>({})

const ProductsProvider = ({ children }: IProps) => {

    const [contextCategoryId, setCategoryId]: [string, (categoryId: string) => void] = useState('')
    const [products, setProducts] = useState<IProduct[]>([])

    const { data, loading, error } = useQuery(GET_PRODUCTS_BY_CATEGORY, {
        variables: { categoryId: contextCategoryId },
        skip: !contextCategoryId.length
    })
    const [createProduct] = useMutation(CREATE_PRODUCT)


    useEffect(() => {
        if (contextCategoryId) {
            // console.log('getProductsByCategory', data.getProductsByCategory)
            // setProducts(data.getProductsByCategory)
            setProducts([])
        }
    }, [contextCategoryId])

    const addProduct = async (product: IProduct) => {
        createProduct({ variables: { name: product.name, amount: product.amount, categoryId: product.categoryId } })
        setProducts([...products, data])
    }

    const deleteProduct = async (productId: string) => {
        await fetch(`/api/product/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(resp => resp.json())
            .then(data => {
                const newArray = products.filter(product => product._id !== data._id)
                setProducts(newArray)
            })
            .catch(err => console.log('error:', err))
    }

    const editProduct = async (productID: string, productName: string, categoryId: string) => {
        await fetch(`/api/product/${productID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: productName, categoryId })
        })
            .then(resp => resp.json())
            .then(data => {

                const newArray = products.filter(product => product._id !== data._id)
                if (categoryId === contextCategoryId) {
                    setProducts([...newArray, data])
                } else {
                    setProducts([...newArray])
                }

            })
            .catch(err => console.log('error:', err))
    }

    if (loading) return <div><h2>Loading...</h2></div>
    if (error) return <div>`Error!hh ${error.message}`</div>
    return (

        <ProductsContext.Provider value={{
            products,
            setCategoryId,
            addProduct,
            deleteProduct,
            editProduct
        }}>
            {children}
        </ProductsContext.Provider>
    )
}

export { ProductsProvider, ProductsContext }
