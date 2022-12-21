//Material UI
import makeStyles from "@mui/styles/makeStyles";
import { Theme, createStyles } from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

interface IProps {
  open: boolean;
  handleCloseModal: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    text: {
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    button: {
      display: "flex",
      justifyContent: "center",
    },
  })
);
const text = "You can't submit two reports with the same date.";

const ErrorModal = ({ open, handleCloseModal }: IProps) => {
  const classes = useStyles();
  return (
    <Dialog
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
    </Dialog>
  );
};

export default ErrorModal;
