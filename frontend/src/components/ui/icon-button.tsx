import type { IconButtonProps as ChakraIconButtonProps } from "@chakra-ui/react"
import {
  AbsoluteCenter,
  IconButton as ChakraIconButton,
  Span,
  Spinner,
} from "@chakra-ui/react"
import * as React from "react"

interface IconButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

export interface IconButtonProps extends ChakraIconButtonProps, IconButtonLoadingProps {}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(props, ref) {
    const { loading, disabled, loadingText, children, ...rest } = props
    return (
      <ChakraIconButton
        disabled={loading || disabled}
        ref={ref}
        {...rest}

        size="2xs"
        background="ui.white"
        color="black"
        border=".5px solid white"
        rounded="xl"
        transition=".3s"
          _hover={{
          borderColor: "black",
          color: "ui.white",
          "& svg": {
            color: "ui.main"
          }
        }}
      >
        {loading && !loadingText ? (
          <>
            <AbsoluteCenter display="inline-flex">
              <Spinner size="inherit" color="inherit" />
            </AbsoluteCenter>
            <Span opacity={0}>{children}</Span>
          </>
        ) : loading && loadingText ? (
          <>
            <Spinner size="inherit" color="inherit" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </ChakraIconButton>
    )
  },
)





