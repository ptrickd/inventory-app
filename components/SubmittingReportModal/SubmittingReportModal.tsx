//Material UI
import Dialog from "@mui/material/Dialog";

import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

//Types
import { textStyle, actionsStyle } from "./SubmittingReportModal.style";

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
}

const SubmittingReportModal = ({ open, handleCloseModal }: IProps) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="Warning Before Submitting"
      onClose={() => handleCloseModal()}
    >
      <DialogContentText className={textStyle} align="center">
        Once the report has been submitted, to modify it you will have to delete
        the present report and resubmit it.
      </DialogContentText>
      <DialogActions className={actionsStyle}>
        <Button onClick={handleCloseModal} variant="contained" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubmittingReportModal;
