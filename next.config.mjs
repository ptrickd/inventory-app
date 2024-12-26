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
          background: "0 0% 100%",
          foreground: "240 10% 3.9%",
          primary: "240 5.9% 10%",
          border: "240 5.9% 90%",
        },
      },
      dark: {
        palette: {
          background: "240 10% 3.9%",
          foreground: "0 0% 80%",
          primary: "0 0% 98%",
          border: "240 3.7% 15.9%",
        },
      },
    },
  }),
};

export default withPigment(nextConfig, pigmentConfig);
