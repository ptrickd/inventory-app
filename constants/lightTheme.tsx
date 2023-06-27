//Material UI
import { createTheme } from "@mui/material/styles";

const LIGHT_THEME = createTheme({
  palette: {
    background: {
      default: "#fafafa",
      paper: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0,0,0,0.54)",
      disabled: "rgba(0,0,0,0.38)",
    },
    primary: {
      main: "#3f51b5",
      light: "rgb(101,115,195)",
      dark: "rgb(44,56,126)",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f50057",
      light: "rgb(247,51,120)",
      dark: "rgb(171,0,60)",
      contrastText: "#fff",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "d32f2f",
      contrastText: "#fff",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "f57c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    info: {
      main: "#f32192",
      light: "rgb(245,77,167)",
      dark: "rgb(170,23,102)",
      contrastText: "#fff",
    },
    success: {
      main: "#4caf50",
      light: "81c784",
      dark: "388e3c",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    icon: {
      main: "#rgba(0, 0, 0, 0.87)",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "#fff",
    },
    divider: "rgba(0, 0, 0, 0.12)",
  },
});

/*
  This part of the code allow the addition of the icon color 
  as one the option of @mui/material/IconButton. The color 
  apply now to dark and ligth theme.
*/
declare module "@mui/material/styles" {
  interface Palette {
    icon: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    icon?: PaletteOptions["primary"];
  }
}

// @babel-ignore-comment-in-output Update the Button's color prop options
declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    icon: true;
  }
}

export default LIGHT_THEME;
