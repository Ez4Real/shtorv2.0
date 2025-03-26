
import { Box, Breadcrumb, Container, Flex, Image, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main_layout/about-us")({
    component: AboutUs,
})


function AboutUs() {

    const aboutUsImg = "/assets/images/about-us.svg"

    return (
        <Container
            pt="120px"
            pr="48px"
            pl="46px"
        >
            <Breadcrumb.Root
                pb="36px"
            >
                <Breadcrumb.List>
                    <Breadcrumb.Item>
                        <Breadcrumb.Link
                            href="/#root"
                            fontSize="16px"
                        >HOME/
                        </Breadcrumb.Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Breadcrumb.Link
                            href="#"
                            fontWeight="500"
                            fontSize="16px"
                        >About us
                        </Breadcrumb.Link>
                    </Breadcrumb.Item>
                </Breadcrumb.List>
            </Breadcrumb.Root>

            <Flex
                justifyContent="space-between"
                pb="30px"
            >
                <Image src={aboutUsImg} />
                <Image src={aboutUsImg} />
                <Image src={aboutUsImg} />
                <Image src={aboutUsImg} />
            </Flex>

            <Box>
                <Text
                    pb="10px"
                    fontWeight="400"
                    fontSize="46px"
                    lineHeight="58px"
                >About Us
                </Text>
                <Flex
                    gap="36px"
                >
                    <Text
                        maxW="268px"
                    >
                        The name SHTOR comes from my surname and is a perfect symbiosis of my parents and the values 
                        they instilled in me. My father always said: "The truth is a good way to the real you, without 
                        illusions and pretty words." This is not always easy to understand. But what would we do without 
                        black and white in our lives? That is why black and white are the primary colors used in the brand positioning. 
                        As for my mother, she taught me to see this world as beautiful, introduced me to art, and supported me in all my wildest desires. 
                    </Text>
                    <Flex
                        flexDirection="column"
                        justifyContent="space-between"
                    >
                        <Text
                            maxW="270px"
                            fontWeight="300"
                            fontSize="16px"
                            lineHeight="20px"
                        >
                            As for the idea, it came to my mind while looking through old family photos when I came across a picture of my mother. 
                            In the shot, she was only 16 years old and still living in a small village. But she was full of faith in herself and the 
                            future. And what struck me the most was her intense look, a whole of complete freedom. This image of identity is embodied in the brand.»
                        </Text>
                        <Text
                            textAlign="right"
                            mb="4px"
                        >
                            -Galina Shtor, the brand owner
                        </Text>
                    </Flex>
                </Flex>
            </Box>
            <Flex 
              pt="177px"
              pb="130px"
              gap="46px"
              translate="-46px"
            >
                <Image 
                  src="/assets/images/about-us-big.svg"
                />
                <Box
                  maxW="510px"
                >
                    <Text
                      fontWeight="400"
                      fontSize="46px"
                      lineHeight="58px"
                      mb="8px"
                    >Gala Shtor</Text>
                    <Text
                      fontWeight="300"
                      fontSize="16px"
                      lineHeight="20px"
                    >
                        The name SHTOR comes from my surname and is a perfect symbiosis of my parents and the values they instilled in me. 
                        My father always said: "The truth is a good way to the real you, without illusions and pretty words." This is not always 
                        easy to understand. But what would we do without black and white in our lives? That is why black and white are the primary 
                        colors used in the brand positioning.<br></br>
                        As for my mother, she taught me to see this world as beautiful, introduced me to art, and supported me in all my wildest desires.
                    </Text>
                </Box>
            </Flex>

            <Flex
              justifyContent="space-between"
              gap="14px"
              pb="310px"
            >
                <Flex
                  direction="column"
                  height="100%"
                >
                    <Image 
                      src={aboutUsImg}
                      height="220px"
                      w="179px"
                    />
                    <Text 
                      fontWeight="300"
                      fontSize="24px"
                      lineHeight="24px"
                      mt="12px"
                    >Name of the collection
                    </Text>
                </Flex>
                <Flex
                  direction="column"
                  height="100%"
                >
                    <Image 
                      src={aboutUsImg}
                      height="220px"
                      w="179px"
                    />
                    <Text 
                      fontWeight="300"
                      fontSize="24px"
                      lineHeight="24px"
                      mt="12px"
                    >Name of the collection
                    </Text>
                </Flex>
                <Flex
                  direction="column"
                  height="100%"
                >
                    <Image 
                      src={aboutUsImg}
                      height="220px"
                      w="179px"
                    />
                    <Text 
                      fontWeight="300"
                      fontSize="24px"
                      lineHeight="24px"
                      mt="12px"
                    >Name of the collection
                    </Text>
                </Flex>
                <Flex
                  direction="column"
                  height="100%"
                >
                    <Image 
                      src={aboutUsImg}
                      height="220px"
                      w="179px"
                    />
                    <Text 
                      fontWeight="300"
                      fontSize="24px"
                      lineHeight="24px"
                      mt="12px"
                    >Name of the collection
                    </Text>
                </Flex>
                <Flex
                  direction="column"
                  height="100%"
                >
                    <Image 
                      src={aboutUsImg}
                      height="220px"
                      w="179px"
                    />
                    <Text 
                      fontWeight="300"
                      fontSize="24px"
                      lineHeight="24px"
                      mt="12px"
                    >Name of the collection
                    </Text>
                </Flex>
                <Flex
                  direction="column"
                  height="100%"
                >
                    <Image 
                      src={aboutUsImg}
                      height="220px"
                      w="179px"
                    />
                    <Text 
                      fontWeight="300"
                      fontSize="24px"
                      lineHeight="24px"
                      mt="12px"
                    >Name of the collection
                    </Text>
                </Flex>
                <Flex
                  direction="column"
                  height="100%"
                >
                    <Image 
                      src={aboutUsImg}
                      height="220px"
                      w="179px"
                    />
                    <Text 
                      fontWeight="300"
                      fontSize="24px"
                      lineHeight="24px"
                      mt="12px"
                    >Name of the collection
                    </Text>
                </Flex>
            </Flex>


        </Container>
    )
}