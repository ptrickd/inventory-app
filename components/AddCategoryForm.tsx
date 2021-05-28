import React, { useState } from 'react'

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

interface IProps {
    open: boolean;
    handleCloseModal: Function;
}

const useStyle = makeStyles({
    content: {
        display: 'flex',
        flexDirection: 'column'
    }
})

function AddCategoryForm({ open, handleCloseModal }: IProps) {
    const classes = useStyle()
    const [content, setContent] = useState('')

    return (
        <Dialog
            open={open}
            aria-labelledby="Add Category Form"
        >
            <DialogTitle>Add Category Form</DialogTitle>
            <DialogContent className={classes.content}>
                <TextField
                    label='Product Name'
                    required
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <Button onClick={() => handleCloseModal(content)}>Add</Button>
            </DialogContent>

        </Dialog>
    )
}

export default AddCategoryForm
