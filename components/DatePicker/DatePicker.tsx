//React
import { useState, useEffect } from "react";

//Time
import { DateTime } from "luxon";
import LuxonUtils from "@date-io/luxon";

//Material UI
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";

//Styles
import { classes, Root } from "./DatePicker.style";

interface IProps {
  handleSelectedDate: (date: Date | null) => void;
  initialDate: Date | null;
}

const DatePicker = ({ handleSelectedDate, initialDate }: IProps) => {
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);
  const [isSelectedDate, setIsSelectedDate] = useState(false);
  useEffect(() => {
    if (!isSelectedDate && initialDate) {
      setSelectedDate(DateTime.fromJSDate(initialDate));
    }
  }, [isSelectedDate, setSelectedDate, initialDate]);
  return (
    <Root className={classes.root}>
      <LocalizationProvider dateAdapter={LuxonUtils}>
        <DesktopDatePicker
          inputFormat="EEE DD"
          value={selectedDate}
          onChange={(date) => {
            if (date) {
              setSelectedDate(date);
              setIsSelectedDate(true);
              handleSelectedDate(date?.toJSDate());
              // handleSelectedDate(date?.toJSDate());
            }
          }}
          onError={(err) => {
            console.error(err);
          }}
          renderInput={(props) => <TextField {...props} />}
        />
      </LocalizationProvider>
    </Root>
  );
};

export default DatePicker;