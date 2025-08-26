import { Box, Button, Container, Flex, Image, List, RadioGroup, Spinner, Text, useBreakpointValue, VStack } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { Link as RouterLink } from "@tanstack/react-router"
import { useEffect, useState } from 'react';
import type { Swiper as SwiperCore } from "swiper";
import { useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Pagination, Scrollbar } from 'swiper/modules';
import { getItemPrice } from "@/utils"

import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import 'swiper/css/pagination'
import Breadcrumbs from "@/components/Common/Breadcrumbs";
import { useTranslation } from "react-i18next";
import { OpenAPI, ProductAttachment, ProductsService } from "@/client";
import { useQuery } from "@tanstack/react-query";
import { TranslatableDescription, TranslatableTitle } from "@/components/Common/SwitchLocalization";
import { useCurrency } from "@/contexts/CurrencyContext";
import ProductCard from "@/components/Product/Card";
import { useCart } from "@/contexts/CartContext";
import { pickProductData } from '../../../contexts/CartContext';

export const Route = createFileRoute("/_main_layout/products/$id")({
  component: Product,
})


function getProductQueryOptions({ id }: { id: string }) {
  return {
    queryFn: () => ProductsService.readProduct({ id }),
    queryKey: ["products", { id }]
  }
}

function getProductsQueryOptions({ collection_id, exclude_product_id }: { 
  collection_id: string,
  exclude_product_id: string | null
}) {
  return {
    queryFn: () => ProductsService.readProductsByCollection({
      id: collection_id,
      excludeProductId: exclude_product_id
    }),
    queryKey: ["products", { collection_id, exclude_product_id }]
  }
}

type Attachment = "silver-orbit" | "silver-chain" | "no-attachment"

