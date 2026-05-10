import { Box } from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"

interface CustomAsterixProps {
    fieldId: string
    fontSize?: string
    zIndex?: number
    indentTop?: number
    indentRight?: number
}

export const CustomAsterix = ({
    fieldId,
    fontSize = "20px",
    zIndex = -1,
    indentTop = -1,
    indentRight = 1
}: CustomAsterixProps) => {

  const {
    watch
  } = useFormContext()
  
  return (
    !watch(fieldId) && (
      <Box
        as="span"
        color="red.500"
        pos="absolute"
        top={indentTop}
        right={indentRight}
        fontSize={fontSize}
        zIndex={zIndex}
        userSelect="none"
        pointerEvents="none"
      >*</Box>
    )
  )
}




