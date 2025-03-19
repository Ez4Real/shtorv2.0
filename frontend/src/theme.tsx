import { createSystem, defaultConfig } from "@chakra-ui/react"
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
    ".main-link": {
      color: "ui.main",
      fontWeight: "bold",
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
      fontSize: "28px",
      fontWeight: "300",
      textTransform: "uppercase",
      lineHeight: "35px",
    },
  },
  theme: {
    tokens: {
      colors: {
        ui: {
          main: { value: "#000000" },
          white: {value: "#FFFFFF" },
        },
      },
    },
    recipes: {
      // button: buttonRecipe,
    },
  },
})