//React
import React, { useState, useEffect, useContext, Fragment } from 'react'
import { useRouter } from 'next/router'

//Context
import { ProductsContext } from '../../contexts/ProductsContext'

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

//Time
import { DateTime } from 'luxon'


interface IProduct {
    name: string
    amount: number
}

interface ICategory {
    _id: string
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
//https://www.youtube.com/watch?v=D7WPn1uD9Is 18min
const ProductsPage: React.FC = () => {
    const { products, setCategoryId } = useContext(ProductsContext)
    const classes = useStyles()
    const router = useRouter()
    const { categoryId } = router.query

    const [openAddProductModal, setOpenAddProductModal] = useState(false)
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false)

    // const [productsArray, setProductsArray]: [IProduct[], (prod: IProduct[]) => void] = useState([])
    // [string, (categoryId: string) => void] = useState('')
    const [category, setCategory]: [ICategory, (category: ICategory) => void] = useState({ _id: '', name: '' })
    const [errorServer, setErrorServer] = useState(false)

    // useEffect(() => {
    //     if (products) setProductsArray(products)
    // }, [products])

    useEffect(() => {
        if (categoryId && typeof categoryId === 'string' && setCategoryId !== undefined) {
            setCategoryId(categoryId)
        }
    }, [categoryId])

    useEffect(() => {
        fetch(`/api/category/${categoryId}`)
            .then(resp => resp.json())
            .then(data => setCategory(data))
            .catch(err => console.log('Error::', err))
    }, [categoryId])

    const renderedProducts = () => {
        if (!products || !categoryId) return null
        console.log(products)
        return products.map((product: IProduct, index) => {
            return <Fragment key={index}>

                <div>
                    {/* <span>{!product.newValue && '*'}</span> */}
                    <InputProduct name={product.name} amount={product.amount} />
                </div>


            </Fragment>
        })
    }

    const handleCloseProductForm = () => {
        setOpenAddProductModal(false)

    }
    const handleCloseEditCategoryForm = (categoryEdited: ICategory) => {
        setCategory({ ...category, name: categoryEdited.name })
        setOpenEditCategoryModal(false)
    }

    const dateTime = DateTime.local(2017, 5, 15, 8, 30)

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
            <div>
                <Typography
                    variant="h6"
                >
                    {dateTime.toLocaleString()}
                </Typography>
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