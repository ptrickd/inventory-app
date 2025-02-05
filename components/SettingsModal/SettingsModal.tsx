//React
import React, { useEffect, useContext } from "react";

//GraphQl
import { useMutation, gql } from "@apollo/client";

//Material UI
import Dialog from "@mui/material/Dialog";

import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Select, { SelectChangeEvent } from "@mui/material/Select";

//Style
import { closeStyle } from "./SettingsModal.style";

//Icons
import CloseIcon from "@mui/icons-material/Close";

//Context
import { UserContext } from "../../contexts/UserContext";

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
}

const UPDATE_THEME = gql`
  mutation updateUser($theme: String!) {
    updateUser(theme: $theme) {
      theme
      error
    }
  }
`;

const SettingsModal = ({ open, handleCloseModal }: IProps) => {
  const { theme, setTheme } = useContext(UserContext);
  const [updateUser] = useMutation(UPDATE_THEME);

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.value === "light" || event.target.value === "dark")
      if (setTheme) {
        setTheme(event.target.value);
        updateUser({ variables: { theme: event.target.value } });
      }
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="settings"
      onClose={() => handleCloseModal()}
    >
      <DialogActions className={closeStyle}>
        <IconButton onClick={(e) => handleCloseModal()}>
          <CloseIcon />
        </IconButton>
      </DialogActions>

      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <FormControl sx={{ mt: 2, minWidth: 120 }}>
          {/* <InputLabel htmlFor="theme">Theme</InputLabel>
          <Select
            value={theme}
            label="Theme"
            onChange={(event) => handleChange(event)}
          >
            <MenuItem value="light">Light</MenuItem>
            <MenuItem value="dark">Dark</MenuItem>
          </Select> */}
          <Typography variant="h2">
            Work in progress. Come back later
          </Typography>
        </FormControl>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
