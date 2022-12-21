//React
import { useState, useEffect } from "react";

//Time
import { DateTime } from "luxon";
import LuxonUtils from "@date-io/luxon";

//Material UI
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import makeStyles from "@mui/styles/makeStyles";
import { Theme, createStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";

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
  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);

  return (
    <div className={classes.root}>
      <LocalizationProvider dateAdapter={LuxonUtils}>
        <DesktopDatePicker
          inputFormat="MM/DD/YYYY"
          value={selectedDate}
          onChange={(value) => {
            if (value) setSelectedDate(value);
          }}
          onClose={() => {
            if (selectedDate) handleSelectedDate(selectedDate?.toJSDate());
          }}
          renderInput={(props) => <TextField {...props} />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePicker;
