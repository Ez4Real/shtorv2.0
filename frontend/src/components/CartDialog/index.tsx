import { Button, Drawer, Flex, Image, Portal, Text, VStack } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import ProductCounter from "../Common/ProductCounter"
import { useCart } from "@/contexts/CartContext"
import { TranslatableTitle } from "../Common/SwitchLocalization"
import { useCurrency } from "@/contexts/CurrencyContext"
import { Link as RouterLink, useNavigate } from "@tanstack/react-router"
import { OpenAPI } from "@/client"
import { getItemPrice } from "@/utils"


const CartDialog = () => {
  const { t, i18n } = useTranslation()
  const { isOpen, setIsOpen, items, removeItem, getCartTotal } = useCart()
  const { currency } = useCurrency()
  const titleKey = `title_${i18n.language}` as TranslatableTitle
  const navigate = useNavigate({})
  

  return (

    <Drawer.Root
      placement="end"
      size="sm"
      open={isOpen}
      onInteractOutside={() => setIsOpen(!isOpen)}
    >
      <Drawer.Trigger asChild>
        <Button 
          onClick={() => setIsOpen(!isOpen)}
          variant="plain" 
          p="0" 
          display="flex"
          >
            <Image src="/assets/icons/cart-header-black.svg" />
        </Button>
      </Drawer.Trigger>

      <Portal>
        <Drawer.Backdrop/>

        <Drawer.Positioner>
          <Drawer.Content
            h={["auto", "auto", "fit-content", "fit-content"]}
            minH="546px"
          >
            <Drawer.Body
              display={items.length ? "unset" : "flex"}
              justifyContent={items.length ? "unset" : "center"}
              alignItems={items.length ? "unset" : "center"}
              p={["72px 24px 24px"]}
            >
              {items.length > 0 ? (
                <>
                  <Text fontSize="24px">
                    {t("CartDialog.title")}
                  </Text>
                  { items.map((item, index) => (
                    <Flex
                      key={index}
                      mt="46px"
                      gap="16px"
                      maxH="224px"
                    > 

                      <Image
                        src={`${OpenAPI.BASE}/media/${item.data.images[0].url}`}
                        maxW="168px"
                      />
                      <VStack
                        w="full"
                        alignItems="flex-start"
                        justifyContent="space-between"
                      >
                        <VStack 
                          alignItems="flex-start"
                          gap={0}
                        >
                          <Text lineHeight="16px">
                            {item.data.type === 'product' && (
                              <>
                                {item.data.category?.[titleKey]}<br />
                              </>
                            )}
                            {item.data[titleKey]}
                          </Text> 
                          {item.data.type === "product" && item.data.size && (  
                            <Text mt="24px">
                              {t("Checkout.size")}: {item.data.size}
                            </Text>
                          )}
                          <Text mt="6px">
                            {t("Checkout.price")}: {currency.symbol}{getItemPrice(item.data, currency, item.qty)}
                          </Text>
                          <Flex>

                          </Flex>
                        </VStack>
                        <Flex
                          w="full"
                          justifyContent="space-between"
                        >
                          <ProductCounter
                            count={item.qty}
                            cartItemId={item.id}
                          />
                          <Text
                            onClick={() => removeItem(item.id)}
                          >
                            Remove
                          </Text>
                        </Flex>
                      </VStack>
                    </Flex>
                  ))}
                  
                  <Text mt="36px">
                    {t("CartDialog.total")}: {currency.symbol + getCartTotal(currency)} 
                  </Text>
                </>
              ) : (
                <Flex
                  h="100%"
                  flexDirection="column"
                  justifyContent="center"
                  textAlign="center"
                >
                  <Text fontSize="16px" fontWeight="600">
                    {t("CartDialog.emptyCart")}
                  </Text>
                  <Text fontSize="14px">{t("CartDialog.emptyCartHint")}</Text>
                  <RouterLink
                    to="/shop"
                    hash="root"
                    search={{ page: 1 }}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    <Text
                      fontSize="14px"
                      fontWeight="600"
                      mt="4rem"
                      textDecoration="underline"
                    >
                      {t("CartDialog.cartShopLink")}
                    </Text>
                  </RouterLink>
                </Flex>
              )}
            </Drawer.Body>

            <Drawer.Footer
            >
              <Button
                onClick={() => {
                  navigate({
                    to: "/checkout",
                    hash: "root"
                  })
                  setIsOpen(!isOpen)
                }}
                w="100%"
                marginTop={["32px", "32px", "46px", "46px"]}
                fontWeight="300"
                fontSize="16px"
                color="ui.main"
                backgroundColor="ui.white"
                borderColor="ui.main"
                borderRadius="0"
                h="32px"
              >
                {t("CartDialog.checkout")}
              </Button>
            </Drawer.Footer>
            
            <Drawer.CloseTrigger
              position="absolute"
              top="24px"
              right="24px"
            >
              <Image
                onClick={() => setIsOpen(!isOpen)}
                src="/assets/icons/menu-remove.svg"
              />
            </Drawer.CloseTrigger>

          </Drawer.Content>
        </Drawer.Positioner>

      </Portal>
    </Drawer.Root>
  )
}

export default CartDialog