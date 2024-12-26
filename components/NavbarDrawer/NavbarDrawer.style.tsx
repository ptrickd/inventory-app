//Material UI
import { css } from "@pigment-css/react";

//Color
import { TEXT_MENU_COLOR, BACKGROUND_MENU_COLOR } from "../../constants/colors";

export const rootStyle = css({
  height: "100vh",
  background: BACKGROUND_MENU_COLOR,
});

export const menuStyle = css({
  color: TEXT_MENU_COLOR,
  background: BACKGROUND_MENU_COLOR,
});

export const menuIconStyle = css({ color: TEXT_MENU_COLOR });

export const subMenuStyle = css({ color: TEXT_MENU_COLOR });

export const toolbarStyle = css({}); // Theme.mixins.toolbar,
