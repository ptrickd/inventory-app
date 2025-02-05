//Material UI
import { css, styled } from "@pigment-css/react";

import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.

export const formStyle = css({
  display: "flex",
  flexDirection: "column",
  // [`& ${TextField}`]: {
  //   variants: [{ props: { color: "primary" }, style: { color: "red" } }],
  // },
});

export const inputStyle = css(({ theme }) => ({
  marginBottom: 15,
  backgroundColor: theme.colorSchemes.dark.palette.background.paper,
  color: theme.colorSchemes.dark.palette.text.primary,
  "@media (prefers-color-scheme: light)": {
    backgroundColor: theme.colorSchemes.light.palette.background.paper,
  },
}));

export const TextFieldStyled = styled(TextField)(({ theme }) => ({
  marginBottom: 15,
  // backgroundColor: theme.colorSchemes.dark.palette.background.paper,
  // color: theme.colorSchemes.dark.palette.text.primary,
  // variants: [
  //   {
  //     props: { color: "primary" },
  //     style: { input: { style: { color: "red", backgroundColor: "white" } } },
  //   },
  // ],

  // backgroundColor: "",
  // color: { outlineInput: "yellow" },

  "@media (prefers-color-scheme: light)": {
    marginBottom: 15,

    // backgroundColor: theme.colorSchemes.light.palette.background.paper,
    // color: theme.colorSchemes.light.palette.text.primary,
    // variants: [
    //   {
    //     props: { htmlInput: { color: "primary" } },
    //     style: { color: "green" },
    //   },
    //   {
    //     props: { input: { color: "primary" } },
    //     style: { color: "green" },
    //   },
    //   {
    //     props: { inputLabel: { color: "primary" } },
    //     style: { color: "green" },
    //   },
    // ],
  },
}));

export const buttonStyle = css({ marginTop: 15, marginBottom: 15 });
