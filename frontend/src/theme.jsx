import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Color design tokens
export const tokensDark = {
  grey: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#d7d8da",
    200: "#b0b2b5",
    300: "#888b90",
    400: "#61656b",
    500: "#393e46",
    600: "#2e3238",
    700: "#22252a",
    800: "#17191c",
    900: "#0b0c0e",
    1000: "#000000",
  },
  primary: {
    100: "#d3d4d6",
    200: "#a7a9ad",
    300: "#7a7e83",
    400: "#4e535a",
    500: "#222831",
    600: "#1b2027",
    700: "#14181d",
    800: "#0e1014",
    900: "#07080a",
  },
  secondary: {
    50: "#f0f0f0",
    100: "#fcfcfc",
    200: "#f8f8f8",
    300: "#f5f5f5",
    400: "#f1f1f1",
    500: "#eeeeee",
    600: "#bebebe",
    700: "#8f8f8f",
    800: "#5f5f5f",
    900: "#303030",
  },
};

// Function to reverse color tokens
function reverseTokens(tokens) {
  const reversedTokens = {};
  Object.entries(tokens).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}

export const tokensLight = reverseTokens(tokensDark);

// MUI theme settings
export const themeSettings = (mode) => ({
  palette: {
    mode: mode,
    ...(mode === "dark"
      ? {
          primary: {
            ...tokensDark.primary,
            main: tokensDark.primary[400],
            light: tokensDark.primary[400],
          },
          secondary: {
            ...tokensDark.secondary,
            main: tokensDark.secondary[300],
          },
          neutral: {
            ...tokensDark.grey,
            main: tokensDark.grey[500],
          },
          background: {
            default: tokensDark.primary[600],
            alt: tokensDark.primary[500],
          },
        }
      : {
          primary: {
            ...tokensLight.primary,
            main: tokensDark.grey[50],
            light: tokensDark.grey[100],
          },
          secondary: {
            ...tokensLight.secondary,
            main: tokensDark.secondary[600],
            light: tokensDark.secondary[700],
          },
          neutral: {
            ...tokensLight.grey,
            main: tokensDark.grey[500],
          },
          background: {
            default: tokensDark.grey[0],
            alt: tokensDark.grey[50],
          },
        }),
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 40,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 24,
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 16,
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
    },
  },
});

// Example Theme Provider Component
const AppThemeProvider = ({ children }) => {
  const mode = "light"; // Change to "dark" for dark mode
  const theme = createTheme(themeSettings(mode));

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
