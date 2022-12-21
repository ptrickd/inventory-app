import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const PREFIX = "ErrorModal";

const classes = {
  text: `${PREFIX}-text`,
  button: `${PREFIX}-button`,
};

const StyledDialog = styled(Dialog)(({ theme: Theme }) => ({
  [`& .${classes.text}`]: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },

  [`& .${classes.button}`]: {
    display: "flex",
    justifyContent: "center",
  },
}));

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
