//Material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText'

const ErrorModal = () => {

    return (
        <Dialog
            open={true}
            aria-labelledby="Error"

        >
            <DialogContentText>
                You can't submit two reports with the same date.
            </DialogContentText>
        </Dialog>
    )
}

export default ErrorModal