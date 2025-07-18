import { createSystem, defaultConfig } from "@chakra-ui/react"
import { buttonRecipe } from "./theme/button.resipe"
import { inputRecipe } from "./theme/input.resipe"
import { adminButtonRecipe } from "./theme/admin-button.resipe"


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
          white: {value: "#FFFFFF"},
          danger: { value: "#ef4444" },
          dim: { value: "#A0AEC0" },
        },
        paymentStatus: {
          created: { value: "yellow" },
          processing: { value: "#183f90" },
          hold: { value: "#FF9800" },
          failure: { value: "#E53E3E" },
          reversed: { value: "#e1e1e1" },
          expired: { value: "#E53E3E" },
          success: { value: "#48BB78" },
        },
      },
    },
    recipes: {
      button: adminButtonRecipe,
    },
  },
})

export const main = createSystem(defaultConfig, {
  globalCss: {
    html: {
      fontSize: "16px",
      fontWeight: "300",
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
    ".menu-underline-link": {
      color: "ui.main",
      textDecoration: "underline",
      fontWeight: "300",
      transition: ".1s",
      fontSize: "16px",
      lineHeight: "20px",
      "&:hover": {
        color: "ui.grey",
        textDecoration: "none",
      },
    },
    ".main-footer-link": {
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
    keyframes: {
      translateTopToBottom: {
        "0%": { transform: "translateY(0)" },
        "100%": { transform: "translateY(9.5px)" },
      },
      translateTopToBasic: {
        "0%": { transform: "translateY(9.5px)" },
        "100%": { transform: "translateY(0)" },
      },
      translateBottomToTop: {
        "0%": { transform: "translateY(0)" },
        "100%": { transform: "translateY(-9.5px)" },
      },
      translateBottomToBasic: {
        "0%": { transform: "translateY(-9.5px)" },
        "100%": { transform: "translateY(0)" },
      },
    },
    tokens: {
      animations: {
        translateTopToBottom: {
          value: "translateTopToBottom 0.3s forwards",
        },
        translateTopToBasic: {
          value: "translateTopToBasic 0.3s forwards",
        },
        translateBottomToTop: {
          value: "translateBottomToTop 0.3s forwards",
        },
        translateBottomToBasic: {
          value: "translateBottomToBasic 0.3s forwards",
        },
        spin: {
          value: "spin 1s ease-in-out"
        }
      },
      colors: {
        ui: {
          main: { value: "#1E1E1E"},
          white: {value: "#FFFFFF"},
          grey: {value: "#BABABA"},
          border: {value: "#3A3A3A"},
          error: {value: "#A50000"},
          success: {value: "#017D18"},
          lightBlue: {value: "#F6F6F6"},
          greyBorder: {value: "#A4A2A2"}
        },
      },
    },
    recipes: {
      button: buttonRecipe,
      input: inputRecipe,
    },
  },
})

