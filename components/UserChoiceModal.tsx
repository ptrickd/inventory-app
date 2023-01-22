//React
import React from "react";

//Material UI
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

//Styles
const PREFIX = "UserChoiceModal";

const classes = {
  text: `${PREFIX}-text`,
  button: `${PREFIX}-butt-button`,
  buttonsSection: `${PREFIX}-buttons-section`,
};

const StyledDialog = styled(Dialog)(({ theme: Theme }) => ({
  [`& .${classes.text}`]: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
}));

const ButtonsSection = styled(Box)(({ theme: Theme }) => ({
  [`&.${classes.buttonsSection}`]: {
    maxWidth: 300,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
}));
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
      <ButtonsSection component="section" className={classes.buttonsSection}>
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
