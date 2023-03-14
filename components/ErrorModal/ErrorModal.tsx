//Material UI
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

//Types
import { classes, StyledDialog } from "./ErrorModal.style";

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
}

const text = "You can't submit two reports with the same date.";

const ErrorModal = ({ open, handleCloseModal }: IProps) => {
  return (
    <StyledDialog
      open={open}
      aria-labelledby="Error"
      onClose={() => handleCloseModal()}
    >
      <DialogContentText align="center" className={classes.text}>
        {text}
      </DialogContentText>
      <DialogActions className={classes.button}>
        <Button
          onClick={handleCloseModal}
          color="primary"
          variant="contained"
          size="small"
        >
          Close
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default ErrorModal;
