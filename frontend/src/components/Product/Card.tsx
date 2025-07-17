import { OpenAPI, ProductPublic } from "@/client"
import { useCurrency } from "@/contexts/CurrencyContext"
import { getItemPrice } from "@/utils"
import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { Link as RouterLink } from "@tanstack/react-router"
import { TranslatableTitle } from "../Common/SwitchLocalization"

interface ProductCardProps {
  product: ProductPublic
  displayProductPrice?: boolean
  titleFontSize?: string
  titleLineHeight?: string
}

const ProductCard = ({
    product,
    displayProductPrice = true,
    titleFontSize = "24px",
    titleLineHeight = "30px"
}: ProductCardProps) => {
  const { i18n } = useTranslation()
  const { currency } = useCurrency()

  const titleKey = `title_${i18n.language}` as TranslatableTitle;

  return (
    <Flex
      direction="column"
      alignItems="flex-start"
      fontWeight="300"
    >
      <RouterLink
        from="/"
        to="/products/$id"
        params={{ id: product.id }}
        hash="root"
      >
        <Box w="100%">
          <Image
            src={`${OpenAPI.BASE}/media/${product.images[0].url}`}
            alt={product.images[0].alt_text || "unset"}
            w="100%"
            h="100%"
          />
        </Box>
        <Text
          mt={["9px", "9px", "16px", "16px"]}
          fontSize={["10px", "10px", titleFontSize, titleFontSize]}
          lineHeight={["13px", "13px", titleLineHeight, titleLineHeight]}
        >
          {product[titleKey]}
        </Text>
      </RouterLink>
      {displayProductPrice && (
        <Text
          mt={["3px", "3px", "8px", "8px"]}
          fontSize={["8px", "8px", "18px", "18px"]}
          lineHeight={["10px", "10px", "22px", "22px"]}
        >
          {currency.symbol}{getItemPrice(product, currency)}
        </Text>
      )}
    </Flex>
  )
}

export default ProductCard