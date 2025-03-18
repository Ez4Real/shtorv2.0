"use client"

import { ChakraProvider, SystemContext } from "@chakra-ui/react"
import { type PropsWithChildren } from "react"
import { ColorModeProvider } from "./color-mode"
import { Toaster } from "./toaster"

interface CustomProviderProps extends PropsWithChildren {
  theme: SystemContext;
}

export function CustomProvider({ theme, children }: CustomProviderProps) {
  return (
    <ChakraProvider value={theme}>
      <ColorModeProvider defaultTheme="light">
        {children}
      </ColorModeProvider>
      <Toaster />
    </ChakraProvider>
  )
}
