//React
import { useState, useEffect } from "react";

//Time
import { DateTime } from "luxon";
import LuxonUtils from "@date-io/luxon";

//Material UI
// import { DatePicker as DP } from '@material-ui/pickers'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

interface IProps {
  handleSelectedDate: (date: Date | null) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },
  })
);
const initialDate: DateTime = DateTime.now();
const DatePicker = ({ handleSelectedDate }: IProps) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(
    initialDate
  );

  useEffect(() => {
    if (selectedDate && selectedDate !== initialDate)
      handleSelectedDate(selectedDate.toJSDate());
  }, [selectedDate, handleSelectedDate]);

  return (
    <div className={classes.root}>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="DDDD"
          margin="normal"
          value={selectedDate}
          onChange={setSelectedDate}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default DatePicker;
