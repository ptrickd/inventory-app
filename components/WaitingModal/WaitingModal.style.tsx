//Material UI
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material-pigment-css";
import { DRAWER_WIDTH } from "../../constants/dimensions";

const PREFIX = "WaitingModal";

export const classes = {
  root: `${PREFIX}-root`,
};

export const StyledDialog = styled(Dialog)(() => ({
  [`&.${classes.root}`]: {
    // marginLeft: DRAWER_WIDTH
  },
}));
