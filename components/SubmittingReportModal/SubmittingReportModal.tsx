//Material UI
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

//Types
import { classes, StyledDialog } from "./SubmittingReportModal.style";

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
