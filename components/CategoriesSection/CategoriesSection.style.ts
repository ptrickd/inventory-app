//Material UI
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const PREFIX = "CategoriesSection";

export const classes = {
  section: `${PREFIX}-section`,
};

export const Section = styled(Box)(() => ({
  [`&.${classes.section}`]: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
}));
