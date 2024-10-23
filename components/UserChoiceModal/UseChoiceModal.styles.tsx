//Material UI
import { styled } from "@mui/material-pigment-css";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material-pigment-css/Box";

const PREFIX = "UserChoiceModal";

export const classes = {
  text: `${PREFIX}-text`,
  button: `${PREFIX}-butt-button`,
  buttonsSection: `${PREFIX}-buttons-section`,
};

export const StyledDialog = styled(Dialog)(() => ({
  [`& .${classes.text}`]: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
}));

export const ButtonsSection = styled(Box)(() => ({
  [`&.${classes.buttonsSection}`]: {
    maxWidth: 300,
    padding: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
}));
