//Material UI
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";

const PREFIX = "Dashboard";

export const classes = {
  root: `${PREFIX}-root`,
  main: `${PREFIX}-main`,
  divider: `${PREFIX}-divider`,
};

export const Root = styled(Container)(({ theme: Theme }) => ({
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
    marginBottom: "10%",
    width: "100%",
    minHeight: "70vh",
    alignContent: "space-between",
  },
}));

export const StyledDivider = styled(Divider)(() => ({
  [`&.${classes.divider}`]: {
    // marginTop: 10,
    marginBottom: 10,
  },
}));
