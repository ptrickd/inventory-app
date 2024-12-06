//React
import { useState, useEffect } from "react";

//Time
import { DateTime } from "luxon";

//Material UI
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import TextField from "@mui/material/TextField";

//Styles
import { rootStyle } from "./DatePicker.style";

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
    <section className={rootStyle} aria-label="date picker">
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <DesktopDatePicker
          // inputFormat="EEE DD"
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
          // renderInput={(props) => <TextField {...props} />}
        />
      </LocalizationProvider>
    </section>
  );
};

export default DatePicker;
