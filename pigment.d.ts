import type { ExtendTheme } from "@pigment-css/react/theme";

declare module "@pigment-css/react/theme" {
  interface ThemeTokens {
    // the structure of your theme
    colorSchemes: {
      light: {
        palette: {
          background: string;
          foreground: string;
          primary: string;
          border: string;
        };
      };
      dark: {
        palette: {
          background: string;
          foreground: string;
          primary: string;
          border: string;
        };
      };
    };
    spacing: { unit: number };
    typography: {
      fontFamily: string;
    };
    breakpoints: {
      values: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
    };
  }

  interface ThemeArgs {
    theme: ExtendTheme<{
      colorScheme: "light" | "dark";
      tokens: ThemeTokens;
    }>;
  }
}

type Theme = {
  colorSchemes: {
    light: {
      palette: {
        background: string;
        foreground: string;
        primary: string;
        border: string;
      };
    };
    dark: {
      palette: {
        background: string;
        foreground: string;
        primary: string;
        border: string;
      };
    };
  };
  spacing: { unit: number };
  typography: {
    fontFamily: string;
  };
  breakpoints: {
    values: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  };
};

declare global {
  namespace React {
    interface HTMLAttributes<T> {
      sx?:
        | React.CSSProperties
        | ((theme: Theme) => React.CSSProperties)
        | ReadonlyArray<
            React.CSSProperties | ((theme: Theme) => React.CSSProperties)
          >;
    }
  }
}
