//React
import React, { useState, useEffect, useContext, Fragment } from 'react'
import { useRouter } from 'next/router'

//Context
import { ProductsContext } from '../../contexts/ProductsContext'
import { UserContext } from '../../contexts/UserContext'

//Components
import InputProduct from '../../components/InputProduct'
import AddProductForm from '../../components/AddProductForm'
import EditCategoryForm from '../../components/EditCategoryForm'

//Material UI
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

//Icons
import EditIcon from '@material-ui/icons/Edit';

//Time
import { DateTime } from 'luxon'

//GraphQL
import { useQuery } from '@apollo/client'
import { GET_CATEGORY } from '../../graphql/queries'


// interface IProduct {
//     id: string
//     name: string
//     amount: number
//     categoryId: string
// }

interface ICategory {
    id: string
    name: string
}


const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: 60,
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

    const { products, setCategoryId } = useContext(ProductsContext)
    const { loggedIn } = useContext(UserContext)
    const classes = useStyles()
    const router = useRouter()
    const { categoryId } = router.query

    const [openAddProductModal, setOpenAddProductModal] = useState(false)
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false)

    //Get set by the useQuery below
    const [category, setCategory] = useState<ICategory>({ id: '', name: '' })


    //Get the data from the backend using the categoryId
    const { data, loading, error, refetch } = useQuery(GET_CATEGORY, {
        variables: { categoryId: categoryId },
        skip: !categoryId
    })

    useEffect(() => {
        if (!loggedIn) router.push('/')
    }, [loggedIn])

    useEffect(() => {
        if (data) setCategory(data.category)
        else refetch()
    }, [data])

    // const dateTime = DateTime.local(2017, 5, 15, 8, 30)
    useEffect(() => {
        if (typeof categoryId === 'string' && setCategoryId) setCategoryId(categoryId)
    }, [categoryId])
    /*********************************** */
    const renderedProducts = () => {

        if (!products) return null
        console.log(products)
        return products.map((product, index) => {
            return <Fragment key={index} >


                <div>
                    <InputProduct
                        name={product.name}
                        currentAmount={product.currentAmount}
                        previousAmount={product.previousAmount}
                        id={product.id}
                        categoryId={product.categoryId}
                        showAmounts={true}
                    />

                </div>

            </Fragment>
        })
    }
    /*********************************** */

    const handleCloseAddProductForm = () => setOpenAddProductModal(false)
    const handleCloseEditCategoryForm = () => setOpenEditCategoryModal(false)




    if (loading) return <div><h2>Loading...</h2></div>
    if (error) return <div>`Error! ${error.message}`</div>


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
                    {/* Some Date{dateTime.toLocaleString()} */}
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