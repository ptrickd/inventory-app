//React
import React from "react";

//Material UI
import Box from "@mui/material-pigment-css/Box";

import Dialog from "@mui/material/Dialog";

import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

//Styles
import { textStyle, buttonsSectionStyle } from "./UseChoiceModal.styles";

//
interface IProps {
  open: boolean;
  message: string;
  handleCloseModal: () => void;
  handleUserResponse: (choice: boolean) => void;
}

const UserChoiceModal = ({
  open,
  message,
  handleCloseModal,
  handleUserResponse,
}: IProps) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="Error"
      onClose={() => handleCloseModal()}
    >
      <DialogContentText align="center" className={textStyle}>
        {message}
      </DialogContentText>
      <section className={buttonsSectionStyle}>
        <DialogActions>
          <Button
            onClick={() => handleUserResponse(true)}
            color="primary"
            variant="contained"
            size="small"
          >
            Yes
          </Button>
        </DialogActions>
        <DialogActions>
          <Button
            onClick={() => handleUserResponse(false)}
            color="error"
            variant="contained"
            size="small"
          >
            No
          </Button>
        </DialogActions>
      </section>
    </Dialog>
  );
};

export default UserChoiceModal;
