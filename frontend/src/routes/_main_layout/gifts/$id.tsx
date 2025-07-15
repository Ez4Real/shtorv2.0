import { Box, Button, Container, Flex, Image, Input, List, RadioGroup, Spinner, Text, useBreakpointValue, VStack } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useEffect, useState } from 'react';
import type { Swiper as SwiperCore } from "swiper";
import { useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper/modules';
// import type { Swiper as SwiperType } from 'swiper'
import Breadcrumbs from "@/components/Common/Breadcrumbs";
import { useTranslation } from "react-i18next";
import { OpenAPI, GiftsService, ProductsService } from "@/client";
import { useQuery } from "@tanstack/react-query";
import { TranslatableDescription, TranslatableTitle } from "@/components/Common/SwitchLocalization";
import { useCurrency } from "@/contexts/CurrencyContext";
import ProductCard from "@/components/Product/Card";
import { pickGiftData, useCart } from "@/contexts/CartContext";
import { Field } from "@/components/ui/field";
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

export const Route = createFileRoute("/_main_layout/gifts/$id")({
  component: Product,
})


function getGiftQueryOptions({ id }: { id: string }) {
  return {
    queryFn: () => GiftsService.readGiftById({ id }),
    queryKey: ["gifts", { id }]
  }
}

function getProductsQueryOptions() {
  return {
    queryFn: () => ProductsService.readProducts({
      limit: 8
    }),
    queryKey: ["products"]
  }
}


type certificateType = "physical" | "digital"

function Product() {
  const { id } = Route.useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const { currency } = useCurrency()
  const { addItem } = useCart()
  const [certificateType, setCertificateType] = useState<certificateType>("digital")
  const [priceOption, setPriceOption] = useState<string | null>(null)
  const [amount, setAmount] = useState<number | null>(null)
  
  const { data: gift, isPending: isGiftPending } = useQuery({
    ...getGiftQueryOptions({ id: id }),
  })


  const { data: productsData,  isPending: isProductsPending } = useQuery({
    ...getProductsQueryOptions(),
  })

  const products = productsData?.data


  useEffect(() => {
    if (priceOption !== "custom") {
      setAmount(Number(priceOption))
    }
  }, [currency])
  

  
  const titleKey = `title_${i18n.language}` as TranslatableTitle;
  const descriptionKey = `description_${i18n.language}` as TranslatableDescription;
  // const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const swiperRef = useRef<SwiperCore | null>(null)
  
  const certificateTypes = {
    "physical": {
      value: "physical",
      label: t("Gifts.details.certificate.physical")
    },
    "digital": {
      value: "digital",
      label: t("Gifts.details.certificate.digital")
    }
  }

  const priceOptions = [
      {
        value: {
            uah: "5000",
            usd: "150",
            eur: "150",
        },
      },
      {
        value: {
            uah: "10000",
            usd: "300",
            eur: "300",
        },
      },
      { value: "custom", label: "Other amount" }
    ]

   const mappedPriceOptions = priceOptions.map((opt) => {
    if (opt.value === "custom") {
        return {
        label: t("Gifts.details.amount.custom.label"),
        value: "custom",
        }
    }

    if (typeof opt.value === "object" && opt.value !== null) {
        const amountValue = opt.value[currency.code as keyof typeof opt.value]
        return {
        label: `${currency.symbol}${amountValue}`,
        value: amountValue,
        }
    }

    return {
        label: "",
        value: "",
    }
    })

  useEffect(() => {
    setAmount(null)
  }, [currency])


  return (
    <Container
      pr={["16px", "16px", "48px", "48px"]}
      pl={["16px", "16px", "48px", "48px"]}
    >
        {isGiftPending ? (
          <Flex justify="center" align="center" height="100vh">
            <Spinner size="xl" saturate="1s" color="ui.main" />
          </Flex>
        ) : (
          gift && (
            <>
              <Breadcrumbs
                items={[
                  { path: "/gifts", name: "GIFTS" },
                  { path: `/gifts/${gift.id}`, name: `${gift[titleKey]}` },
                ]}
              />
              <Flex
                justifyContent="space-between"
                flexDirection={{ base: "column", sm: "column", md: "column", lg: "unset" }}
                gap={["24px", "24px", "272px", "272px",]}
              >
                <Flex direction={{ base: "column", sm: "row", md: "row", lg: "row" }}>
                  <Box w={["100%", "100%", "412px", "412px"]} position="relative">
                    <Swiper
                      // thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                      modules={[FreeMode, Thumbs, Pagination]}
                      pagination={isMobile ? { clickable: true } : false}
                      style={{ height: "100%" }}
                    >
                      <SwiperSlide >
                        <Image
                            src={`${OpenAPI.BASE}/media/${gift.image.url}`}
                        />
                      </SwiperSlide>
                    </Swiper>
                  </Box>
                </Flex>
                <Box
                  w={["100%", "100%", "50%", "50%"]}
                > 
                  <Box w="fit-content">

                        <Text
                          fontSize="24px"
                          lineHeight="30px"
                          mb="24px"
                          textTransform="uppercase"
                        >{gift[titleKey]}
                        </Text>

                        <VStack
                          alignItems="flex-start"
                          gapY={["12px", "12px", "12px", "16px"]}
                        >
                          <Text
                            fontSize="16px"
                            lineHeight="20px"
                            fontWeight="400"
                          >{t("Gifts.details.description.label")}</Text>

                          <List.Root
                            ml="1.5rem"
                            w={["320px"]}
                            fontSize="16px"
                            lineHeight="20px"
                            css={{
                              '& li': {
                                _marker: { color: "black" },
                              },
                            }}
                          >
                            {gift[descriptionKey].split('\n').map((line, index) => (
                              <List.Item key={index}>{line}</List.Item>
                            ))}
                          </List.Root>

                          <Text
                            fontSize="16px"
                            lineHeight="20px"
                            fontWeight="400"
                          >{t("Gifts.details.certificate.label")}</Text>
                        </VStack>


                        <RadioGroup.Root 
                          defaultValue="digital"
                          value={certificateType}
                          onValueChange={(e) => {
                            setCertificateType(e.value as certificateType)
                          }}
                          pl="9px"
                          mt="18px"
                          >
                          <VStack 
                              gap="10px"
                              alignItems="flex-start"
                          >
                              {Object.entries(certificateTypes).map(([key, value]) => (
                              <RadioGroup.Item 
                                  key={key} 
                                  value={value.value}
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
                                  fontSize="16px"
                                  fontWeight="400"
                                  >
                                  {value.label}
                                  </RadioGroup.ItemText>
      
                              </RadioGroup.Item>
                              ))}
                          </VStack>
                        </RadioGroup.Root>

                        <RadioGroup.Root
                          value={priceOption}
                          onValueChange={(e) => {
                            setPriceOption(e.value)
                            if (e.value === "custom") {
                              setAmount(null)
                            } else {
                              setAmount(Number(e.value))
                            }
                          }}
                          pl="9px"
                          mt="18px"
                          >
                          <VStack gap="10px" alignItems="flex-start">
                            {mappedPriceOptions.map((opt, idx) => (
                            <RadioGroup.Item key={idx} value={opt.value} gap="7px">
                              <RadioGroup.ItemHiddenInput />
                              <RadioGroup.ItemIndicator
                                border="1px solid #000000"
                                w="10px"
                                h="10px"
                                backgroundColor="ui.white"
                                color="ui.main"
                                mb="-1px"
                              />
                              <RadioGroup.ItemText fontSize="16px" fontWeight="400">
                                {opt.label}
                              </RadioGroup.ItemText>
                            </RadioGroup.Item>
                            ))}
                          </VStack>
                          </RadioGroup.Root>

                        {priceOption === "custom" && (
                          <Field
                            required
                            invalid={
                              !amount ||
                              amount < (currency.code === "uah" ? 3333 : 100) ||
                              amount > (currency.code === "uah" ? 35000 : 1050)
                            }
                            errorText={
                              <Text fontWeight="300">
                                {t(
                                  "Gifts.details.amount.custom.errorText",
                                  currency.code === "uah"
                                    ? { min: 3333, max: 35000, currency: "₴" }
                                    : { min: 100, max: 1050, currency: currency.symbol }
                                )}
                              </Text>
                            }
                            w="100%"
                            mt={["12px", "12px", "24px", "24px"]}
                          >
                            <Input
                              type="number"
                              onChange={(e) => {
                                const num = parseFloat(e.target.value)
                                const min = currency.code === "uah" ? 3333 : 100
                                const max = currency.code === "uah" ? 35000 : 1050
                                setAmount(Number.isNaN(num) || num < min || num > max ? null : num)
                              }}
                              min={currency.code === "uah" ? 3333 : 100}
                              max={currency.code === "uah" ? 35000 : 1050}
                              variant="flushed"
                              placeholder={t("Gifts.details.amount.custom.placeholder")}
                              borderColor="black"
                              fontSize="12px"
                              h="19px"
                            />
                          </Field>
                        )}

                        <Button
                          disabled={!amount}
                          w="100%"
                          marginTop="24px"
                          color="ui.main"
                          backgroundColor="ui.white"
                          borderColor="ui.main"
                          borderRadius="0"
                          maxW={["100%", "100%", "363px", "363px"]}
                          h="32px"
                          onClick={
                            () => { 
                            addItem({
                              ...pickGiftData(gift, amount, currency.code),
                              type: "gift",
                              certificate_type: certificateType
                            })
                            setCertificateType("digital")
                            setPriceOption(null)
                          }}
                        >
                          {t("Product.addToCart")}
                        </Button>
                    </Box>
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
              mb="32px"
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

              {isProductsPending ? (
                <Flex justify="center" align="center" height="100vh">
                  <Spinner size="xl" saturate="1s" color="ui.main" />
                </Flex>
              ) : (
                products?.map((product, index) => (
                  <SwiperSlide key={index}>
                    <ProductCard
                      product={product}
                      displayProductPrice={false}
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