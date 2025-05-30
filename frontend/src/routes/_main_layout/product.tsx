import { Box, Breadcrumb, Button, Container, Flex, HStack, Image, List, RadioGroup, Tabs, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from 'react'
import type { Swiper as SwiperCore } from "swiper"
import { useRef } from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

export const Route = createFileRoute("/_main_layout/product")({
  component: Product,
})


function Product() {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
    const items = [
        { label: "Small", value: "1" },
        { label: "Medium", value: "2" },
        { label: "Large", value: "3" },
    ]
    const aboutUsImg = "/assets/images/test-category.svg"
    const swiperRef = useRef<SwiperCore | null>(null)
  return (
    <Container
      pt="120px"
      pr={["16px", "16px", "48px", "48px"]}
      pl={["16px", "16px", "48px", "48px"]}
    >
        <Breadcrumb.Root
            pb="32px"
        >
            <Breadcrumb.List>
                <Breadcrumb.Item>
                    <Breadcrumb.Link
                      href="/#root"
                      fontSize="16px"
                    >Home
                    </Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Breadcrumb.Link
                      href="#"
                      fontSize="16px"
                    >/GOLDEN RATIO
                    </Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Breadcrumb.Link
                      href="#"
                      fontWeight="500"
                      fontSize="16px"
                    >/Spiral earrings
                    </Breadcrumb.Link>
                </Breadcrumb.Item>
            </Breadcrumb.List>
        </Breadcrumb.Root>
        <Flex
          justifyContent="space-between"
        >
            <Flex>
                <Box 
                  min-height="600px" 
                  w="96px"
                >
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      direction="vertical"
                      slidesPerView={6}
                      modules={[FreeMode, Thumbs]}
                      style={{ height: "100%" }}
                    >
                        <SwiperSlide>
                            <Image h="85px" src="assets/images/product-test-big.svg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image h="85px" src="assets/images/product-test-big.svg" />
                        </SwiperSlide>
                    </Swiper>
                </Box>

                <Box w="412px">
                    <Swiper
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[FreeMode, Thumbs]}
                      style={{ height: "100%" }}
                    >
                        <SwiperSlide>
                            <Image src="assets/images/product-test-big.svg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image h="300px" src="assets/images/product-test-big.svg" />
                        </SwiperSlide>
                    </Swiper>
                </Box>
            </Flex>

            <Box
              w="50%"
              pl="90px"
            >
                <Text
                  fontSize="24px"
                  fontWeight="400"
                  lineHeight="30px"
                  mb="24px"
                >Bracelet-pendant
                </Text>
                
                <Tabs.Root 
                  variant="plain"
                  lazyMount 
                  unmountOnExit 
                  defaultValue="description"
                  pt="0"
                >
                    <Tabs.List gap="36px">
                        <Tabs.Trigger 
                          value="description" 
                          p="0"
                          fontSize="18px"
                          lineHeight="23px"
                          fontWeight="400"
                          h="21px"
                          >
                            Description
                        </Tabs.Trigger>
                        <Tabs.Trigger 
                          value="care"
                          p="0"
                          fontSize="18px"
                          lineHeight="23px"
                          h="21px"
                          fontWeight="300"
                          >
                            Care
                        </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content 
                      value="description"
                      pt="0"
                      mt="-3px"
                    >
                        <List.Root pt="0" pl="26px">
                            <List.Item 
                              _marker={{ color: "ui.main" }} 
                              fontSize="16px"
                              lineHeight="23px"
                              fontWeight="300"
                            >
                                Wood.
                            </List.Item>
                            <List.Item
                              _marker={{ color: "ui.main" }} 
                              fontSize="16px"
                              lineHeight="23px"
                              fontWeight="300"
                            >
                                Three waxed cords included: 1/2mm black,<br></br> 1mm milky color.
                            </List.Item>
                            <List.Item
                              _marker={{ color: "ui.main" }} 
                              fontSize="16px"
                              lineHeight="23px"
                              fontWeight="300"
                            >
                                Handcrafted. Each piece is unique.
                            </List.Item>
                            <List.Item
                              _marker={{ color: "ui.main" }} 
                              fontSize="16px"
                              lineHeight="23px"
                              fontWeight="300"
                            >
                                Handcrafted. Each piece is unique.
                            </List.Item>
                            <List.Item
                              _marker={{ color: "ui.main" }} 
                              fontSize="16px"
                              lineHeight="23px"
                              fontWeight="300"
                            >
                                Size: 21,5 cm
                            </List.Item>
                        </List.Root>
                    </Tabs.Content>

                    <Tabs.Content value="care">Manage your projects</Tabs.Content>
                </Tabs.Root>

                <Box
                  mt="16px"
                >
                    <RadioGroup.Root 
                      defaultValue="1" 
                      pl="9px"
                    >
                        <HStack 
                          gap="10px" 
                          flexDirection="column" 
                          alignItems="flex-start"
                        >
                            {items.map((item) => (
                            <RadioGroup.Item 
                              key={item.value} 
                              value={item.value}
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
                                  {item.label}
                                </RadioGroup.ItemText>

                            </RadioGroup.Item>
                            ))}
                        </HStack>
                    </RadioGroup.Root>
                </Box>

                <Text
                  fontSize="18px"
                  lineHeight="23px"
                  fontWeight="400"
                  marginTop="24px"
                >$125
                </Text>

                <Button
                  w="100%"
                  marginTop="24px"
                  color="ui.main"
                  backgroundColor="ui.white"
                  borderColor="ui.main"
                  borderRadius="0"
                  maxW="363px"
                  h="32px"
                >
                    Add to cart
                </Button>
            </Box>
        </Flex>

        <Box pt="133px" pb="208px">
            <Text
              mb="32px"
              fontWeight="400"
              fontSize="16px"
            >
              You also may like
            </Text>

            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[Navigation]}
              slidesPerView={4}
              spaceBetween="24px"
              rewind={true}
            // breakpoints={{
            //     0: { slidesPerView: 2 },
            //     768: { slidesPerView: 4 },
            //     1024: { slidesPerView: 6 },
            // }}
            >
            {Array.from({ length: 6 }).map((_, index) => (
                <SwiperSlide key={index}>

                    <Image src={aboutUsImg} />

                    <Text 
                      fontWeight="300" 
                      fontSize="16px" 
                      lineHeight="24px" 
                      mt="16px"
                    >
                      Seahell pendant
                    </Text>
                    
                </SwiperSlide>
            ))}
                {/* <Box
                mt="32px"
                display={["block", "block", "none", "none"]}
                onClick={() => swiperRef.current?.slideNext()}
                >
                    <Image 
                    src="assets/icons/arrow-right.svg" 
                    alt="Next Slide"
                    w="46px"
                    />
                </Box> */}
            </Swiper>
        </Box> 
    </Container>
  )
}