//React
import { useState, useEffect } from 'react'
//Time
import { DateTime } from 'luxon'
import LuxonUtils from '@date-io/luxon'

//Material UI
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
    KeyboardDateTimePicker
} from '@material-ui/pickers';


const DatePicker = () => {
    const initialDate = DateTime.now()
    const [selectedDate, setSelectedDate] = useState<DateTime | null>()

    useEffect(() => {
        console.log(selectedDate)
    }, [])

    return (
        <div>
            <h2>DatePicker</h2>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
                <KeyboardDatePicker
                    variant="inline"
                    format="yyyy/MM/dd"
                    // format="dateFormat"
                    margin="normal"
                    value={selectedDate}
                    onChange={date => setSelectedDate(date)}
                />

            </MuiPickersUtilsProvider>
        </div>
    )
}

export default DatePicker