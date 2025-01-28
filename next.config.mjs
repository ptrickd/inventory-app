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

/**
 * @type {import('@pigment-css/nextjs-plugin').PigmentOptions}
 */
const pigmentConfig = {
  // transformLibraries: ["@mui/material"],
  theme: extendTheme({
    colorSchemes: {
      light: {
        palette: {
          background: "#FFFFFF", //"0 0% 100%", //
          foreground: "#09090A", //"240 10% 3.9%",
          primary: "#18181A", //"240 5.9% 10%",
          border: "#D8D8E6", //"240 5.9% 90%", //
        },
      },
      dark: {
        palette: {
          background: "#0B0B09", //"240 10% 3.9%", //
          foreground: "#CCCCCC", //"0 0% 80%", //
          primary: "#FAFAFA", //"0 0% 98%", //
          border: "#272729", //"240 3.7% 15.9%", //
        },
      },
    },
    spacing: { unit: 8 },
    typography: {
      fontFamily: "Inter, sans-serif",
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
  }),
};

export default withPigment(nextConfig, pigmentConfig);
