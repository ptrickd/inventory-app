//React
import React, { useContext } from "react";

//Material UI
import { ThemeProvider } from "@mui/material/styles";
//Context
import { UserContext } from "../contexts/UserContext";

//Themes
import DARK_THEME from "../constants/darkTheme";
import LIGHT_THEME from "../constants/lightTheme";

const Themes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useContext(UserContext);

  //Function taking theme choive from a string and returning a Theme
  const themeSelector = (theme: any) => {
    if (theme === "dark") return DARK_THEME;
    else return LIGHT_THEME;
  };
  return <ThemeProvider theme={themeSelector(theme)}>{children}</ThemeProvider>;
};
export default Themes;
