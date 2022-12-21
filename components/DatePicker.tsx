//React
import { useState, useEffect } from "react";

import { styled } from '@mui/material/styles';

//Time
import { DateTime } from "luxon";
import LuxonUtils from "@date-io/luxon";

//Material UI
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "@mui/material/TextField";

const PREFIX = 'DatePicker';

const classes = {
  root: `${PREFIX}-root`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    display: "flex",
    justifyContent: "center",
  }
}));

interface IProps {
  handleSelectedDate: (date: Date | null) => void;
}

const initialDate: DateTime = DateTime.now();
const DatePicker = ({ handleSelectedDate }: IProps) => {

  const [selectedDate, setSelectedDate] = useState<DateTime | null>(null);

  return (
    <Root className={classes.root}>
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
    </Root>
  );
};

export default DatePicker;
