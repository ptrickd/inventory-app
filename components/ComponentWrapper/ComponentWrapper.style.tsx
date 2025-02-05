"use client";
//Material UI
import { css } from "@pigment-css/react";
import { DRAWER_WIDTH } from "../../constants/dimensions";

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.

export const mainStyle = css(({ theme }) => ({
  marginLeft: 0,
  width: "100%",
  "@media (min-width: 600px)": {
    width: `calc(100% + ${DRAWER_WIDTH}px)`,
  },
}));

export const rootStyle = css(({ theme }) => ({
  backgroundColor: theme.colorSchemes.dark.palette.background.default,
  color: theme.colorSchemes.dark.palette.text.primary,
  "@media (prefers-color-scheme: light)": {
    backgroundColor: theme.colorSchemes.light.palette.background.default,
    color: theme.colorSchemes.light.palette.text.primary,
  },
}));

/********To do later add transistion with keyframe****************/
//https://github.com/mui/pigment-css?tab=readme-ov-file#creating-animation-keyframes
// transition: theme.transitions.create(["margin", "width"], {
//   easing: theme.transitions.easing.easeOut,
//   duration: theme.transitions.duration.enteringScreen,
// }),
