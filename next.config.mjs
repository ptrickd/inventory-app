import { TextField } from "@mui/material";
import { withPigment, extendTheme } from "@pigment-css/nextjs-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  //Modification for jpg image
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.module.rules.push = {
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 8192, // in bytes
          },
        },
      ],
    };
    return config;
  },
};
const theme = extendTheme({
  colorSchemes: {
    light: {
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
          main: "rgba(0, 0, 0, 0.87)",
          light: "#81c784",
          dark: "#388e3c",
          contrastText: "#fff",
        },
        divider: "rgba(0, 0, 0, 0.12)",
      },
    },
    dark: {
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
        icon: {
          main: "#fff",
          light: "#81c784",
          dark: "#388e3c",
          contrastText: "#fff",
        },
        divider: "rgba(255,255,255,0.12)",
      },
    },
  },
  spacing: { unit: 8 },
  typography: {
    fontFamily: "Roboto, Inter, sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  getSelector: (colorScheme) =>
    colorScheme ? `.theme-${colorScheme}` : ":root",
});
/**
 * @type {import('@pigment-css/nextjs-plugin').PigmentOptions}
 */
const pigmentConfig = {
  // transformLibraries: ["@mui/material"],
  theme: theme,
  // components: {
  //   MuiTextField: {
  //     styleOverrides: {
  //       root: ({ theme }) => ({
  //         variants: [
  //           ...Object.entries(theme.colorSchemes.dark.palette)
  //             .filter(([, palette]) => palette && palette.main)
  //             .map(([palette, { main }]) => ({
  //               props: { palette },
  //               style: {
  //                 color: main,
  //               },
  //             })),
  //         ],
  //       }),
  //     },
  //   },
  // },
};

export { theme };
export default withPigment(nextConfig, pigmentConfig);
