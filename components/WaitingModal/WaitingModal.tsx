//Material UI
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";

//Types
import { classes, StyledDialog } from "./WaitingModal.style";

interface IProps {
  open: boolean;
}

const WaitingModal = ({ open }: IProps) => {
  return (
    <StyledDialog
      open={open}
      aria-labelledby="Wait Response From server"
      className={classes.root}
    >
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </StyledDialog>
  );
};

export default WaitingModal;
