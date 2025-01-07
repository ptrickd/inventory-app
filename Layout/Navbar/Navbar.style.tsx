//React
import { css } from "@pigment-css/react";

//Constant
import { DRAWER_WIDTH } from "../../constants/dimensions";

//Colors
import { indigo } from "@mui/material/colors";

// const rootStyle = css({ flexGrow: 1, height: "100%" });
const rootStyle = css({ width: "100px" });
const drawerStyle = css({ width: DRAWER_WIDTH, flexShrink: 0 });
const drawerPaperStyle = css({
  width: DRAWER_WIDTH,
  background: indigo[800],
});
const hideStyle = css({ display: "none" });
const appBarStyle = css`
  transition: ${({ theme }) =>
    theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })};
`;
const appBarShiftStyle = css(({ theme }) => ({
  "@container (min-width:600px)": {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
  },
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
}));

const activeSubMenuStyle = css`
  marginleft: ${({ theme }) => theme.spacing(2)};
  backgroundcolor: ${({}) => indigo[500]};
`; // backgroundColor: "#f4f4f4",

const menuButtonStyle = css(({ theme }) => ({
  marginRight: theme.spacing(2),
  "@container (min-width:600px)": { display: "none" },
}));

const linkButtonStyle = css`
"&:hover": { background: "inherit" },`;

const titleStyle = css({
  flexGrow: 1,
  justifyContent: "flex-start",
  "&:hover": { background: "inherit" },
});
// necessary for content to be below app bar
const toolbarStyle = css({}); //theme.mixins.toolbar,

export {
  rootStyle,
  drawerStyle,
  drawerPaperStyle,
  hideStyle,
  appBarStyle,
  appBarShiftStyle,
  activeSubMenuStyle,
  menuButtonStyle,
  linkButtonStyle,
  titleStyle,
  toolbarStyle,
};
