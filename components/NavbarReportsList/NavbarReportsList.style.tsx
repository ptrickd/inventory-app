//React
import { styled } from "@mui/material-pigment-css";

//Material UI
import MenuItem from "@mui/material/MenuItem";

//Constant
import { BACKGROUND_MENU_COLOR } from "../../constants/colors";

const PREFIX = "NavbarReportsList";

export const classes = {
  menuText: `${PREFIX}-menu-text`,
  list: `${PREFIX}-list`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
export const Root = styled("div")(() => ({
  [`&.${classes.menuText}`]: {
    // color: TEXT_MENU_COLOR,
    textTransform: "none",
    // marginLeft: Theme.spacing(1),
    margin: 0,
  },
}));

export const StyledMenuItem = styled(MenuItem)(() => ({
  [`&.${classes.list}`]: {
    background: "inherit",
    margin: 0,
  },
}));
