import { Box, Flex, Image, Text } from "@chakra-ui/react"

interface ProductCardProps {
  title: string
//   imagePath: string
  price: string
}

const ProductCard = ({
    title,
    // imagePath,
    price
}: ProductCardProps) => {

  return (
    <Flex
      direction="column"
      w="fit-content"
      alignItems="flex-start"
      fontWeight="300"
    >
      <Box>
        <Image
          src="/assets/images/test-product2.png"
          w="100%"
          h="100%"
        />
      </Box>
      <Text
        mt="16px"
        fontSize="24px"
        lineHeight="30px"
      >
        {title}
      </Text>
      <Text
        mt="8px"
        fontSize="18px"
        lineHeight="22px"
      >
        {price}
      </Text>
    </Flex>
  )
}

export default ProductCard