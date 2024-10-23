//React
import { styled } from "@mui/material-pigment-css";

//Constant
import { DRAWER_WIDTH } from "../../constants/dimensions";

//Colors
import { indigo } from "@mui/material/colors";

const PREFIX = "Navbar";

export const classes = {
  root: `${PREFIX}-root`,
  drawer: `${PREFIX}-drawer`,
  drawerPaper: `${PREFIX}-drawer-paper`,
  hide: `${PREFIX}-hide`,
  appBar: `${PREFIX}-appBar`,
  appBarShift: `${PREFIX}-app-bar-shift`,
  toolbar: `${PREFIX}-toolbar`,
  activeSubMenu: `${PREFIX}-active-sub-menu`,
  menuButton: `${PREFIX}-menu-mutton`,
  linkButton: `${PREFIX}-link-mutton`,
  title: `${PREFIX}-title`,
};

export const Root = styled("div")(() => ({
  [`&.${classes.root}`]: {
    flexGrow: 1,
    height: "100%",
  },

  [`& .${classes.drawer}`]: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },

  [`& .${classes.drawerPaper}`]: {
    width: DRAWER_WIDTH,
    background: indigo[800],
  },

  [`& .${classes.hide}`]: {
    display: "none",
  },

  [`& .${classes.appBar}`]: {
    // transition: theme.transitions.create(["margin", "width"], {
    // easing: theme.transitions.easing.sharp,
    // duration: theme.transitions.duration.leavingScreen,
    // }),
  },

  [`& .${classes.appBarShift}`]: {
    // [theme.breakpoints.up("sm")]: {
    // width: `calc(100% - ${DRAWER_WIDTH}px)`,
    // marginLeft: DRAWER_WIDTH,
    // },
    // transition: theme.transitions.create(["margin", "width"], {
    // easing: theme.transitions.easing.easeOut,
    // duration: theme.transitions.duration.enteringScreen,
    // }),
  },

  // necessary for content to be below app bar
  [`& .${classes.toolbar}`]: {}, //theme.mixins.toolbar,

  [`& .${classes.activeSubMenu}`]: {
    // marginLeft: theme.spacing(2),
    // backgroundColor: "#f4f4f4",
    backgroundColor: indigo[500],
  },

  [`& .${classes.menuButton}`]: {
    // marginRight: theme.spacing(2),
    // [theme.breakpoints.up("sm")]: {
    //   display: "none",
    // },
  },
  [`& .${classes.linkButton}`]: {
    "&:hover": { background: "inherit" },
  },

  [`& .${classes.title}`]: {
    flexGrow: 1,
    justifyContent: "flex-start",
    "&:hover": { background: "inherit" },
  },
}));
