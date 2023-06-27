//Material UI
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const PREFIX = "categories-section";

export const classes = {
  section: `${PREFIX}-section`,
  styledPaper: `${PREFIX}-styled-paper`,
  horizontalBox: `${PREFIX}-horizontal-box`,
  styledCollapse: `${PREFIX}-styled-collapse`,
  styledButton: `${PREFIX}-styled-button`,
  styledTypography: `${PREFIX}-styled-typography`,
};

export const Section = styled(Box)(() => ({
  [`&.${classes.section}`]: {
    display: "flex",
    flexDirection: "column",
    marginTop: 10,
    marginLeft: 25,
  },
}));

export const StyledPaper = styled(Paper)(() => ({
  [`&.${classes.styledPaper}`]: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
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
