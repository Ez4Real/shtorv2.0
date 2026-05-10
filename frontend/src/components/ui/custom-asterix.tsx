import { Box } from "@chakra-ui/react"
import { useFormContext } from "react-hook-form"

interface CustomAsterixProps {
    fieldId: string
    fontSize?: string
    zIndex?: number
}

export const CustomAsterix = ({
    fieldId,
    fontSize = "20px",
    zIndex = -1
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
        right={1}
        top={-1}
        fontSize={fontSize}
        zIndex={zIndex}
        userSelect="none"
        pointerEvents="none"
      >*</Box>
    )
  )
}




