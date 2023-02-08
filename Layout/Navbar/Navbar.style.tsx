//React
import { styled } from "@mui/material/styles";

//Constant
import { DRAWER_WIDTH } from "../../constants/dimensions";

//Colors
import { indigo } from "@mui/material/colors";

const PREFIX = "Navbar";

export const classes = {
  root: `${PREFIX}-root`,
  drawer: `${PREFIX}-drawer`,
  drawerPaper: `${PREFIX}-drawerPaper`,
  hide: `${PREFIX}-hide`,
  appBar: `${PREFIX}-appBar`,
  appBarShift: `${PREFIX}-appBarShift`,
  toolbar: `${PREFIX}-toolbar`,
  activeSubMenu: `${PREFIX}-activeSubMenu`,
  menuButton: `${PREFIX}-menuButton`,
  title: `${PREFIX}-title`,
};

export const Root = styled("div")(({ theme }) => ({
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
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  [`& .${classes.appBarShift}`]: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  // necessary for content to be below app bar
  [`& .${classes.toolbar}`]: theme.mixins.toolbar,

  [`& .${classes.activeSubMenu}`]: {
    marginLeft: theme.spacing(2),
    // backgroundColor: "#f4f4f4",
    backgroundColor: indigo[500],
  },

  [`& .${classes.menuButton}`]: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },

  [`& .${classes.title}`]: {
    flexGrow: 1,
    // selfAlign: "flex-start",
    // marginLeft: 0,
    // paddingLeft: 0,
    cursor: "pointer",
  },
}));
