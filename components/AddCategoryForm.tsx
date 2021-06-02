import React, { useState } from 'react'

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


//Form 
import { useForm, SubmitHandler } from 'react-hook-form'
import { CompassCalibrationOutlined } from '@material-ui/icons';
interface IProps {
    open: boolean;
    handleCloseModal: (categoryName: string) => void;
}

type Inputs = {
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



function AddCategoryForm({ open, handleCloseModal }: IProps) {
    const classes = useStyle()


    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log('fetching')
        fetch('/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: data.name })
        })
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(err => console.log('error:', err))
    }

    return (
        <Dialog
            open={open}
            aria-labelledby="Add Category Form"
            onClose={() => handleCloseModal('')}
        >
            <DialogTitle>Add A Category</DialogTitle>
            <DialogContent className={classes.content}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.input}>
                        <TextField
                            label='Category Name'

                            {...register("name", { required: true })}
                        />
                        {errors.name && <span>*Field required</span>}
                    </div>

                    <div className={classes.buttons}>
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            type="submit"
                        >
                            Add
                            </Button>
                        <Button
                            variant="contained"
                            size="small"
                            color="secondary"
                            onClick={() => {
                                handleCloseModal('')

                            }}
                        >
                            Cancel
                            </Button>
                    </div>
                </form>



            </DialogContent>

        </Dialog>
    )
}

export default AddCategoryForm
