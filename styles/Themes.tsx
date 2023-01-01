//React
import React from "react";

//Material UI
import { ThemeProvider, createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
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
    divider: "rgba(0, 0, 0, 0.12)",
  },
});

const darkTheme = createTheme({
  palette: {
    background: {
      default: "#303030",
      paper: "#424242",
    },
    text: {
      primary: "#fff",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
    primary: {
      main: "#3f51b5",
      light: "rgb(101,115,195)",
      dark: "rgb(44,56,126)",
      contrastText: "#fff",
    },
    secondary: {
      main: "#f50057",
      light: "rgb(245,51,120)",
      dark: "rgb(171,0,60)",
      contrastText: "#fff",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74b",
      dark: "#f57c00",
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
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    divider: "rgba(255,255,255,0.12)",
  },
});

const Themes: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>;
};
export default Themes;
