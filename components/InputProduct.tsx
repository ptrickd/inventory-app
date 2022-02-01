//React
import React, { useState, useContext, Fragment, ChangeEvent } from 'react'

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
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel';

//Icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

//Graphql
import { gql, useMutation } from '@apollo/client'

//Types
import { IProduct } from '../types/types'

//Constants
import { MEASURE_UNITS } from '../constants/measureUnits'

const UPDATE_AMOUNT = gql`
    mutation SaveAmountProduct($productId: ID!, $updatedAmount: Int!){
        saveAmountProduct(productId: $productId, updatedAmount: $updatedAmount){
            id
        }
    }
`

type IProps = {
    key: string | undefined
    name: string
    currentAmount: number
    previousAmount: number
    id: string
    categoryId: string
    showAmounts: boolean
    measureUnit: string
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
    innerFormControl: {
        margin: theme.spacing(1),

        alignItems: 'center'
    },
    textfield: {
        // marginLeft: 5,
        // marginRight: 5
    },
    selectUnit: {
        marginLeft: 5,
        marginRight: 5,
        minWidth: 50,
        // margin: theme.spacing(1)

    },
    productNameWithoutAmount: {}
}));

const InputProduct: React.FC<IProps> = (
    { name, currentAmount, previousAmount, id, categoryId, showAmounts, measureUnit
    }) => {
    const classes = useStyles();
    const { products, updateProducts, deleteProductApi } = useContext(ProductsContext)
    const [openEditProductForm, setOpenEditProductModal] = useState<boolean>(false)
    const [currentMeasureUnit, setCurrentMeasureUnit] = useState<string>(measureUnit)
    const [amount, setAmount] = useState(currentAmount.toString())
    const [saveAmountProduct, { data }] = useMutation(UPDATE_AMOUNT)

    const handleEditAddProductForm = () => setOpenEditProductModal(false)
    const handleUnitChange = (e: any) => setCurrentMeasureUnit(e?.target?.value)
    const saveProductOnBlur = async () => {
        // console.log('id', id)

        await saveAmountProduct({
            variables: {
                productId: id,
                updatedAmount: parseInt(amount)
            }
        })
        let newProductsList = products?.map((product: IProduct) => {

            if (product.id === id) {
                console.log(product)
                let newProduct = JSON.parse(JSON.stringify(product))
                return Object.assign(newProduct, { currentAmount: parseInt(amount) })
            }
            return product

        })
        if (updateProducts && newProductsList) updateProducts(newProductsList)
    }


    const bodyWithAmount = () => (
        <Fragment>
            <FormControl
                className={classes.innerFormControl}
            >
                <TextField

                    id={name + 'current'}
                    label={'Current'}
                    color="primary"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    onBlur={saveProductOnBlur}
                    variant='standard'
                    fullWidth
                    className={classes.textfield}
                />
            </FormControl>

            <FormControl
                className={classes.innerFormControl}
            >


                <InputLabel>Unit</InputLabel>
                <Select
                    labelId={name + 'labelID-select'}
                    id={name + "select"}
                    // value={'U'}
                    value={currentMeasureUnit}
                    onChange={handleUnitChange}
                    variant='standard'
                    className={classes.selectUnit}
                >
                    {
                        MEASURE_UNITS.map((unitName: string) => {
                            return <MenuItem value={unitName}>{unitName}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>

            {/* <Divider orientation="vertical" flexItem /> */}
            <FormControl
                className={classes.innerFormControl}
            >
                <TextField

                    id={name + 'previous'}
                    label={'Last'}
                    color="primary"
                    value={previousAmount}
                    variant='standard'
                    className={classes.textfield}
                />
            </FormControl>

        </Fragment>

    )

    return (
        <section className={classes.root}>
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

        </section>

    )
}

export default InputProduct

