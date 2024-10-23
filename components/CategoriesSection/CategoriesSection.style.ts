//Material UI
import { styled } from "@mui/material-pigment-css";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material-pigment-css/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";

const PREFIX = "CategoriesSection";

export const classes = {
  section: `${PREFIX}-section`,
  horizontalBox: `${PREFIX}-horizontal-box`,
  styledCollapse: `${PREFIX}-styled-collapse`,
  styledButton: `${PREFIX}-styled-button`,
  styledLink: `${PREFIX}-styled-link`,
};

export const Section = styled(Box)(() => ({
  [`&.${classes.section}`]: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 25,
  },
}));

export const HorizontalBox = styled(Box)(() => ({
  [`&.${classes.horizontalBox}`]: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
}));

export const StyledCollapse = styled(Collapse)(() => ({
  [`&.${classes.styledCollapse}`]: {
    alignSelf: "center",
    marginRight: "10%",
  },
}));

export const StyledButton = styled(Button)(() => ({
  [`&.${classes.styledButton}`]: {
    padding: 0,
    paddingLeft: 1,
  },
}));

export const StyledLink = styled(Link)(() => ({
  [`&.${classes.styledLink}`]: {},
}));
