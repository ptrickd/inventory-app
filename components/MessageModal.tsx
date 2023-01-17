//React
import React, { useState, useEffect } from "react";

//Material UI
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

//Constant
import { DRAWER_WIDTH } from "../constants/dimensions";

const PREFIX = "MessageModal";

const classes = {
  root: `${PREFIX}-root`,
  typo: `${PREFIX}-typo`,
  button: `${PREFIX}-button`,
};

const StyledDialog = styled(Dialog)(({ theme: Theme }) => ({
  [`&.${classes.root}`]: {},
}));

const StyledMessage = styled(Box)(({ theme: Theme }) => ({
  [`&.${classes.typo}`]: {
    margin: Theme.spacing(1),
    padding: Theme.spacing(1),
  },
}));

const StyledButton = styled(Button)(({ theme: Theme }) => ({
  [`&.${classes.button}`]: {
    width: "100%",
  },
}));

interface IProps {
  open: boolean;
  message: string;
  isError: boolean;
}

const MessageModal = ({ open, message, isError }: IProps) => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  return (
    <StyledDialog
      open={openModal}
      aria-labelledby="Wait Response From server"
      className={classes.root}
    >
      <DialogContent>
        {isError ? (
          <StyledMessage className={classes.typo}>
            <Typography color="error" align="center" variant="subtitle1">
              {message}
            </Typography>
          </StyledMessage>
        ) : (
          <StyledMessage className={classes.typo}>
            <Typography color="success" align="center" variant="subtitle1">
              {message}
            </Typography>
          </StyledMessage>
        )}
        <StyledButton
          className={classes.button}
          variant="contained"
          size="medium"
        >
          OK
        </StyledButton>
      </DialogContent>
    </StyledDialog>
  );
};

export default MessageModal;
