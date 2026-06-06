import { GiftPublic, OpenAPI } from "@/client"
import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "@tanstack/react-router"
import { TranslatableTitle } from "../Common/SwitchLocalization"
import { useTranslation } from "react-i18next"
import { useCurrency } from "@/contexts/CurrencyContext"
import { getItemPrice } from "@/utils"
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Thumbs, Pagination, Zoom } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import 'swiper/css/pagination'
import "swiper/css/zoom"
import { useState } from "react"


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
  const [thumbsSwiper] = useState<SwiperType | null>(null)

  const titleKey = `title_${i18n.language}` as TranslatableTitle
  
  return (
    <Flex
      direction="column"
      alignItems="stretch"
      w="100%"
      minW={0}
      fontWeight="300"
    >
      <RouterLink
        to="/gifts/$id"
        params={{ id: gift.id }}
        hash="root"
      >
        <Box
          w="100%"
          position="relative"
        >
          <Box
            w="100%"
            maxW="100%"
            position="relative"
            overflow="hidden"
            borderRadius="0"
          >
            <Swiper
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              modules={[FreeMode, Thumbs, Pagination, Zoom]}
              pagination={true}
              zoom={true}
            >
              <>
                {gift.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Box className="swiper-zoom-container">
                      <Image
                        src={`${OpenAPI.BASE}/media/${image.url}`}
                        alt={image.alt_text || gift[titleKey]}
                        w="100%"
                        objectFit="cover"
                        display="block"
                      />
                    </Box>
                  </SwiperSlide>
                ))}
              </>
            </Swiper>
          </Box>
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