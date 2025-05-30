import { Accordion, Button, CloseButton, Drawer, Flex, Image, Portal, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "@tanstack/react-router"
import BurgerMenu from "../Common/BurgerMenu"
import SwitchLocalizationDivider from "../Common/SwitchLocalization/LanguageCurrencyViaDivider"
import { useState } from "react"


const MenuDialog = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <Drawer.Root
      placement="start"
      size="sm"
      preventScroll={false}
      open={open} onOpenChange={(e) => setOpen(e.open)}
    >
      <Drawer.Trigger>
        <Button variant="plain" p="0" display="block">
          <BurgerMenu isOpen={open} />
        </Button>
      </Drawer.Trigger>

      <Portal>
        <Drawer.Backdrop />

        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Body pt="152px" pl="49px" pr="45px">
              <Flex flexDirection="column" gap="16px">
                <RouterLink to="/" hash="root">
                  <Text fontSize="24px" lineHeight="30px" fontWeight="400">
                    HOME
                  </Text>
                </RouterLink>

                <RouterLink to="/" hash="root">
                  <Text fontSize="24px" lineHeight="30px" fontWeight="400">
                    ABOUT US
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
                      >
                        SHOP
                      </Text>
                    </Accordion.ItemTrigger>

                    {[
                      "By Collections",
                      "Combs",
                      "Pendants",
                      "Necklaces",
                      "Earrings",
                      "Rings",
                      "Bracelets",
                    ].map((label, index) => (
                      <Accordion.ItemContent key={index}>
                        <Accordion.ItemBody
                          pt="16px"
                          pb="0"
                          fontSize="20px"
                          lineHeight="25px"
                          fontWeight="300"
                        >
                          {label}
                        </Accordion.ItemBody>
                      </Accordion.ItemContent>
                    ))}

                    <Accordion.ItemContent>
                      <Accordion.ItemBody
                        pt="16px"
                        pb="0"
                        fontSize="24px"
                        lineHeight="30px"
                        fontWeight="400"
                        position="absolute"
                        left="46px"
                      >
                        Cart
                      </Accordion.ItemBody>
                    </Accordion.ItemContent>
                  </Accordion.Item>
                </Accordion.Root>
              </Flex>
            </Drawer.Body>

            <Drawer.Footer pl="46px" pr="45px" pb="43px">
              <Flex w="100%" justifyContent="space-between">
                <Flex flexDirection="column" gap="8px">
                  <RouterLink className="menu-underline-link" to="/" hash="root">
                    Privacy Policy
                  </RouterLink>
                  <RouterLink className="menu-underline-link" to="/" hash="root">
                    Payment and Delivery
                  </RouterLink>
                  <RouterLink className="menu-underline-link" to="/" hash="root">
                    Returns
                  </RouterLink>
                </Flex>
                
                <SwitchLocalizationDivider />
              </Flex>
            </Drawer.Footer>

            <Drawer.CloseTrigger position="absolute" top="24px" right="24px">
              <CloseButton w="24px" display="contents">
                <Image src="assets/icons/menu-remove.svg" />
              </CloseButton>
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export default MenuDialog