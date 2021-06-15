//Material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import CircularProgress from "@material-ui/core/CircularProgress";
import { DRAWER_WIDTH } from '../constants/dimensions'

interface IProps {
    open: boolean
}

const useStyles = makeStyles((theme: theme) => createStyles({
    root: {
        marginLeft: DRAWER_WIDTH
    }
}))

const WaitingModal = ({ open }: IProps) => {
    const classes = useStyles()
    return (

        <Dialog
            open={open}
            aria-labelledby="Wait Response From server"
            className={classes.root}
        >
            <DialogContent>
                <CircularProgress />
            </DialogContent>
        </Dialog>


    )
}

export default WaitingModal