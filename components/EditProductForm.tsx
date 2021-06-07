//React
import React, { useState, useContext } from 'react'

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

//Form 
import { useForm, Controller, SubmitHandler } from 'react-hook-form'

interface IProps {
    open: boolean;
    handleCloseModal: () => void;
    categoryId: string | string[] | undefined
    productName: string
    productId: string
}

interface IForm {
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
    }

})



function EditProductForm({ open, handleCloseModal, categoryId, productName, productId }: IProps) {
    const classes = useStyle()
    const { editProduct } = useContext(ProductsContext)
    const [submitting, setSubmitting] = useState(false)
    const { control, handleSubmit, formState: { errors }, reset } = useForm<IForm>()

    const onSubmit: SubmitHandler<IForm> = async (data) => {

        setSubmitting(true)
        if (editProduct !== undefined && typeof categoryId === "string") {
            await editProduct(productId, data.name)

            reset({ name: '' })
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
