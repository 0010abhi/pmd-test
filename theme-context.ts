import React from "react";

export const themes = {
  light: {
    cardColor: "#fff",
  },
  dark: {
    cardColor: "#000",
  },
};

export const ThemeContext = React.createContext(
  themes.dark // default value
);
