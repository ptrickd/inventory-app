//Material UI
import { styled } from "@mui/material-pigment-css";
import Dialog from "@mui/material/Dialog";

const PREFIX = "ErrorModal";

export const classes = {
  text: `${PREFIX}-text`,
  button: `${PREFIX}-button`,
};

export const StyledDialog = styled(Dialog)(() => ({
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
