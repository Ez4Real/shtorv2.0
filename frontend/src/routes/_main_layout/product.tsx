import { Box, Breadcrumb, Button, Container, Flex, HStack, Image, List, RadioGroup, Tabs, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

export const Route = createFileRoute("/_main_layout/product")({
  component: Product,
})


function Product() {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const items = [
        { label: "XS", value: "1" },
        { label: "S", value: "2" },
        { label: "M", value: "3" },
        { label: "L", value: "4" },
      ]
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
                    >HOME
                    </Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Breadcrumb.Link
                        href="#"
                        fontSize="16px"
                    >/OBJECT
                    </Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Breadcrumb.Link
                        href="#"
                        fontWeight="500"
                        fontSize="16px"
                    >/bracelet-pendant
                    </Breadcrumb.Link>
                </Breadcrumb.Item>
            </Breadcrumb.List>
        </Breadcrumb.Root>
        <Flex
          justifyContent="space-between"
        >
            <Flex>
                <Box 
                  height="600px" 
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
                            <Image w="60px"h="88px" src="assets/images/test-product.svg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image w="60px"h="88px" src="assets/images/test-product-2.svg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image w="60px" h="88px"src="assets/images/test-product.svg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image w="60px" h="88px" src="assets/images/test-product-2.svg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image w="60px" h="88px" src="assets/images/test-product.svg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image w="60px" h="88px" src="assets/images/test-product-2.svg" />
                        </SwiperSlide>
                    </Swiper>
                </Box>

                <Box w="400px">
                    <Swiper
                        thumbs={{ swiper: thumbsSwiper }}
                        modules={[FreeMode, Thumbs]}
                        style={{ height: "100%" }}
                    >
                        <SwiperSlide>
                            <Image src="assets/images/test-product.svg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src="assets/images/test-product-2.svg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src="assets/images/test-product.svg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src="assets/images/test-product-2.svg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src="assets/images/test-product.svg" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <Image src="assets/images/test-product-2.svg" />
                        </SwiperSlide>
                    </Swiper>
                </Box>
            </Flex>

            <Box
                w="40%"
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
                          fontWeight="600"
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
                    <RadioGroup.Root defaultValue="1">
                        <HStack gap="3" flexDirection="column" alignItems="flex-start">
                            {items.map((item) => (
                            <RadioGroup.Item key={item.value} value={item.value}>
                                <RadioGroup.ItemHiddenInput />
                                <RadioGroup.ItemIndicator />
                                <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
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
                >
                    Add to cart
                </Button>
            </Box>
        </Flex>
    </Container>
  )
}