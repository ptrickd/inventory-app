//React
import React, { useEffect, useContext } from "react";

//GraphQl
import { useMutation, gql } from "@apollo/client";

//Material UI
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

//Icons
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

//Context
import { UserContext } from "../contexts/UserContext";

interface IProps {
  open: boolean;
  handleArrowClicked: () => void;
}

const UPDATE_THEME = gql`
  mutation updateUser($theme: String!) {
    updateUser(theme: $theme) {
      theme
      error
    }
  }
`;

const PREFIX = "SettingsModals";

const classes = {
  root: `${PREFIX}--root`,
  arrow: `${PREFIX}--arrow`,
};

const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.arrow}`]: {
    display: "flex",
    justifyContent: "flex-start",
  },
}));

const SettingsModal = ({ open, handleArrowClicked }: IProps) => {
  const { theme, setTheme } = useContext(UserContext);
  const [updateUser] = useMutation(UPDATE_THEME);

  const handleChange = (event: SelectChangeEvent) => {
    if (setTheme) {
      setTheme(event.target.value);
      updateUser({ variables: { theme: event.target.value } });
    }
  };

  return (
    <StyledDialog open={open} aria-labelledby="settings">
      <DialogActions className={classes.arrow}>
        <IconButton onClick={(e) => handleArrowClicked()}>
          <ArrowBackIcon />
        </IconButton>
      </DialogActions>

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
    </StyledDialog>
  );
};

export default SettingsModal;
