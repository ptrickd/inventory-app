//Material UI
import { styled } from "@mui/material-pigment-css";
import Dialog from "@mui/material/Dialog";

const PREFIX = "EditProductForm";

export const classes = {
  content: `${PREFIX}-content`,
  buttons: `${PREFIX}-buttons`,
  input: `${PREFIX}-input`,
  category: `${PREFIX}-category`,
};

export const StyledDialog = styled(Dialog)({
  [`& .${classes.content}`]: {
    display: "flex",
    flexDirection: "column",
  },
  [`& .${classes.buttons}`]: {
    marginTop: 5,
    display: "flex",
    justifyContent: "space-around",
  },
  [`& .${classes.input}`]: {
    display: "flex",
    flexDirection: "column",
  },
  [`& .${classes.category}`]: {
    marginTop: 10,
  },
});
