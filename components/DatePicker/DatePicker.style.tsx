//Material UI
import { styled } from "@mui/material-pigment-css";

const PREFIX = "DatePicker";

export const classes = {
  root: `${PREFIX}-root`,
};

export const Root = styled("div")(() => ({
  [`&.${classes.root}`]: {
    display: "flex",
    justifyContent: "center",
  },
}));
