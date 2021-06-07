import React, { createContext, useState, useEffect } from 'react'

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
    editProduct: (productId: string, productName: string) => void
}

const ProductsContext = createContext<Partial<IContext>>({})

const ProductsProvider = ({ children }: IProps) => {
    // let products: IProduct[] = []
    const [categoryId, setCategoryId]: [string, (categoryId: string) => void] = useState('')
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        if (categoryId) {
            console.log('in the context product')
            console.log(categoryId)
            fetch(`/api/product/category/${categoryId}`)
                .then(resp => resp.json())
                .then(data => { console.log(data); setProducts(data) })
                .catch(err => console.log('Error::', err))
        }
    }, [categoryId])

    const addProduct = async (product: IProduct) => {

        await fetch('/api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(resp => resp.json())
            .then(data => {

                setProducts([...products, data])
            })
            .catch(err => console.log('error:', err))
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

    const editProduct = async (productID: string, productName: string) => {
        await fetch(`/api/product/${productID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: productName })
        })
            .then(resp => resp.json())
            .then(data => {
                const newArray = products.filter(product => product._id !== data._id)
                setProducts([...newArray, data])

            })
            .catch(err => console.log('error:', err))
    }


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
