//React
import React, { useState, useEffect } from "react";

//Material UI
import Typography from "@mui/material/Typography";

//Styles
import {
  classes,
  StyledDialog,
  StyledDialogContent,
  StyledMessage,
  StyledButton,
} from "./MessageModal.style";

interface IProps {
  open: boolean;
  message: string;
  isError: boolean;
  handleClick: () => void;
}

const MessageModal = ({ open, message, isError, handleClick }: IProps) => {
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  return (
    <StyledDialog
      open={openModal}
      aria-labelledby="message display"
      className={classes.root}
    >
      <StyledDialogContent className={classes.dialogContent}>
        {isError ? (
          <StyledMessage component="span" className={classes.typo}>
            <Typography color="error" align="center" variant="h5">
              Error
            </Typography>
            <Typography color="error" align="center" variant="subtitle1">
              {message}
            </Typography>
          </StyledMessage>
        ) : (
          <StyledMessage component="span" className={classes.typo}>
            <Typography color="success" align="center" variant="subtitle1">
              {message}
            </Typography>
          </StyledMessage>
        )}
        <StyledButton
          className={classes.button}
          variant="contained"
          size="medium"
          onClick={handleClick}
        >
          OK
        </StyledButton>
      </StyledDialogContent>
    </StyledDialog>
  );
};

export default MessageModal;
