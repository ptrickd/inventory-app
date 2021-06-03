import React, { useState, useEffect, Fragment } from 'react'

//Components
import InputProduct from '../../components/InputProduct'
import AddProductForm from '../../components/AddProductForm'

//Material UI
import {
    Button,
    Divider
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../../constants/dimensions'

//Data
import { PRODUCTS } from '../../dummy-data'

interface IProduct {
    name: string
    amount: number
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 60,
        marginLeft: DRAWER_WIDTH,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        marginTop: '10px'
    }
}))

const ProductsPage: React.FC = () => {
    const classes = useStyles()
    const [openModal, setOpenModal] = useState(false)
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch('/api/product')
            .then(resp => resp.json())
            .then(data => setProducts(data))
            .catch(err => console.log('Error::', err))
    }, [])

    const renderedProducts = () => {
        return products.map((product: IProduct) => {
            return <Fragment>

                <div>
                    {/* <span>{!product.newValue && '*'}</span> */}
                    <InputProduct name={product.name} amount={product.amount} />
                </div>


            </Fragment>
        })
    }

    const handleCloseProductForm = () => {
        setOpenModal(false)
        fetch('/api/product')
            .then(resp => resp.json())
            .then(data => setProducts(data))
            .catch(err => console.log('Error::', err))
    }

    return (
        <div className={classes.root}>

            <hr />
            {renderedProducts()}
            <span>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                >
                    Submit</Button>

            </span>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => setOpenModal(true)}
            >
                Add New Product
        </Button>
            <AddProductForm
                open={openModal}
                handleCloseModal={handleCloseProductForm}
            />

        </div>
    )
}

export default ProductsPage