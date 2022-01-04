//React
import React, { useState, useEffect, useContext, Fragment } from 'react'
import { useRouter } from 'next/router'

//Context
import { ProductsContext } from '../../contexts/ProductsContext'
import { CategoriesContext } from '../../contexts/CategoriesContext'
import { UserContext } from '../../contexts/UserContext'

//Components
import InputProduct from '../../components/InputProduct'
import AddProductForm from '../../components/AddProductForm'
import EditCategoryForm from '../../components/EditCategoryForm'

//Material UI
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

//Icons
import EditIcon from '@material-ui/icons/Edit';

//Time
import { DateTime } from 'luxon'

//GraphQL
// import { useLazyQuery } from '@apollo/client'
// import { GET_CATEGORY } from '../../graphql/queries'

//Types
import { IProduct, TCategory } from '../../types/types'

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        marginTop: 60,
        marginLeft: 8,
        marginRight: 8,
        display: 'flex',
        flexDirection: 'column',
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
    },
    productContainer: {
        flexGrow: 1
    }
}))

const ProductsPage: React.FC = () => {

    const { productsByCategory, setCategoryId } = useContext(ProductsContext)
    const { categories } = useContext(CategoriesContext)
    const { loggedIn } = useContext(UserContext)
    const classes = useStyles()
    const router = useRouter()
    const { categoryId } = router.query

    const [openAddProductModal, setOpenAddProductModal] = useState(false)
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false)

    //Get set by the useQuery below
    // const [category, setCategory] = useState<TCategory>({ id: '', name: '' })


    //Get the data from the backend using the categoryId
    // const [getCategory, { loading, data }] = useLazyQuery(GET_CATEGORY)
    //Redirect to homepage if not login
    useEffect(() => {
        if (!loggedIn) router.push('/')
    }, [loggedIn])

    // useEffect(() => {
    //     if (categoryId && data?.category.id === categoryId) setCategory(data.category)
    //     else getCategory({ variables: { categoryId: categoryId } })
    // }, [data, categoryId])

    // useEffect(() => {
    //     if (typeof categoryId === 'string' && setCategoryId) {
    //         setCategoryId(categoryId)
    //     }
    // }, [categoryId])
    /*********************************** */
    const renderedProducts = () => {
        let products: IProduct[] | [] = []
        if (productsByCategory !== undefined) {
            products = productsByCategory()
        }

        if (!products) return null
        // console.log(products)
        return products.map((product: IProduct, index: number) => {
            return <Fragment key={index} >

                <div>
                    <InputProduct
                        name={product.name}
                        currentAmount={product.currentAmount || 0}
                        previousAmount={product.previousAmount || 0}
                        id={product.id || ''}
                        categoryId={product.categoryId}
                        showAmounts={true}
                        measureUnit={product.unit}
                    />

                </div>

            </Fragment>
        })
    }
    /*********************************** */

    const handleCloseAddProductForm = () => setOpenAddProductModal(false)
    const handleCloseEditCategoryForm = () => setOpenEditCategoryModal(false)

    if (loading) return <div><h2>Loading...</h2></div>

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
                </Typography>
            </div>

            <hr />
            {renderedProducts()}

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
                handleCloseModal={handleCloseAddProductForm}
                categoryId={categoryId}
            />
            <EditCategoryForm
                open={openEditCategoryModal}
                handleCloseModal={handleCloseEditCategoryForm}
                category={category}
                setNewCategoryName={name => setCategory({ ...category, name })}
            />

        </div>
    )
}

export default ProductsPage