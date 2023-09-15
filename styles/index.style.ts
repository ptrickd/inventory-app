//Material UI
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const PREFIX = "index";

export const classes = {
  root: `${PREFIX}--root`,
  main: `${PREFIX}-main`,
  title: `$(PREFIX)--title`,
  subtitle: `$(PREFIX)--subtitle`,
  button: `$(PREFIX)--button`,
};
export const Root = styled(Container)(({ theme: Theme }) => ({
  [`&.${classes.root}`]: {
    display: "flex",
    minHeight: "calc(100vh - 120px)",
    flexDirection: "column",
    justifyContent: "center",
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

export const StyledTypography = styled(Typography)(({ theme: Theme }) => ({
  [`&.${classes.title}`]: { marginBottom: 20 },
  [`&.${classes.subtitle}`]: { marginBottom: 20 },
}));

export const StyledButton = styled(Button)(({ theme: Theme }) => ({
  [`&.${classes.button}`]: {
    width: "70%",
    marginBottom: "15%",
    borderRadius: 15,
  },
}));
