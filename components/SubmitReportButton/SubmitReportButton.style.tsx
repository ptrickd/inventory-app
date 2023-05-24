//Material UI
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

//Styles
const PREFIX = "sumit-report-button";

export const classes = {
  button: `${PREFIX}-button`,
};

export const StyledButton = styled(Button)(() => ({
  [`&.${classes.button}`]: {
    width: "70%",
    alignSelf: "center",
    marginTop: 10,
  },
}));
