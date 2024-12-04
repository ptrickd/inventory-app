//Material UI
import { css } from "@mui/material-pigment-css";
import Container from "@mui/material-pigment-css/Container";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Box from "@mui/material-pigment-css/Box";

export const rootStyle = css({
  minHeight: "calc(100vh - 120px)",
  width: "100%",
});

export const mainStyle = {
  marginTop: "15%",
  marginBottom: "10%",
  width: "100%",
  minHeight: "70vh",
};

export const paperStyle =( {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  }),
}));

export const StyledDivider = styled(Divider)(() => ({
  [`&.${classes.divider}`]: {
    marginBottom: 10,
  },
}));