function Product() {
  const { id } = Route.useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const { currency } = useCurrency()
  const { addItem, items } = useCart()
  const [size, setSize] = useState<string | null>(null)
  const [attachment, setAttachament] = useState<Attachment>("no-attachment")
  const displayProductPrice = useBreakpointValue({ base: true, md: false})

  
  const { data: product, isPending } = useQuery({
    ...getProductQueryOptions({ id: id }),
  })

  const { data: collectionProducts, isPending: isSimilarProductsPending } = useQuery({
    ...getProductsQueryOptions({
      collection_id: product?.collection_id ?? '',
      exclude_product_id: product?.id ?? null
    }),
    enabled: !!product?.collection_id && !!product?.id  
  })
  

  const similarProducts = collectionProducts?.data  
  
  const titleKey = `title_${i18n.language}` as TranslatableTitle;
  const descriptionKey = `description_${i18n.language}` as TranslatableDescription;
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const swiperRef = useRef<SwiperCore | null>(null)

  useEffect(() => {
    if (product?.sizes?.length) {
      setSize(product.sizes[0])
    }
  }, [product, items])

  const attachments = {
    "no-attachment": {
      name: "no-attachment",
      label: t("Product.attachments.no-attachment"),
      price_uah: 0,
      price_usd: 0,
      price_eur: 0
    },
    "silver-chain": {
      name: "silver-chain",
      label: t("Product.attachments.silver-chain"),
      price_uah: 1000,
      price_usd: 30,
      price_eur: 30
    },
    "silver-orbit": {
      name: "silver-orbit",
      label: t("Product.attachments.silver-orbit"),
      price_uah: 3200,
      price_usd: 90,
      price_eur: 90
    }
  }

  return (
    <Container
      pr={["16px", "16px", "48px", "48px"]}
      pl={["16px", "16px", "48px", "48px"]}
    >
        {isPending ? (
          <Flex justify="center" align="center" height="100vh">
            <Spinner size="xl" saturate="1s" color="ui.main" />
          </Flex>
        ) : (
          product && (
            <>
              <Breadcrumbs
                items={[
                  { path: "/collections", name: "Collections" },
                  { path: `/collections/${product.collection_id}`, name: `${product.collection.title}` },
                  { path: `/products/${product.id}`, name: `${product[titleKey]}` },
                ]}
              />
              <Flex
                justifyContent="space-between"
                flexDirection={{ base: "column", sm: "column", md: "column", lg: "unset" }}
                gap={["16px", "16px", "176px", "176px"]}
              >
                <Flex direction={{ base: "column", sm: "row", md: "row", lg: "row" }}>
                  {!isMobile && (
                    <Box h="600px" w="96px" overflow="hidden">
                      <Swiper
                        onSwiper={setThumbsSwiper}
                        direction="vertical"
                        slidesPerView={6}
                        modules={[FreeMode, Thumbs, Scrollbar]}
                        scrollbar={{ draggable: true }}
                        freeMode={true}
                        style={{ height: '100%' }}
                      >
                        <>
                          {product.images.map((image, index) => (
                            <SwiperSlide key={index}>
                              <Image
                                h="85px"
                                objectFit="cover"
                                src={`${OpenAPI.BASE}/media/${image.url}`}
                              />
                            </SwiperSlide>
                          ))}
                        </>
                      </Swiper>
                    </Box>
                  )}

                  <Box w={["100%", "100%", "412px", "412px"]} position="relative">
                    <Swiper
                      thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                      modules={[FreeMode, Thumbs, Pagination]}
                      pagination={true}
                    >
                      <>
                        {product.images.map((image, index) => (
                          <SwiperSlide key={index}>
                            <Image
                              src={`${OpenAPI.BASE}/media/${image.url}`}
                            />
                          </SwiperSlide>
                        ))}
                      </>
                    </Swiper>
                  </Box>
                </Flex>
                  <Box
                    w={["100%", "100%", "50%", "50%"]}
                  >
                      <Text
                        fontSize={["18px", "18px", "24px", "24px"]}
                        lineHeight={["23px", "23px", "30px", "30px"]}
                        mb={["12px", "12px", "24px", "24px"]}
                        textTransform="uppercase"
                      >{product[titleKey]}
                      </Text>

                      <VStack
                        alignItems="flex-start"
                        gapY={["12px", "12px", "12px", "16px"]}
                      >
                        <Flex
                          gapX={["24px", "24px", "36px", "36px"]}
                          fontSize={["16px", "16px", "18px", "18px"]}
                          lineHeight="23px"
                        >
                          <Text>{t("Product.description")}</Text>
                          <RouterLink
                            to="/care"
                            hash="root"
                            >
                            <Text className="main-footer-link">{t("Product.care")}</Text>
                          </RouterLink>
                          { !product.is_gift && product.category.title_en === "Clothes" && (
                            <RouterLink
                              to="/size-guide"
                              hash="root"
                              >
                              <Text>{t("Product.sizeGuide")}</Text>
                            </RouterLink>
                          )}
                        </Flex>

                        <List.Root
                          pt="0"
                          pl={["22px", "22px", "26px", "26px"]}
                          fontSize={["14px", "14px", "16px", "16px"]}
                          lineHeight={["18px", "18px", "23px", "23px"]}
                          css={{
                            '& li': {
                              _marker: { color: "black" },
                            },
                          }}
                        >
                          {product[descriptionKey].split('\n').map((line, index) => (
                            <List.Item key={index}>{line}</List.Item>
                          ))}
                        </List.Root>

                        {product.sizes && (
                          <RadioGroup.Root 
                            value={size}
                            defaultValue={product.sizes[0]}
                            onValueChange={(e) => setSize(e.value)}
                            pl="9px"
                          >
                            <VStack 
                              gap={["4px", "4px", "10px", "10px"]}
                              alignItems="flex-start"
                            >
                                {product.sizes.map((size) => (
                                <RadioGroup.Item 
                                  key={size} 
                                  value={size}
                                  gap="7px"
                                >
                                    <RadioGroup.ItemHiddenInput/>
                                    <RadioGroup.ItemIndicator 
                                      border="1px solid #000000"
                                      w="10px"
                                      h="10px"
                                      backgroundColor="ui.white"
                                      color="ui.main"
                                      mb="-1px"
                                    />
                                    <RadioGroup.ItemText
                                      fontSize={["14px", "14px", "16px", "16px"]}
                                      fontWeight={["300", "300", "400" , "400"]}
                                    >
                                      {size}
                                    </RadioGroup.ItemText>

                                </RadioGroup.Item>
                                ))}
                            </VStack>
                          </RadioGroup.Root>
                        )}

                        <Text
                          fontSize={["16px", "16px", "18px", "18px"]}
                          lineHeight={["20px", "20px", "23px", "23px"]}
                          fontWeight="400"
                        >
                          {currency.symbol}{getItemPrice(product, currency) + getItemPrice(attachments[attachment] as ProductAttachment, currency)}
                        </Text>
                          {product.attachment && (
                            <RadioGroup.Root 
                              defaultValue="no-attachment"
                              value={attachment}
                              onValueChange={(e) => {
                                setAttachament(e.value as Attachment)
                              }}
                              pl="9px"
                            >
                              <VStack 
                                gap="10px"
                                alignItems="flex-start"
                              >
                                {Object.entries(attachments).map(([key, value]) => (
                                  <RadioGroup.Item 
                                    key={key} 
                                    value={key}
                                    gap="7px"
                                  >
                                    <RadioGroup.ItemHiddenInput/>
                                    <RadioGroup.ItemIndicator 
                                      border="1px solid #000000"
                                      w="10px"
                                      h="10px"
                                      backgroundColor="ui.white"
                                      color="ui.main"
                                      mb="-1px"
                                    />
                                    <RadioGroup.ItemText
                                      fontSize={["14px", "14px", "16px", "16px"]}
                                      fontWeight={["300", "300", "400" , "400"]}
                                    >
                                      {value.label}
                                    </RadioGroup.ItemText>
        
                                  </RadioGroup.Item>
                                ))}
                              </VStack>
                            </RadioGroup.Root>
                          )}

                      </VStack>
                      <Button
                        w="100%"
                        marginTop="24px"
                        color="ui.main"
                        backgroundColor="ui.white"
                        borderColor="ui.main"
                        borderRadius="0"
                        maxW={["100%", "100%", "363px", "363px"]}
                        h="32px"
                        disabled={!product.in_stock}
                        onClick={
                          () => { 
                          if (!product.in_stock) return
                          addItem({
                            ...pickProductData(product),
                            type: "product",
                            size: size,
                            attachment: attachment === "no-attachment" ? null : attachments[attachment] as ProductAttachment
                          })
                          setSize(null)
                          setAttachament("no-attachment")
                        }}
                      >
                        {t("Product.addToCart")}
                      </Button>
                  </Box>
              </Flex>
            </>
          )
        )}

        <Box
          pt={["83px", "83px", "83px", "133px"]}
          pb={["114px", "114px", "114px", "208px"]}
        >
            <Text
              mb={["16px", "16px", "32px", "32px"]}
              fontWeight="400"
              fontSize="16px"
            >
              {t("Product.suggestions")}
            </Text>
            
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[Navigation]}
              slidesPerView={4}
              spaceBetween="24px"
              rewind={true}
              breakpoints={{
                0: { slidesPerView: 2 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
              }}
            >

              {isSimilarProductsPending ? (
                <Flex justify="center" align="center" height="100vh">
                  <Spinner size="xl" saturate="1s" color="ui.main" />
                </Flex>
              ) : (
                similarProducts?.map((product, index) => (
                  <SwiperSlide key={index}>
                    <ProductCard
                      product={product}
                      displayProductPrice={displayProductPrice}
                      titleFontSize="16px"
                      titleLineHeight="20px"
                    />  
                  </SwiperSlide>
                ))
              )}
                <Box
                  mt="32px"
                  display={["block", "block", "none", "none"]}
                  onClick={() => swiperRef.current?.slideNext()}
                >
                    <Image 
                      src="/assets/icons/arrow-right.svg" 
                      alt="Next Slide"
                      w="46px"
                    />
                </Box>
            </Swiper>
        </Box> 
    </Container>
  )
}