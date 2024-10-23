//Material UI
import { styled } from "@mui/material-pigment-css";
import Box from "@mui/material-pigment-css/Box";

const PREFIX = "DisplayMessage";

export const classes = {
  root: `${PREFIX}-root`,
};

export const StyledBox = styled(Box)(() => ({
  [`&.${classes.root}`]: {
    // margin: Theme.spacing(1),
    // padding: Theme.spacing(1),
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 5,
  },
}));
