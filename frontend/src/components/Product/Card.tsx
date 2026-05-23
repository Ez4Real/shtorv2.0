import { useState } from "react"
import { OpenAPI, ProductPublic } from "@/client"
import { useCurrency } from "@/contexts/CurrencyContext"
import { getItemPrice } from "@/utils"
import { Badge, Box, Flex, Image, Text, useBreakpointValue } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { Link as RouterLink } from "@tanstack/react-router"
import { TranslatableTitle } from "../Common/SwitchLocalization"
import { t } from "i18next"
import type { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Thumbs, Pagination, Zoom } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import 'swiper/css/pagination'
import "swiper/css/zoom"


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
  const [thumbsSwiper] = useState<SwiperType | null>(null)

  const isMobile = useBreakpointValue({ base: true, md: false })
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
        from="/"
        to="/products/$id"
        params={{ id: product.id }}
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
              pagination={isMobile ? false : true}
              zoom={true}
            >
              <>
                {product.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <Box className="swiper-zoom-container">
                      <Image
                        src={`${OpenAPI.BASE}/media/${image.url}`}
                        alt={image.alt_text || product[titleKey]}
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
          {product.preorder && (
            <Badge
              position="absolute"
              top={["10px", "24px", "24px", "24px"]}
              left={["10px", "24px", "24px", "24px"]}
              p={["2px 4px", "6px 8px", "6px 8px", "6px 8px"]}
              borderRadius={0}
              colorPalette="whiteAlpha"
              color="black"
              background="white"
              fontSize={["12px", "16px", "16px", "16px"]}
              fontWeight="300"
            >
              {t("Product.preorder")}
            </Badge>
          )}
          {!product.in_stock && (
            <Badge
              position="absolute"
              top={["10px", "24px", "24px", "24px"]}
              left={["10px", "24px", "24px", "24px"]}
              p={["2px 4px", "6px 8px", "6px 8px", "6px 8px"]}
              borderRadius={0}
              colorPalette="whiteAlpha"
              color="black"
              background="white"
              fontSize={["12px", "16px", "16px", "16px"]}
              fontWeight="300"
            >
              {t("Product.outOfStock")}
            </Badge>
          )}
        </Box>
        <Text
          mt={["12px", "12px", "16px", "16px"]}
          fontSize={["14px", "14px", titleFontSize, titleFontSize]}
          lineHeight={["18px", "18px", titleLineHeight, titleLineHeight]}
        >
          {product[titleKey]}
        </Text>
      </RouterLink>
      {displayProductPrice && (
        <Text
          mt={["4px", "4px", "8px", "8px"]}
          fontSize={["14px", "14px", "18px", "18px"]}
          lineHeight={["18px", "18px", "22px", "22px"]}
        >
          {currency.symbol}{getItemPrice(product, currency)}
        </Text>
      )}
    </Flex>
  )
}

export default ProductCard