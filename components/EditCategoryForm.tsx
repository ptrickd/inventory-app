import React, { useState } from 'react'

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
    handleCloseModal: () => object;
    category: {
        name: string
    }
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



function EditCategoryForm({ open, handleCloseModal, category }: IProps) {
    const classes = useStyle()
    const [submitting, setSubmitting] = useState(false)
    const { control, handleSubmit, formState: { errors }, reset } = useForm<IForm>()


    const onSubmit: SubmitHandler<IForm> = async (data) => {
        setSubmitting(true)
        await fetch(`/api/category/${category._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: data.name })
        })
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(err => console.log('error:', err))
        reset({ name: '' })
        setSubmitting(false)
        handleCloseModal({ name: data.name })
    }

    const formBody = (
        < form onSubmit={handleSubmit(onSubmit)} >
            <div className={classes.input}>

                <Controller

                    name="name"
                    control={control}
                    defaultValue={category.name}
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


    if (!category.name) return null
    return (
        <Dialog
            open={open}
            aria-labelledby="Add Category Form"
            onClose={() => handleCloseModal()}
        >
            <DialogTitle>{category.name.toUpperCase()}</DialogTitle>
            <DialogContent className={classes.content}>
                {!submitting ? formBody : <CircularProgress />}

            </DialogContent>

        </Dialog >
    )
}

export default EditCategoryForm
