import { createSystem, defaultConfig, defineTextStyles } from "@chakra-ui/react"
import { buttonRecipe } from "./theme/button.recipe"

export const system = createSystem(defaultConfig, {
  globalCss: {
    html: {
      fontSize: "16px",
    },
    body: {
      fontSize: "0.875rem",
      margin: 0,
      padding: 0,
    },
  },
  theme: {
    tokens: {
      colors: {
        ui: {
          main: { value: "#009688" },
        },
      },
    },
    recipes: {
      button: buttonRecipe,
    },
  },
})

export const main = createSystem(defaultConfig, {
  globalCss: {
    html: {
      fontSize: "16px",
    },
    body: {
      fontFamily: "'Lexend', sans-serif",
      fontSize: "0.875rem",
      margin: 0,
      padding: 0,
    },
    ".underline-link": {
      color: "ui.white",
      textDecoration: "underline",
      fontWeight: "300",
      textTransform: "uppercase",
      transition: ".1s",
      "&:hover": {
        color: "ui.grey",
        textDecoration: "none",
      },
    },
    ".main-link": {
      color: "ui.main",
      fontWeight: "300",
      position: "relative",
      transition: ".1s",
      textDecoration: "none",
      "&::after": {
        content: '""',
        position: "absolute",
        left: "0",
        bottom: "0",
        width: "0", 
        height: "1px",
        backgroundColor: "ui.main",
        transition: "width 0.2s ease-in-out",
      },
      "&:hover": {
        "&::after": {
          width: "100%",
        },
      },
    },
  },
  theme: {
    tokens: {
      colors: {
        ui: {
          main: { value: "#1E1E1E" },
          white: {value: "#FFFFFF" },
          grey: {value: "#BABABA" },
          border: {value: "#3A3A3A"},
          error: {value: "#A50000"},
          succes: {value: "#017D18"}
        },
      },
    },
    recipes: {
      // button: buttonRecipe,
    },
  },
})