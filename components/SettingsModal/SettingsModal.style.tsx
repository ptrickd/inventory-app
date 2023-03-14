//Material UI
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

const PREFIX = "SettingsModals";

export const classes = {
  arrow: `${PREFIX}--arrow`,
};

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  [`& .${classes.arrow}`]: {
    display: "flex",
    justifyContent: "flex-start",
  },
}));
