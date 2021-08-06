//Material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'

interface IProps {
    open: boolean
    handleCloseModal: () => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    text: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    button: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

const ErrorModal = ({ open, handleCloseModal }: IProps) => {
    const classes = useStyles()
    return (
        <Dialog
            open={open}
            aria-labelledby="Error"
            onClose={() => handleCloseModal()}
        >
            <DialogContentText align="center" className={classes.text}>
                You can't submit two reports with the same date.
            </DialogContentText>
            <DialogActions className={classes.button}>
                <Button
                    onClick={handleCloseModal}
                    color="primary" variant="contained" size="small"
                >Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ErrorModal