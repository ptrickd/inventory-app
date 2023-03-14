//Material UI
import { styled } from "@mui/material/styles";

//Color
import { TEXT_MENU_COLOR, BACKGROUND_MENU_COLOR } from "../../constants/colors";

const PREFIX = "NavbarDrawer";

export const classes = {
  root: `${PREFIX}-root`,
  menu: `${PREFIX}-menu`,
  menuIcon: `${PREFIX}-menuIcon`,
  subMenu: `${PREFIX}-subMenu`,
  toolbar: `${PREFIX}-toolbar`,
};

export const Root = styled("div")(({ theme: Theme }) => ({
  [`&.${classes.root}`]: {
    height: "100vh",
    background: BACKGROUND_MENU_COLOR,
  },
  [`& .${classes.menu}`]: {
    color: TEXT_MENU_COLOR,
    background: BACKGROUND_MENU_COLOR,
  },

  [`& .${classes.menuIcon}`]: {
    color: TEXT_MENU_COLOR,
  },

  [`& .${classes.subMenu}`]: {
    marginLeft: Theme.spacing(2),
    color: TEXT_MENU_COLOR,
  },

  // necessary for content to be below app bar
  [`& .${classes.toolbar}`]: Theme.mixins.toolbar,
}));
