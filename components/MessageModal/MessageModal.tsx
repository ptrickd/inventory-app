//React
import React, { useState, useEffect } from "react";

//Material UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

import Typography from "@mui/material/Typography";

//Styles
import { dialogContentStyle, buttonStyle } from "./MessageModal.style";

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
    <Dialog
      open={openModal}
      aria-labelledby="message display"
      sx={{ margin: 0 }}
    >
      <DialogContent>
        {/* className={classes.dialogContent} */}
        {isError ? (
          <Box component="div">
            <Typography color="error" align="center" variant="h5">
              Error
            </Typography>
            <Typography color="error" align="center" variant="subtitle1">
              {message}
            </Typography>
          </Box>
        ) : (
          <Box component="div">
            <Typography color="success" align="center" variant="subtitle1">
              {message}
            </Typography>
          </Box>
        )}
        <Button
          className={buttonStyle}
          variant="contained"
          size="medium"
          onClick={handleClick}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
