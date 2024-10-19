//React
import React from "react";

//Material UI
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

//Styles
import { classes, StyledDialog, ButtonsSection } from "./UseChoiceModal.styles";

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
    <StyledDialog
      open={open}
      aria-labelledby="Error"
      onClose={() => handleCloseModal()}
    >
      <DialogContentText align="center" className={classes.text}>
        {message}
      </DialogContentText>
      <ButtonsSection className={classes.buttonsSection}>
        <DialogActions className={classes.button}>
          <Button
            onClick={() => handleUserResponse(true)}
            color="primary"
            variant="contained"
            size="small"
          >
            Yes
          </Button>
        </DialogActions>
        <DialogActions className={classes.button}>
          <Button
            onClick={() => handleUserResponse(false)}
            color="error"
            variant="contained"
            size="small"
          >
            No
          </Button>
        </DialogActions>
      </ButtonsSection>
    </StyledDialog>
  );
};

export default UserChoiceModal;
