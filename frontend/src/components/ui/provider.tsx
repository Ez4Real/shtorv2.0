"use client"

import { ChakraProvider, SystemContext } from "@chakra-ui/react"
import { type PropsWithChildren } from "react"
import { ColorModeProvider } from "./color-mode"
import { Toaster } from "./toaster"

interface CustomProviderProps extends PropsWithChildren {
  theme: SystemContext,
  forcedTheme?: string | undefined
}


export function CustomProvider({
  theme,
  forcedTheme = undefined,
  children
}: CustomProviderProps) {
  return (
    <ChakraProvider value={theme}>
      <ColorModeProvider forcedTheme={forcedTheme}>
        {children}
      </ColorModeProvider>
      <Toaster />
    </ChakraProvider>
  )
}
