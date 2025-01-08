//Material UI
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";

//Types
import { rootStyle } from "./WaitingModal.style";

interface IProps {
  open: boolean;
}

const WaitingModal = ({ open }: IProps) => {
  return (
    <Dialog open={open} aria-labelledby="Wait Response From server">
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
};

export default WaitingModal;
