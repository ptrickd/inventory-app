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

//GraphQL
import { gql, useQuery } from '@apollo/client'
// import { getCategory } from '../../controllers/category.controller'


interface IProduct {
    id: string
    name: string
    amount: number
    categoryId: string
}

interface ICategory {
    _id: string
    name: string
}

const GET_CATEGORY = gql`
    query GetCategory($categoryId: ID!){
        getCategory(categoryId: $categoryId) {
            id
            name
        }
    }
`
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

    const { products, setCategoryId } = useContext(ProductsContext)
    const classes = useStyles()
    const router = useRouter()
    const { categoryId } = router.query

    const [openAddProductModal, setOpenAddProductModal] = useState(false)
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false)

    //Get set by the useQuery below
    const [category, setCategory] = useState<ICategory>({ _id: '', name: '' })


    //Get the data from the backend using the categoryId
    const { data, loading, error } = useQuery(GET_CATEGORY, {
        variables: { categoryId: "60c3e574e56b6b54bd73d476" },
        // skip: !categoryId
    })

    const dateTime = DateTime.local(2017, 5, 15, 8, 30)
    console.log('after useQuery')
    console.log('data in useEffect:', data)
    console.log('loading in useEffect:', loading)
    console.log('error in useEffect:', error)
    //Set category once it go it from the query
    // useEffect(() => {

    //     if (data) {
    //         // setCategory(data.getCategory)
    //         console.log('data in useEffect:', data)

    //     }
    // }, [data])
    useEffect(() => {
        setCategoryId("60c3e574e56b6b54bd73d476")

    }, [])
    /*********************************** */
    const renderedProducts = () => {

        if (!products) return null
        console.log(products)
        return products.map((product, index) => {
            return <Fragment key={index}>

                <div>
                    {/* <span>{!product.newValue && '*'}</span> */}
                    <InputProduct
                        name={product.name}
                        amount={product.amount}
                        id={product._id}
                        categoryId={product.categoryId}
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
    if (!data) return <div><h2>No category...</h2></div>

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