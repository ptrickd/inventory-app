//React
import React, { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'

//Components
import InputProduct from '../../components/InputProduct'
import AddProductForm from '../../components/AddProductForm'

//Material UI
import {
    Button,
    Divider,
    Typography
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../../constants/dimensions'

//Data
import { PRODUCTS } from '../../dummy-data'
import { Category } from '../../models/category.model';

interface IProduct {
    name: string
    amount: number
}

interface ICategory {
    name: string
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
    },
    title: {
        marginTop: 12,
        textDecoration: 'underline'
    }
}))

const ProductsPage: React.FC = () => {
    const classes = useStyles()
    const router = useRouter()
    const { categoryId } = router.query

    const [openModal, setOpenModal] = useState(false)
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState({ name: '' })

    useEffect(() => {
        fetch(`/api/product/category/${categoryId}`)
            .then(resp => resp.json())
            .then(data => setProducts(data))
            .catch(err => console.log('Error::', err))

    }, [])
    useEffect(() => {
        fetch(`/api/category/${categoryId}`)
            .then(resp => resp.json())
            .then(data => setCategory(data))
            .catch(err => console.log('Error::', err))
    }, [])

    const renderedProducts = () => {
        if (!products) return null
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
            <Typography
                variant="h2"
            >
                {category.name}
            </Typography>
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
                categoryId={categoryId}
            />

        </div>
    )
}

export default ProductsPage