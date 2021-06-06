import React, { createContext, useState, useEffect } from 'react'

interface IProps {
    children: React.ReactNode
}

interface IProduct {
    name: string
    amount: number
    categoryId: string
}

interface IContext {
    products: IProduct[]
    setCategoryId: (categoryId: string) => void
    addProduct: (product: IProduct) => void
}

const ProductsContext = createContext<Partial<IContext>>({})

const ProductsProvider = ({ children }: IProps) => {
    // let products: IProduct[] = []
    const [categoryId, setCategoryId]: [string, (categoryId: string) => void] = useState('')
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        if (categoryId) {
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
                console.log("products::", data)
                setProducts([...products, data])
            })
            .catch(err => console.log('error:', err))
    }


    return (
        <ProductsContext.Provider value={{
            products,
            setCategoryId,
            addProduct
        }}>
            {children}
        </ProductsContext.Provider>
    )
}

export { ProductsProvider, ProductsContext }
