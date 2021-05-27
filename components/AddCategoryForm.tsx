import React from 'react'

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyle = makeStyles({
    content: {
        display: 'flex',
        flexDirection: 'column'
    }
})

function AddCategoryForm() {
    const classes = useStyle()

    return (
        <Dialog
            open={true}
            aria-labelledby="Add Category Form"
        >
            <DialogTitle>Add Category Form</DialogTitle>
            <DialogContent className={classes.content}>
                <TextField
                    label='Product Name'
                />
                <Button>Add</Button>
            </DialogContent>

        </Dialog>
    )
}

export default AddCategoryForm
