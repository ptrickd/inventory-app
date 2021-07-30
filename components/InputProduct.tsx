//React
import React, { useState, useContext, Fragment } from 'react'

//Context
import { ProductsContext } from '../contexts/ProductsContext'

//Components
import EditProductForm from './EditProductForm'

//Material UI
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'

//Icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

//Graphql
import { gql, useMutation } from '@apollo/client'

const UPDATE_AMOUNT = gql`
    mutation SaveAmountProduct($productId: ID!, $updatedAmount: Int!){
        saveAmountProduct(productId: $productId, updatedAmount: $updatedAmount){
            id
        }
    }
`

type IProduct = {
    name: string
    currentAmount: number
    previousAmount: number
    id: string
    categoryId: string
    showAmounts: boolean
}


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    formControl: {
        marginTop: '8px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    textfield: {
        marginLeft: 5,
        marginRight: 5
    },
    productNameWithoutAmount: {

    }
}));

const InputProduct: React.FC<IProduct> = ({ name, currentAmount, previousAmount, id, categoryId, showAmounts }) => {
    const classes = useStyles();
    const { deleteProductApi } = useContext(ProductsContext)
    const [openEditProductForm, setOpenEditProductModal] = useState<boolean>(false)
    const [amount, setAmount] = useState(currentAmount)
    const [saveAmountProduct, { data }] = useMutation(UPDATE_AMOUNT)

    const handleEditAddProductForm = () => setOpenEditProductModal(false)

    const saveProductOnBlur = async () => {
        console.log('id', id)
        await saveAmountProduct({
            variables: {
                productId: id,
                updatedAmount: amount
            }
        })
    }

    const bodyWithAmount = () => (
        <Fragment>

            <TextField

                id={name + 'current'}
                label={'Current'}
                color="primary"
                value={amount.toString()}
                onChange={e => setAmount(parseInt(e.target.value))}
                onBlur={saveProductOnBlur}
                variant='standard'
                fullWidth
                className={classes.textfield}
            />
            <Divider orientation="vertical" flexItem />
            <TextField

                id={name + 'previous'}
                label={'Last'}
                color="primary"
                value={previousAmount}
                variant='standard'
                className={classes.textfield}
            />
        </Fragment>

    )

    return (
        <div className={classes.root}>
            {showAmounts && <Typography variant="h6">{name}</Typography>}
            <FormControl
                className={classes.formControl}
                fullWidth
            >
                {
                    !showAmounts && <Typography
                        variant="h6"
                        className={classes.productNameWithoutAmount}
                    >{name}</Typography>
                }
                {
                    showAmounts && bodyWithAmount()
                }
                <IconButton onClick={e => setOpenEditProductModal(true)}>
                    <EditIcon />
                </IconButton>

                <IconButton onClick={e => { if (deleteProductApi !== undefined) deleteProductApi(id) }}>
                    <DeleteIcon />
                </IconButton>

            </FormControl >
            <EditProductForm
                open={openEditProductForm}
                handleCloseModal={handleEditAddProductForm}
                productId={id}
                categoryId={categoryId}
                productName={name}
            />

        </div>

    )
}

export default InputProduct

