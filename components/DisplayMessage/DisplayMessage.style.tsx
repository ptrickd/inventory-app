//Material UI
import { css } from "@pigment-css/react";

export const rootStyle = css(({ theme }) => ({
  margin: theme.spacing.unit,
  padding: theme.spacing.unit,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "red",
  borderRadius: 5,
}));
