import React, { useState } from 'react'
import InputProduct from '../components/InputProduct'
import {
    Button
} from '@material-ui/core';

//Styling
import styles from '../styles/Products.module.css'

//Data
import { PRODUCTS } from '../dummy-data'



const ProductsPage: React.FC = () => {
    // const [tomato, setTomato] = useState('')

    // const handleClick = (e: React.FormEvent) => {
    //     e.preventDefault()
    //     fetch('/api/products', {
    //         method: 'POST',
    //         headers: {
    //             'Content-type': 'application.json'
    //         },
    //         body: JSON.stringify({ value: tomato })
    //     })
    //         .then(resp => resp.json())
    //         .then(data => console.log('response from the server', data))
    // }

    const renderedProducts = () => {
        return PRODUCTS.map((product) => {
            return <InputProduct name={product.name} />
        })
    }

    return (
        <div className={styles.container}>
            {renderedProducts()}
            <Button
                // onClick={handleClick}
                className={styles.button} variant="outlined" color="primary"
            >Submit</Button>
        </div>
    )
}

export default ProductsPage

