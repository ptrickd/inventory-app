//Material UI
import { css, styled } from "@pigment-css/react";
import Dialog from "@mui/material/Dialog";

export const closeStyle = css({
  display: "flex",
  justifyContent: "flex-start",
});

export const DialogStyled = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    backgroundColor: theme.colorSchemes.dark.palette.background.default,
    color: theme.colorSchemes.dark.palette.text.primary,
    "@media (prefers-color-scheme: light)": {
      backgroundColor: theme.colorSchemes.light.palette.background.paper,
      color: theme.colorSchemes.light.palette.text.primary,
    },
  },
  "& .MuiDialogActions-root": {
    backgroundColor: theme.colorSchemes.dark.palette.background.default,
    color: theme.colorSchemes.dark.palette.text.primary,
    "@media (prefers-color-scheme: light)": {
      backgroundColor: theme.colorSchemes.light.palette.background.paper,
      color: theme.colorSchemes.light.palette.text.primary,
    },
  },
  "& .MuiDialogTitle-root": {
    backgroundColor: theme.colorSchemes.dark.palette.background.default,
    color: theme.colorSchemes.dark.palette.text.primary,
    "@media (prefers-color-scheme: light)": {
      backgroundColor: theme.colorSchemes.light.palette.background.paper,
      color: theme.colorSchemes.light.palette.text.primary,
    },
  },
}));
