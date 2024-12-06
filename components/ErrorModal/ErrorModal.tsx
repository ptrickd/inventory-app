//Material UI
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

//Types
import { textStyle, buttonStyle } from "./ErrorModal.style";

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
}

const text = "You can't submit two reports with the same date.";

const ErrorModal = ({ open, handleCloseModal }: IProps) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="Error"
      onClose={() => handleCloseModal()}
    >
      <DialogContentText align="center" className={textStyle}>
        {text}
      </DialogContentText>
      <DialogActions className={buttonStyle}>
        <Button
          onClick={handleCloseModal}
          color="primary"
          variant="contained"
          size="small"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
