//Material UI
import { css } from "@pigment-css/react";

export const rootStyle = css(({ theme }) => ({
  minHeight: "calc(100vh - 100px)",
  width: "100%",
}));

export const mainStyle = css({
  marginTop: 0,
  marginBottom: 0,
  padding: 20,
  width: "100%",
  minHeight: "70vh",
});

export const paperStyle = css(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: 10,
  borderRadius: "10px",
  backgroundColor: theme.colorSchemes.dark.palette.background.paper,
  color: theme.colorSchemes.dark.palette.text.primary,
  "@media (prefers-color-scheme: light)": {
    backgroundColor: theme.colorSchemes.light.palette.background.paper,
    color: theme.colorSchemes.light.palette.text.primary,
  },
}));

export const iconStyle = css(({ theme }) => ({
  color: theme.colorSchemes.dark.palette.icon.main,
  "@media (prefers-color-scheme: light)": {
    color: theme.colorSchemes.light.palette.icon.main,
  },
}));

export const dividerStyle = css({ marginBottom: 10 });
