import { GiftPublic, OpenAPI } from "@/client"
import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "@tanstack/react-router"
import { TranslatableTitle } from "../Common/SwitchLocalization"
import { useTranslation } from "react-i18next"
import { useCurrency } from "@/contexts/CurrencyContext"
import { getItemPrice } from "@/utils"
// import { useTranslation } from "react-i18next"

interface GiftCardProps {
  gift: GiftPublic
  showPrice?: boolean
  titleFontSize?: string
  titleLineHeight?: string
}

const GiftCard = ({
    gift,
    showPrice = true,
    titleFontSize = "24px",
    titleLineHeight = "30px"
}: GiftCardProps) => {
  const { i18n } = useTranslation()
  const { currency } = useCurrency()

  const titleKey = `title_${i18n.language}` as TranslatableTitle
  
  return (
    <Flex
      direction="column"
      alignItems="flex-start"
      fontWeight="300"
    >
      <RouterLink
        to="/gifts/$id"
        params={{ id: gift.id }}
        hash="root"
      >
        <Box w="100%">
          <Image
          src={`${OpenAPI.BASE}/media/${gift.images[0].url}`}
          alt={gift.images[0].alt_text || "unset"}
          w="100%"
          h="100%"
          />
        </Box>
        <Text
          mt={["12px", "12px", "16px", "16px"]}
          fontSize={["14px", "14px", titleFontSize, titleFontSize]}
          lineHeight={["18px", "18px", titleLineHeight, titleLineHeight]}
          textTransform="uppercase"
        >
          {gift[titleKey]}
        </Text>
        {showPrice && (
          <Text
            mt="8px"
            fontSize="18px"
            lineHeight="22px"
          >
            {currency.symbol}{getItemPrice(gift, currency)}
          </Text>
        )}
      </RouterLink>
    </Flex>
  )
}

export default GiftCard