//Material UI
import { styled } from "@mui/material-pigment-css";
import { DRAWER_WIDTH } from "../../constants/dimensions";

const PREFIX = "ComponentWrapper";

export const classes = {
  main: `${PREFIX}-main`,
  toolbar: `${PREFIX}-toolbar`,
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
export const Root = styled("div")(() => ({
  [`& .${classes.main}`]: {
    // marginLeft: 0,
    // [theme.breakpoints.up("sm")]: {
    //   width: `calc(100% - ${DRAWER_WIDTH}px)`,
    //   marginLeft: DRAWER_WIDTH,
    // },
    // transition: theme.transitions.create(["margin", "width"], {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
  },

  [`& .${classes.toolbar}`]: {}, // theme.mixins.toolbar,
}));
