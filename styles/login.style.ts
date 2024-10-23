//Material UI
import { styled } from "@mui/material-pigment-css";
import Container from "@mui/material-pigment-css/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material-pigment-css/Box";

const PREFIX = "Login";

export const classes = {
  root: `${PREFIX}-root`,
  main: `${PREFIX}-main`,
  title: `${PREFIX}-title`,
};

export const Root = styled(Container)(() => ({
  [`&.${classes.root}`]: {
    display: "flex",
    minHeight: "calc(100vh - 120px)",
    flexDirection: "column",
    width: "100%",
  },
}));

export const Main = styled(Box)(() => ({
  [`&.${classes.main}`]: {
    display: "flex",
    flexDirection: "column",
    marginTop: "15%",
    width: "100%",
    minHeight: "70vh",
    alignContent: "space-between",
  },
}));

export const Title = styled(Typography)(() => ({
  [`&.${classes.title}`]: { marginBottom: 15 },
}));
