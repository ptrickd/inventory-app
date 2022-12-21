//Material UI
import { makeStyles, Theme, createStyles } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import { DRAWER_WIDTH } from "../constants/dimensions";

interface IProps {
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // marginLeft: DRAWER_WIDTH
    },
  })
);

const WaitingModal = ({ open }: IProps) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      aria-labelledby="Wait Response From server"
      className={classes.root}
    >
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
};

export default WaitingModal;
