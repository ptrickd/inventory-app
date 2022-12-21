//React
import { useState } from "react";

//Material UI
import { makeStyles, Theme, createStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    text: {
      marginTop: 10,
      marginLeft: 10,
      marginRigth: 10,
    },
    actions: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    button: {},
  })
);

const SubmittingReportModal = ({ open, handleCloseModal }: IProps) => {
  const classes = useStyles();

  return (
    <Dialog
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
    </Dialog>
  );
};

export default SubmittingReportModal;
