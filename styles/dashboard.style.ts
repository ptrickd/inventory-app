//Material UI
import { styled } from "@mui/material-pigment-css";
import Container from "@mui/material-pigment-css/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Box from "@mui/material-pigment-css/Box";
import Typography from "@mui/material/Typography";

const PREFIX = "Dashboard";

export const classes = {
  root: `${PREFIX}-root`,
  main: `${PREFIX}-main`,
  styledPaper: `${PREFIX}-styled-paper`,
  divider: `${PREFIX}-divider`,
};

export const Root = styled(Container)(() => ({
  [`&.${classes.root}`]: {
    minHeight: "calc(100vh - 120px)",
    width: "100%",
  },
}));

export const Main = styled(Box)(() => ({
  [`&.${classes.main}`]: {
    marginTop: "15%",
    marginBottom: "10%",
    width: "100%",
    minHeight: "70vh",
  },
}));

export const StyledPaper = styled(Paper)(() => ({
  [`&.${classes.styledPaper}`]: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  },
}));

export const StyledDivider = styled(Divider)(() => ({
  [`&.${classes.divider}`]: {
    marginBottom: 10,
  },
}));
