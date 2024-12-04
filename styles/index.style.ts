//Material UI
import { css } from "@mui/material-pigment-css";

export const rootStyle = css({
  display: "flex",
  minHeight: "calc(100vh - 120px)",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
});

export const mainStyle = css({
  display: "flex",
  flexDirection: "column",
  marginTop: "15%",
  marginBottom: "10%",
  width: "100%",
  minHeight: "70vh",
  alignContent: "space-between",
});

export const titleStyle = css({ marginBottom: 20 });
export const subtitleStyle = css({ marginBottom: 20 });

export const buttonStyle = css({
  width: "70%",
  marginBottom: "15%",
  borderRadius: 15,
});
