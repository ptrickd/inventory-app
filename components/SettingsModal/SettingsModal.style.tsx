//Material UI
import { styled } from "@mui/material-pigment-css";
import Dialog from "@mui/material/Dialog";

const PREFIX = "SettingsModals";

export const classes = {
  close: `${PREFIX}--close`,
};

export const StyledDialog = styled(Dialog)(() => ({
  [`& .${classes.close}`]: {
    display: "flex",
    justifyContent: "flex-start",
  },
}));
