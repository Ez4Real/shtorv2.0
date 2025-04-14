import { Accordion, Box, Button, CloseButton, Drawer, Flex, HStack, Image, Portal, Text } from "@chakra-ui/react"
import BurgerMenu from "../Common/BurgerMenu"
import { Link as RouterLink, useRouterState } from "@tanstack/react-router"

const Header = () => {
    const { location } = useRouterState()
    const isHomepage = location.pathname === "/"

    return (
      <>
        <Box
          as="header"
          position="relative"
          top={["61px", "61px", "46px", "46px"]}
          p={["0 16px", "0 16px", "0 46px", "0 46px"]}
          zIndex="1"
        >
          <Flex
            h="35px"
            justifyContent="space-between"
            alignItems="center"
          >
            <HStack>
              <Drawer.Root
                placement="start"
                size="sm"
              >
                <Drawer.Trigger>
                  <Button 
                    variant="plain" 
                    p="0" 
                    display="block">
                    <BurgerMenu 
                      isOpen={false} 
                      isWhiteTheme={isHomepage} 
                    />
                  </Button>
                </Drawer.Trigger>

                <Portal>
                  <Drawer.Backdrop />

                  <Drawer.Positioner>
                    <Drawer.Content
                    >
                      <Drawer.Body
                        pt="152px"
                        pl="49px"
                        pr="45px"
                      >
                        <Flex
                          flexDirection="column"
                          gap="16px"
                        >
                          <RouterLink 
                            to="/"
                            hash="root"
                          >
                            <Text
                              fontSize="24px"
                              lineHeight="30px"
                              fontWeight="400"
                            >HOME
                            </Text>
                          </RouterLink>
                          <RouterLink 
                            to="/"
                            hash="root"
                          >
                            <Text
                              fontSize="24px"
                              lineHeight="30px"
                              fontWeight="400"
                            >ABOUT US
                            </Text>
                          </RouterLink>

                          <Accordion.Root collapsible>
                            <Accordion.Item value="plain" border="none">

                                <Accordion.ItemTrigger p="0">
                                  <Text
                                    fontSize="24px"
                                    lineHeight="30px"
                                    fontWeight="400"
                                    cursor="pointer"
                                  >SHOP
                                  </Text>
                                </Accordion.ItemTrigger>

                                <Accordion.ItemContent>
                                  <Accordion.ItemBody 
                                    pt="16px" 
                                    pb="0"
                                    fontSize="20px"
                                    lineHeight="25px"
                                    fontWeight="300"
                                  > By Collections
                                  </Accordion.ItemBody>
                                </Accordion.ItemContent>

                                <Accordion.ItemContent>
                                  <Accordion.ItemBody 
                                    pt="16px" 
                                    pb="0"
                                    fontSize="20px"
                                    lineHeight="25px"
                                    fontWeight="300"
                                  > Combs
                                  </Accordion.ItemBody>
                                </Accordion.ItemContent>

                                <Accordion.ItemContent>
                                  <Accordion.ItemBody 
                                    pt="16px" 
                                    pb="0"
                                    fontSize="20px"
                                    lineHeight="25px"
                                    fontWeight="300"
                                  > Pendants
                                  </Accordion.ItemBody>
                                </Accordion.ItemContent>

                                <Accordion.ItemContent>
                                  <Accordion.ItemBody 
                                    pt="16px" 
                                    pb="0"
                                    fontSize="20px"
                                    lineHeight="25px"
                                    fontWeight="300"
                                  > Necklaces
                                  </Accordion.ItemBody>
                                </Accordion.ItemContent>

                                <Accordion.ItemContent>
                                  <Accordion.ItemBody 
                                    pt="16px" 
                                    pb="0"
                                    fontSize="20px"
                                    lineHeight="25px"
                                    fontWeight="300"
                                  > Earrings
                                  </Accordion.ItemBody>
                                </Accordion.ItemContent>

                                <Accordion.ItemContent>
                                  <Accordion.ItemBody 
                                    pt="16px" 
                                    pb="0"
                                    fontSize="20px"
                                    lineHeight="25px"
                                    fontWeight="300"
                                  > Rings
                                  </Accordion.ItemBody>
                                </Accordion.ItemContent>

                                <Accordion.ItemContent>
                                  <Accordion.ItemBody 
                                    pt="16px" 
                                    pb="0"
                                    fontSize="20px"
                                    lineHeight="25px"
                                    fontWeight="300"
                                  > Bracelets
                                  </Accordion.ItemBody>
                                </Accordion.ItemContent>

                                <Accordion.ItemContent>
                                  <Accordion.ItemBody 
                                    pt="16px" 
                                    pb="0"
                                    fontSize="24px"
                                    lineHeight="30px"
                                    fontWeight="400"
                                    position="absolute"
                                    left="46px"
                                  > Cart
                                  </Accordion.ItemBody>
                                </Accordion.ItemContent>

                              </Accordion.Item>
                          </Accordion.Root>
                        </Flex>
                      </Drawer.Body>

                      <Drawer.Footer
                        pl="46px"
                        pr="45px"
                        pb="43px"
                      >
                        <Flex
                          w="100%"
                          justifyContent="space-between"
                        >
                          <Flex
                            flexDirection="column"
                            gap="8px"
                          >
                            <RouterLink
                              className="menu-underline-link" 
                              to="/"
                              hash="root"
                            >
                              Privacy Policy
                            </RouterLink>

                            <RouterLink
                              className="menu-underline-link" 
                              to="/"
                              hash="root"
                            >
                              Payment and Delivery
                            </RouterLink>
                            <RouterLink
                              className="menu-underline-link"  
                              to="/"
                              hash="root"
                            >
                              Returns
                            </RouterLink>
                          </Flex>
                          <Flex
                            flexDirection="column"
                            h="39px"
                          >
                            <Text
                              fontSize="16px"
                              lineHeight="20px"
                              fontWeight="300"
                              textDecoration="underline"
                              color="ui.main"
                            >ENG
                            </Text>
                            <Text
                              fontSize="16px"
                              lineHeight="20px"
                              fontWeight="300"
                              color="ui.main"
                            >USD
                            </Text>
                          </Flex>
                        </Flex>
                      </Drawer.Footer>
                      
                      <Drawer.CloseTrigger
                        position="absolute"
                        top="24px"
                        right="24px"
                      >
                        <CloseButton
                          w="24px"
                          display="contents"
                        >
                          <Image src="assets/icons/menu-remove.svg"/>
                        </CloseButton>
                       
                      </Drawer.CloseTrigger>

                    </Drawer.Content>
                  </Drawer.Positioner>

                </Portal>
              </Drawer.Root>
            </HStack>

            <RouterLink 
              to="/"
              hash="root"
            >
              <Image
                src={`/assets/images/${
                  isHomepage ? "logo-white.svg" : "logo-black.svg"
                }`}
              />
            </RouterLink>

            <Flex
              alignItems="center"
              gap="16px"
              fontWeight="300"
            >
              <Box
                fontSize="20px"
                fontWeight="300"
                lineHeight="25px"
                display={["none", "none", "block", "block"]}
                color={isHomepage ? "ui.white": "ui.black"}
              >EN
              </Box>
              <Image src={`/assets/icons/${
                isHomepage ? "cart-header-white.svg" : "cart-header-black.svg"
                }`} />
            </Flex>
          </Flex>
        </Box>
      </>
    )
}

export default Header