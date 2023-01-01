//React
import React, { useEffect, useContext } from "react";

//Material UI
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import MenuItem from "@mui/material/MenuItem";

import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

//Context
import { UserContext } from "../contexts/UserContext";

interface IProps {
  open: boolean;
}

const SettingsModal = ({ open }: IProps) => {
  const { theme, setTheme } = useContext(UserContext);
  useEffect(() => {
    if (theme) console.log(`theme:${theme}`);
  }, [theme]);
  const handleChange = (event: SelectChangeEvent) => {
    if (setTheme) setTheme(event.target.value);
  };
  return (
    <Dialog open={open} aria-labelledby="Settings">
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <FormControl sx={{ mt: 2, minWidth: 120 }}>
          <InputLabel htmlFor="theme">Theme</InputLabel>
          <Select
            value={theme}
            label="Theme"
            onChange={(event) => handleChange(event)}
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
