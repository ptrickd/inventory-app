//Material UI
import { styled } from "@mui/material-pigment-css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material-pigment-css/Box";
import Button from "@mui/material/Button";

const PREFIX = "MessageModal";

export const classes = {
  root: `${PREFIX}-root`,
  typo: `${PREFIX}-typo`,
  button: `${PREFIX}-button`,
  dialogContent: `${PREFIX}-dialog-content`,
};

export const StyledDialog = styled(Dialog)(() => ({
  [`&.${classes.root}`]: {},
}));

export const StyledDialogContent = styled(DialogContent)(() => ({
  [`&.${classes.dialogContent}`]: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const StyledMessage = styled(Box)(() => ({
  [`&.${classes.typo}`]: {
    // margin: Theme.spacing(1),
    // padding: Theme.spacing(1),
  },
}));

export const StyledButton = styled(Button)(() => ({
  [`&.${classes.button}`]: {
    width: "100%",
    maxWidth: 50,
  },
}));
