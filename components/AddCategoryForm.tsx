import React, { useState } from 'react'

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'


//Form 
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { specifiedRules } from 'graphql';
interface IProps {
    open: boolean;
    handleCloseModal: () => void;
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



function AddCategoryForm({ open, handleCloseModal }: IProps) {
    const classes = useStyle()

    const { control, handleSubmit, formState: { errors } } = useForm<IForm>()

    const onSubmit: SubmitHandler<IForm> = async (data) => {

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
            onClose={() => handleCloseModal()}
        >
            {/* <DialogTitle>Add a category</DialogTitle> */}
            <DialogContent className={classes.content}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={classes.input}>

                        <Controller

                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{ required: true }}
                            render={({ field }) => <TextField {...field} label="Add a category" autoComplete="off" />}
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
                            Add
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
                </form>



            </DialogContent>

        </Dialog >
    )
}

export default AddCategoryForm
