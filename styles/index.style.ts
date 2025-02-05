//Material UI
import { css } from "@pigment-css/react";

export const rootStyle = css(({ theme }) => ({
  // display: "flex",
  minHeight: "calc(100vh - 120px)",

  // flexDirection: "column",
  // justifyContent: "space-between",
  // width: "100%",
}));

export const mainStyle = css({
  display: "flex",
  flexDirection: "column",
  // marginTop: "10%",
  // marginBottom: "10%",
  margin: 0,
  width: "100%",
  minHeight: "70vh",
  alignContent: "center",
  alignItems: "center",
});
export const titleStyle = css({ marginBottom: 20 });

export const subtitleStyle = css({ marginBottom: 30, marginTop: 10 });

export const cardsSection = css({ width: "80%", marginTop: 30 });

export const buttonStyle = css({
  width: "50%",
  marginBottom: "15%",
  borderRadius: 15,
});
