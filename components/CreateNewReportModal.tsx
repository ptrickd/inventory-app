//React
import { useState } from 'react'

//Component
import DatePicker from './DatePicker'

//Material UI
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

//Time
import { DateTime } from 'luxon'

interface IProps {
    open: boolean
    handleCloseModal: () => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        margin: theme.spacing(4),
        padding: theme.spacing(4)
    },
    button: {
        marginTop: 10
    }
}))

function CreateNewReportModal({ open, handleCloseModal }: IProps) {
    const classes = useStyles()
    const [date, setDate] = useState<DateTime | null>(DateTime.now())

    const handleSelectedDate = (date: DateTime | null) => {
        console.log('date from datepocker', date)
    }

    return (
        <Dialog
            open={open}
            aria-labelledby="Create A New Report"
            onClose={() => handleCloseModal()}
            className={classes.root}
        >
            <DialogContent>
                <Typography variant="h5">Choose the date for the next report</Typography>
                <DatePicker handleSelectedDate={handleSelectedDate} />
                <Button
                    className={classes.button}
                    variant="contained"
                    color='primary'
                    fullWidth
                >Create</Button>
            </DialogContent>
        </Dialog>
    )
}

export default CreateNewReportModal
