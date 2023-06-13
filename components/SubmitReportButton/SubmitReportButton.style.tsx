//Material UI
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

//Styles
const PREFIX = "sumit-report-button";

export const classes = {
  button: `${PREFIX}-button`,
  containerButtons: `${PREFIX}-container-buttons`,
};
export const ContainerButtons = styled(Box)(() => ({
  [`&.${classes.containerButtons}`]: {
    display: "flex",
    justifyContent: "center",
  },
}));

export const StyledButton = styled(Button)(() => ({
  [`&.${classes.button}`]: {
    width: "70%",
    alignSelf: "center",
    marginTop: 10,
  },
}));
