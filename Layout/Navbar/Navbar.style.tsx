//Pigment CSS
import { css } from "@pigment-css/react";

//Constant
import { DRAWER_WIDTH } from "../../constants/dimensions";

//Colors
import { indigo } from "@mui/material/colors";

const rootStyle = css(({ theme }) => ({
  // flexGrow: 1,
  height: "100%",
  backgroundColor: theme.colorSchemes.dark.background,
  "@media (min-width: 600px)": {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
  },
  "@media (prefers-color-scheme: light)": {
    backgroundColor: theme.colorSchemes.light.background,
  },
}));

const drawerStyle = css({
  width: DRAWER_WIDTH,
  flexShrink: 0,
});

const permanentDrawerStyle = css({
  display: "none",
  "@media (min-width: 600px)": {
    display: "block",
  },
});

const temporaryDrawerStyle = css({
  display: "block",
  "@media (min-width: 600px)": {
    display: "none",
  },
});

const drawerPaperStyle = css({
  width: DRAWER_WIDTH,
  background: indigo[800],
  boxSizing: "border-box",
});

const hideStyle = css({ display: "none" });

const appBarStyle = css({
  width: "100%",
  marginLeft: 0,
  backgroundColor: "green",
});

const appBarShiftStyle = css(({ theme }) => ({
  // padding: 0,
  "@media (min-width: 600px)": {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
  },
}));

const activeSubMenuStyle = css`
  marginleft: ${({ theme }) => theme.spacing.unit * 2};
  backgroundcolor: ${({}) => indigo[500]};
`;

const menuButtonStyle = css(({ theme }) => ({
  marginRight: theme.spacing.unit * 2,
}));

const linkButtonStyle = css`
"&:hover": { background: "inherit" },`;

const titleStyle = css({
  flexGrow: 1,
  justifyContent: "flex-start",
  "&:hover": { background: "inherit" },
});
// necessary for content to be below app bar
export const toolbarStyle = css(({ theme }) => ({ theme })); //theme.mixins.toolbar,

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
  permanentDrawerStyle,
  temporaryDrawerStyle,
};
