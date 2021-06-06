import React, { createContext, useState, useEffect } from 'react'

interface IProps {
    children: React.ReactNode
}

interface IProduct {
    name: string
    amount: number
}

interface IContext {
    products: IProduct[]
    setCategoryId: (categoryId: string) => void
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


    return (
        <ProductsContext.Provider value={{
            products,
            setCategoryId
        }}>
            {children}
        </ProductsContext.Provider>
    )
}

export { ProductsProvider, ProductsContext }