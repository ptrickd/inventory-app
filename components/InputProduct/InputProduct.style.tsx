//Material UI
import { css } from "@pigment-css/react";

export const rootStyle = css({ width: "100%" });

export const formControlStyle = css({
  marginTop: "8px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

export const innerFormControlStyle = css(({ theme }) => ({
  margin: theme.spacing.unit,
  alignItems: "center",
}));

export const selectUnitStyle = css({
  marginLeft: 5,
  marginRight: 5,
  minWidth: 50,
});

export const boxStyle = css(({ theme }) => ({
  margin: theme.spacing.unit * 1,
  alignItems: "left",
}));

export const lastAmountNameStyle = css({ width: "100%" });

export const lastAmountValueStyle = css({ height: "auto" });
