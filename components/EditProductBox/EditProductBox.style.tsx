//Material UI
import { styled } from "@mui/material-pigment-css";

//Styles
const PREFIX = "EditProductPart";

export const classes = {
  root: `${PREFIX}-root`,
};

export const Root = styled("div")(() => ({
  [`&.${classes.root}`]: {
    width: "100%",
    maxWidth: 450,
    padding: 5,
    display: "flex",
    justifyContext: "center",
    alignItems: "center",
    gap: 25,
  },
}));
