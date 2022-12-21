import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import { DRAWER_WIDTH } from "../constants/dimensions";

const PREFIX = "WaitingModal";

const classes = {
  root: `${PREFIX}-root`,
};

const StyledDialog = styled(Dialog)(({ theme: Theme }) => ({
  [`&.${classes.root}`]: {
    // marginLeft: DRAWER_WIDTH
  },
}));

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
