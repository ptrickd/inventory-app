//React
import React, { useState, useEffect, useContext, Fragment } from 'react'

//Context
import { ProductsContext } from '../contexts/ProductsContext'

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

//Form 
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

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

interface ICategory {
    _id: string
    name: string
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
    const { editProduct } = useContext(ProductsContext)
    const [submitting, setSubmitting] = useState(false)
    const { control, handleSubmit, formState: { errors }, reset } = useForm<IForm>()

    const [allCategories, setAllCategories] = useState<ICategory[]>([])

    useEffect(() => {
        fetch(`/api/category/`)
            .then(resp => resp.json())
            .then(data => { setAllCategories(data) })
    }, [])

    const onSubmit: SubmitHandler<IForm> = async (data) => {


        if (editProduct !== undefined && typeof categoryId === "string") {
            setSubmitting(true)
            await editProduct(productId, data.name, data.categoryId)

            reset({ name: '', categoryId: '' })
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
                            {allCategories.map((category) => (
                                <MenuItem value={category._id}>{category.name}</MenuItem>
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
