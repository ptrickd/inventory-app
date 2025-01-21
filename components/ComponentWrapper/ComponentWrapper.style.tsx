"use client";
//Material UI
import { css } from "@pigment-css/react";
import { DRAWER_WIDTH } from "../../constants/dimensions";

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.

export const mainStyle = css`
  @media (breakpoints: hd) {
    width: calc(100% - ${DRAWER_WIDTH}px);
  }
`;
// marginLeft: 0,
// [theme.breakpoints.up("sm")]: {
//   width: `calc(100% - ${DRAWER_WIDTH}px)`,
//   marginLeft: DRAWER_WIDTH,
// },
// transition: theme.transitions.create(["margin", "width"], {
//   easing: theme.transitions.easing.easeOut,
//   duration: theme.transitions.duration.enteringScreen,
// }),
export const toolbarStyle = css({}); // theme.mixins.toolbar,
