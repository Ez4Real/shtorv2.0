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
}

const GiftCard = ({
    gift,
    showPrice = true,
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
          src={`${OpenAPI.BASE}/media/${gift.image.url}`}
          alt={gift.image.alt_text || "unset"}
          w="100%"
          h="100%"
          />
        </Box>
        <Text
          mt="16px"
          fontSize="24px"
          lineHeight="30px"
        >
          {gift[titleKey].toUpperCase()}
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