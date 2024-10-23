//Material UI
import { styled } from "@mui/material-pigment-css";
import Container from "@mui/material-pigment-css/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material-pigment-css/Box";
import Typography from "@mui/material/Typography";

//Styles
const PREFIX = "Report";

export const classes = {
  root: `${PREFIX}-root`,
  main: `${PREFIX}-main`,
  title: `${PREFIX}-title`,
  date: `${PREFIX}-date`,
  category: `${PREFIX}-category`,
  product: `${PREFIX}-product`,
  button: `${PREFIX}-button`,
  status: `${PREFIX}-status`,
};

export const Root = styled(Container)(() => ({
  [`& .${classes.root}`]: {
    display: "flex",
    minHeight: "calc(100vh - 120px)",
    flexDirection: "column",
    width: "100%",
  },

  [`& .${classes.title}`]: {
    marginBottom: 15,
  },

  [`& .${classes.product}`]: {
    width: "100%",
  },

  [`& .${classes.date}`]: {
    marginBottom: 15,
  },
}));

export const Main = styled(Box)(() => ({
  [`&.${classes.main}`]: {
    display: "flex",
    flexDirection: "column",
    marginTop: "15%",
    marginBottom: "10%",
    width: "100%",
    minHeight: "70vh",
    alignContent: "space-between",
  },
}));

export const StyledButton = styled(Button)(() => ({
  [`&.${classes.button}`]: {
    width: "70%",
    alignSelf: "center",
    marginTop: 10,
  },
}));

export const Status = styled(Typography)(() => ({
  [`&.${classes.status}`]: {
    marginBottom: 10,
  },
}));
