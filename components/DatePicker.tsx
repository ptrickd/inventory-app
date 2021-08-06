//React
import { useState, useEffect } from 'react'

//Time
import { DateTime } from 'luxon'
import LuxonUtils from '@date-io/luxon'

//Material UI
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

interface IProps {
    handleSelectedDate: (date: DateTime | null) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

const DatePicker = ({ handleSelectedDate }: IProps) => {
    const initialDate = DateTime.now()
    const [selectedDate, setSelectedDate] = useState<DateTime | null>(initialDate)
    const classes = useStyles()

    useEffect(() => {
        // console.log(selectedDate)
        handleSelectedDate(selectedDate)
    }, [selectedDate])

    return (
        <div className={classes.root}>
            <MuiPickersUtilsProvider utils={LuxonUtils} >
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="DDDD"
                    margin="normal"
                    value={selectedDate}
                    onChange={date => setSelectedDate(date)}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />

            </MuiPickersUtilsProvider>
        </div>
    )
}

export default DatePicker