//React
import React, { useState, useEffect, Fragment } from 'react'
import { useRouter } from 'next/router'

//Components
import InputProduct from '../../components/InputProduct'
import AddProductForm from '../../components/AddProductForm'
import EditCategoryForm from '../../components/EditCategoryForm'

//Material UI
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { DRAWER_WIDTH } from '../../constants/dimensions'

//Icons
import EditIcon from '@material-ui/icons/Edit';

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
        display: 'flex'
    },
    titleText: {
        marginRight: 10
    }
}))

const ProductsPage: React.FC = () => {
    const classes = useStyles()
    const router = useRouter()
    const { categoryId } = router.query

    const [openAddProductModal, setOpenAddProductModal] = useState(false)
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false)
    const [products, setProducts] = useState([])
    const [category, setCategory] = useState({ name: '' })
    const [errorServer, setErrorServer] = useState(false)

    useEffect(() => {
        fetch(`/api/product/category/${categoryId}`)
            .then(resp => resp.json())
            .then(data => setProducts(data))
            .catch(err => console.log('Error::', err))

    }, [categoryId])
    useEffect(() => {
        fetch(`/api/category/${categoryId}`)
            .then(resp => resp.json())
            .then(data => setCategory(data))
            .catch(err => console.log('Error::', err))
    }, [categoryId])

    const renderedProducts = () => {
        if (!products || products.message) return null
        console.log(products)
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
        setOpenAddProductModal(false)
        fetch('/api/product')
            .then(resp => resp.json())
            .then(data => setProducts(data))
            .catch(err => console.log('Error::', err))
    }
    const handleCloseEditCategoryForm = (categoryEdited: ICategory) => {
        setCategory({ ...category, name: categoryEdited.name })
        setOpenEditCategoryModal(false)
    }

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography
                    variant="h2"
                    className={classes.titleText}
                >
                    {category.name}

                </Typography>
                <IconButton onClick={() => setOpenEditCategoryModal(true)}>
                    <EditIcon />
                </IconButton>
            </div>

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
                onClick={() => setOpenAddProductModal(true)}
            >
                Add New Product
        </Button>
            <AddProductForm
                open={openAddProductModal}
                handleCloseModal={handleCloseProductForm}
                categoryId={categoryId}
            />
            <EditCategoryForm
                open={openEditCategoryModal}
                handleCloseModal={handleCloseEditCategoryForm}
                category={category}
            />
        </div>
    )
}

export default ProductsPage