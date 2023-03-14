//Material UI
import { styled } from "@mui/material/styles";

const PREFIX = "DatePicker";

export const classes = {
  root: `${PREFIX}-root`,
};

export const Root = styled("div")(({ theme }) => ({
  [`&.${classes.root}`]: {
    display: "flex",
    justifyContent: "center",
  },
}));
