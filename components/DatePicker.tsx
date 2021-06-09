//React
import { useState, useEffect } from 'react'
//Time
import { DateTime } from 'luxon'
import LuxonUtils from '@date-io/luxon'

//Material UI
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const DatePicker = () => {
    const initialDate = DateTime.now()
    const [selectedDate, setSelectedDate] = useState<DateTime | null>(initialDate)


    return (
        <div>
            <MuiPickersUtilsProvider utils={LuxonUtils}>
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