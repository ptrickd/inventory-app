//React
import { css } from "@pigment-css/react";

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
export const menuTextStyle = css(({ theme }) => ({
  textTransform: "none",
  marginLeft: theme.spacing.unit,
  margin: 0,
}));

export const listStyle = css({ background: "inherit", margin: 0 });
