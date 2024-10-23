//Material UI

import { styled } from "@mui/material-pigment-css";

const PREFIX = "FirstProduct";

export const classes = {
  button: `${PREFIX}-button`,
  root: `${PREFIX}-root`,
  items: `${PREFIX}-items`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
export const Root = styled("div")(() => ({
  [`&.${classes.root}`]: {
    display: "flex",
    minHeight: "70vh",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10%",
  },
  [`& .${classes.button}`]: {
    width: "70%",
  },
  [`& .${classes.items}`]: { flexGrow: 2 },
}));
