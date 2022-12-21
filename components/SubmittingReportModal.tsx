//React
import { useState } from "react";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

const PREFIX = "SubmittingReportModal";

const classes = {
  root: `${PREFIX}-root`,
  text: `${PREFIX}-text`,
  actions: `${PREFIX}-actions`,
  button: `${PREFIX}-button`,
};

const StyledDialog = styled(Dialog)(({ theme: Theme }) => ({
  [`& .${classes.root}`]: {},

  [`& .${classes.text}`]: {
    marginTop: 10,
    marginLeft: 10,
    marginRigth: 10,
  },

  [`& .${classes.actions}`]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  [`& .${classes.button}`]: {},
}));

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
}

const SubmittingReportModal = ({ open, handleCloseModal }: IProps) => {
  return (
    <StyledDialog
      open={open}
      aria-labelledby="Warning Before Submitting"
      onClose={() => handleCloseModal()}
    >
      <DialogContentText className={classes.text} align="center">
        Once the report has been submitted, to modify it you will have to delete
        the present report and resubmit it.
      </DialogContentText>
      <DialogActions className={classes.actions}>
        <Button onClick={handleCloseModal} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default SubmittingReportModal;
