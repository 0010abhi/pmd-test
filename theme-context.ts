import React from "react";

export const themes = {
  light: {
    name: "light",
    cardColor: "#fff",
  },
  dark: {
    name: "dark",
    cardColor: "#000",
  },
};

export const ThemeContext = React.createContext(
  themes.dark // default value
);
