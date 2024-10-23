import { withPigment } from "@pigment-css/nextjs-plugin";
import { createTheme } from "@mui/material";

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
  transformLibraries: ["@mui/material"],
  theme: createTheme({
    cssVariables: true,
  }),
};

export default withPigment(nextConfig, pigmentConfig);
