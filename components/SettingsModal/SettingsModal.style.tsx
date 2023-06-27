//Material UI
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

const PREFIX = "SettingsModals";

export const classes = {
  close: `${PREFIX}--close`,
};

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.close}`]: {
    display: "flex",
    justifyContent: "flex-start",
  },
}));
