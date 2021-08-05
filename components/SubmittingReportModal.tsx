//React
import { useState } from 'react'

//Material UI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

interface IProps {
    open: boolean
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {},
    text: {
        marginTop: 10,
        marginLeft: 10,
        marginRigth: 10
    },
    actions: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {}
}))

const SubmittingReportModal = () => {
    const classes = useStyles()
    const [open, setOpen] = useState(true)
    return (
        <Dialog
            open={open}
            aria-labelledby="Warning Before Submitting"
        >
            <DialogContentText
                className={classes.text}
                align="center"
            >

                Once the report has been submitted, to modify it you will have to delete the present report and resubmit it.

            </DialogContentText>
            <DialogActions
                className={classes.actions}
            >
                <Button
                    onClick={() => setOpen(false)}
                    variant="outlined"
                    color="primary"
                >
                    Submit
                </Button>

            </DialogActions>
        </Dialog>
    )
}

export default SubmittingReportModal