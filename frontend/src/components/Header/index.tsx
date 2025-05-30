import { Box, Flex, HStack, Image } from "@chakra-ui/react"

import { Link as RouterLink, useRouterState } from "@tanstack/react-router"
import SwitchLocalizationMini from "../Common/SwitchLocalization/LanguageMini"
import MenuDialog from "../MenuDialog"

const Header = () => {
    const { location } = useRouterState()

    const absoluteHeaderPaths = ['/', '/collections/']
    const isHeaderAbsolute = absoluteHeaderPaths.includes(location.pathname)
    return (
      <>
        <Box
          as="header"
          position={isHeaderAbsolute ? "absolute" : "relative"}
          zIndex={isHeaderAbsolute ? "1" : "0" }
          w="full"
          p={["46px 16px", "46px", "46px", "46px"]}
        >
          <Flex
            h={["24px", "24px", "35px", "35px"]}
            alignItems="center"
            justifyContent="space-between"
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
                        pt="100px"
                        pl="24px"
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
                              fontWeight="300"
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
                              fontWeight="300"
                            >ABOUT US
                            </Text>
                          </RouterLink>

                          <Accordion.Root collapsible>
                            <Accordion.Item value="plain" border="none">

                                <Accordion.ItemTrigger 
                                  p="0"
                                >
                                  <Text
                                    fontSize="24px"
                                    lineHeight="30px"
                                    fontWeight="300"
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
                                  > All products
                                  </Accordion.ItemBody>
                                </Accordion.ItemContent>

                                <Accordion.ItemContent>
                                  <Accordion.ItemBody pt="16px" pb="0">
                                    <Accordion.Root collapsible>
                                      <Accordion.Item 
                                        value="collections" 
                                        border="none"
                                      >
                                        <Accordion.ItemTrigger 
                                          pt="0" 
                                          pb="0"
                                          css={{
                                            borderRadius: '0',
                                            borderBottom: '1px solid transparent',
                                            maxWidth: '133px',
                                            _expanded: {
                                              borderBottom: '1px solid',
                                              borderColor: 'ui.border',
                                            },
                                          }}
                                        >
                                          <Text
                                            fontSize="20px"
                                            lineHeight="25px" 
                                            fontWeight="300" 
                                            cursor="pointer"
                                            
                                          >
                                            By Collections
                                          </Text>
                                        </Accordion.ItemTrigger>
                                        <Accordion.ItemContent>
                                          <Accordion.ItemBody 
                                            pt="10px" 
                                            pb="4px"
                                            textTransform="uppercase"
                                          >
                                            <Text
                                              pt="10px" 
                                              fontSize="16px"
                                              fontWeight="300" 
                                              cursor="pointer">
                                                Metamorphosi
                                            </Text>
                                            <Text
                                              pt="10px" 
                                              fontSize="16px"
                                              fontWeight="300" 
                                              cursor="pointer">
                                                Cenc x shtor
                                            </Text>
                                            <Text
                                              pt="10px" 
                                              fontSize="16px"
                                              fontWeight="300" 
                                              cursor="pointer">
                                                The opposite
                                            </Text>
                                            <Text
                                              pt="10px" 
                                              fontSize="16px"
                                              fontWeight="300" 
                                              cursor="pointer">
                                                Oberih
                                            </Text>
                                            <Text
                                              pt="10px"
                                              pb="4px"
                                              fontSize="16px"
                                              fontWeight="300" 
                                              cursor="pointer">
                                                Nature
                                            </Text>
                                          </Accordion.ItemBody>
                                        </Accordion.ItemContent>
                                      </Accordion.Item>
                                    </Accordion.Root>
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
                                    fontSize="20px"
                                    lineHeight="25px"
                                    fontWeight="300"
                                  > Bags
                                  </Accordion.ItemBody>
                                </Accordion.ItemContent>

                                <Box>
                                  <Accordion.ItemContent>
                                    <Accordion.ItemBody 
                                      pt="16px" 
                                      pb="0"
                                      fontSize="20px"
                                      lineHeight="25px"
                                      fontWeight="300"
                                    > Clothes
                                    </Accordion.ItemBody>
                                  </Accordion.ItemContent>
                                  <Accordion.ItemContent>
                                    <Accordion.ItemBody 
                                      pt="8px" 
                                      pb="0"
                                      fontSize="20px"
                                      lineHeight="25px"
                                      fontWeight="300"
                                    > Hats
                                    </Accordion.ItemBody>
                                  </Accordion.ItemContent>
                                  <Accordion.ItemContent>
                                    <Accordion.ItemBody 
                                      pt="8px" 
                                      pb="0"
                                      fontSize="20px"
                                      lineHeight="25px"
                                      fontWeight="300"
                                    > Gifts
                                    </Accordion.ItemBody>
                                  </Accordion.ItemContent>
                                </Box>

                                <Accordion.ItemContent>
                                  <Accordion.ItemBody 
                                    pt="16px" 
                                    pb="0"
                                    fontSize="24px"
                                    lineHeight="30px"
                                    fontWeight="300"
                                  > Bag
                                  </Accordion.ItemBody>
                                </Accordion.ItemContent>

                              </Accordion.Item>
                          </Accordion.Root>
                        </Flex>
                      </Drawer.Body>

                      <Drawer.Footer
                        pl="24px"
                        pr="46px"
                        pb="24px"
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
                            <RouterLink
                              className="menu-underline-link"  
                              to="/"
                              hash="root"
                            >
                              Public offer agreement 
                            </RouterLink>
                            <RouterLink
                              className="menu-underline-link"  
                              to="/"
                              hash="root"
                            >
                              Caht
                            </RouterLink>
                            <RouterLink
                              className="menu-underline-link"  
                              to="/"
                              hash="root"
                            >
                              Size Guide
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
              
              <MenuDialog />
              
            </HStack>

            <Box
              position="absolute"
              left="50%"
              top="50%"
              transform="translate(-50%, -50%)"
              w={["100px", "100px", "180px", "180px"]}
            >
              <RouterLink to="/" hash="root">
                <Image
                  src="/assets/images/logo-black.svg"
                  w="100%"
                  h="100%"
                />
              </RouterLink>
            </Box>

            <Flex
              alignItems="center"
              gap="16px"
              fontWeight="300"
            >
              <SwitchLocalizationMini />
              <Image src="/assets/icons/cart-header-black.svg"/>
            </Flex>
          </Flex>
        </Box>
      </>
    )
}

export default Header