"use client";
//Material UI
import { css } from "@pigment-css/react";
import { DRAWER_WIDTH } from "../../constants/dimensions";
//Pigment css
import { keyframes } from "@pigment-css/react";
// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const drawerRemove = keyframes`
from {
  width: 100%;
  margin: 220px;
}
to {
  width: 0%;
  margin: 0px;
  }
`;

export const mainStyle = css(({ theme }) => ({
  marginLeft: 0,
  width: "100%",
  "@media (min-width: 600px)": {
    width: `calc(100% + ${DRAWER_WIDTH}px)`,
    transition: `${drawerRemove} 2s `,
  },
}));

/********To do later add transistion with keyframe****************/
//https://github.com/mui/pigment-css?tab=readme-ov-file#creating-animation-keyframes
// transition: theme.transitions.create(["margin", "width"], {
//   easing: theme.transitions.easing.easeOut,
//   duration: theme.transitions.duration.enteringScreen,
// }),

//export const toolbarStyle = css({}); // theme.mixins.toolbar,
