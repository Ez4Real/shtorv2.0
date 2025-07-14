import { useCart } from "@/contexts/CartContext"
import { Box, Flex } from "@chakra-ui/react"

interface ProductCounterProps {
  count: number
  cartItemId: string
}

const ProductCounter = ({
  count,
  cartItemId
}: ProductCounterProps) => {
    const { updateQuantity } = useCart()

  const updateCount = (newCount: number) => {
    if (newCount === 0) {
      return
    } 
    updateQuantity(cartItemId, newCount)
  }

  return (
    <Flex
      w="75px"
      justifyContent="space-between"
      userSelect="none"
      css={{
        '& div': {
          w: "2rem",
          textAlign: "center"
        },
      }}
    >
     <Box
       cursor="pointer"
       onClick={() => updateCount(count-1)}
     >-
      </Box>
      <Box>
        {count}
      </Box>
      <Box
        cursor="pointer"
        onClick={() => updateCount(count+1)}
      >
        +
      </Box>
    </Flex>
  )
}

export default ProductCounter