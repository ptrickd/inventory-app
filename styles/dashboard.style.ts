//Material UI
import { css } from "@pigment-css/react";

export const rootStyle = css(({ theme }) => ({
  minHeight: "calc(100vh - 100px)",
  width: "100%",
  backgroundColor: theme.colorSchemes.dark.palette.background.default,
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
  backgroundColor: "green",
}));

export const dividerStyle = css({ marginBottom: 10 });
