import React, { useState, Fragment } from 'react'
import InputProduct from '../../components/InputProduct'
import {
    Button
} from '@material-ui/core';


//Styling
import styles from '../styles/Products.module.css'

//Data
import { PRODUCTS } from '../../dummy-data'



const ProductsPage: React.FC = () => {


    const renderedProducts = () => {
        return PRODUCTS.map((product) => {
            return <Fragment>
                <div className={styles.input}>
                    <span>{!product.newValue && '*'}</span>
                    <InputProduct name={product.name} amount={product.amount} />
                </div>


            </Fragment>
        })
    }

    return (
        <div className={styles.container}>
      
            <hr className={styles.hr} />
            {renderedProducts()}
            <span className={styles.button}>
                <Button
                    variant="outlined"
                    color="primary"

                >
                    Submit</Button>
            </span>

        </div>
    )
}

export default ProductsPage

