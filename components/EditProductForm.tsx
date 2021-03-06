//React
import React, { useState, useContext, Fragment } from 'react'

//Context
import { ProductsContext } from '../contexts/ProductsContext'
import { UserContext } from '../contexts/UserContext';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

//Form 
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

//GraphQL
import { useQuery } from '@apollo/client'
import { GET_CATEGORIES } from '../graphql/queries'

//Types
import { TCategory } from '../types/types'

//Constants
import { MEASURE_UNITS } from '../constants/measureUnits'

interface IProps {
    open: boolean;
    handleCloseModal: () => void;
    categoryId: string
    productName: string
    productId: string
}

interface IForm {
    name: string
    categoryId: string
}


const useStyle = makeStyles({
    content: {
        display: 'flex',
        flexDirection: 'column'
    },
    buttons: {
        marginTop: 5,
        display: 'flex',
        justifyContent: 'space-around'

    },
    input: {
        display: 'flex',
        flexDirection: 'column'
    },
    category: {
        marginTop: 10
    }

})



function EditProductForm({ open, handleCloseModal, categoryId, productName, productId }: IProps) {
    const classes = useStyle()
    const { editProductApi } = useContext(ProductsContext)
    const { currentUser } = useContext(UserContext)
    const [submitting, setSubmitting] = useState(false)
    const { control, handleSubmit, formState: { errors }, reset } = useForm<IForm>()


    const { data, loading, error } = useQuery(GET_CATEGORIES, {
        variables: { userId: currentUser?.id },
        skip: !currentUser
    })

    const onSubmit: SubmitHandler<IForm> = async (data) => {


        if (editProductApi !== undefined && typeof categoryId === "string") {
            setSubmitting(true)
            await editProductApi(productId, data.name, data.categoryId)

            // reset({ name: '', categoryId: '' })
            setSubmitting(false)
            handleCloseModal()
        }
    }

    const formBody = (
        < form onSubmit={handleSubmit(onSubmit)} >
            <div className={classes.input}>

                <Controller
                    name="name"
                    control={control}
                    defaultValue={productName}
                    rules={{ required: true }}
                    render={({ field }) => <TextField
                        {...field}
                        label="Name"
                        autoComplete="off"
                    />}
                />
                {errors.name && <span>*Required</span>}
                <Controller
                    name="categoryId"
                    control={control}
                    defaultValue={categoryId}
                    rules={{ required: true }}
                    render={({ field }) => <Fragment >
                        <InputLabel className={classes.category}>Category</InputLabel>
                        <Select
                            {...field}
                            label="Category"
                            autoComplete="off"
                        >
                            {data.categories.map((category: TCategory) => (
                                <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                            ))}


                        </Select></Fragment>}
                />
            </div>

            <div className={classes.buttons}>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    type="submit"
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={() => {
                        handleCloseModal()

                    }}
                >
                    Cancel
                </Button>
            </div>
        </form >
    )

    if (loading) return <div><h2>Loading...</h2></div>
    if (error) return <div>`Error! ${error.message}`</div>

    return (
        <Dialog
            open={open}
            aria-labelledby="Add Category Form"
            onClose={() => handleCloseModal()}
        >
            {/* <DialogTitle>Add a category</DialogTitle> */}
            <DialogContent className={classes.content}>
                {!submitting ? formBody : <CircularProgress />}

            </DialogContent>

        </Dialog >
    )
}

export default EditProductForm
