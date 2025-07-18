import { Accordion, Box, Drawer, Flex, Image, Portal, Text } from "@chakra-ui/react"
import { Link as RouterLink } from "@tanstack/react-router"
import BurgerMenu from "../Common/BurgerMenu"
import SwitchLocalizationDivider from "../Common/SwitchLocalization/LanguageCurrencyViaDivider"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useQuery } from "@tanstack/react-query"
import { CategoriesService, CollectionsService } from "@/client"
import { TranslatableTitle } from "../Common/SwitchLocalization"
import { useCart } from "@/contexts/CartContext"


function getCollectionsQueryOptions() {
  return {
    queryFn: () => CollectionsService.readCollections(),
    queryKey: ["collections"],
  }
}

function getCategoriesQueryOptions() {
  return {
    queryFn: () => CategoriesService.readCategories(),
    queryKey: ["categories"],
  }
}


const MenuDialog = () => {
  const { t, i18n } = useTranslation()
  const [open, setOpen] = useState<boolean>(false)
  const { setIsOpen } = useCart()

  const { data: collectionsData } = useQuery({
    ...getCollectionsQueryOptions(),
  })
  const collections = collectionsData?.data

  const { data: categoriesData } = useQuery({
    ...getCategoriesQueryOptions(),
  })
  const categories = categoriesData?.data
  
  const titleKey = `title_${i18n.language}` as TranslatableTitle;
  
  const footerLinks = [
    { to: "/privacy-policy", text: t("Footer.privacyPolicy")},
    { to: "/payment-and-delivery", text: t("Footer.paymentAndDelivery")},
    { to: "/returns-and-exchange", text: t("Footer.returns")},
    { to: "/public-offer-agreement", text: t("Footer.publicOfferAgreement")},
    { to: "https://t.me/gala_butnotdalis", text: t("Footer.chat")},
    { to: "/size-guide", text: t("Footer.sizeGuide")},
  ]

  return (

    <Drawer.Root
      placement="start"
      size="sm"
      preventScroll={false}
      open={open} onOpenChange={(e) => setOpen(e.open)}
    >
      <Drawer.Trigger zIndex="1">
        <BurgerMenu isOpen={open}/>
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
                  onClick={() => setOpen(!open)}
                >
                  <Text
                    fontSize={["16px", "16px", "24px", "24px"]}
                    lineHeight={["20px", "20px", "30px", "30px"]}
                    fontWeight="300"
                  >{t("MenuDialog.homepage")}
                  </Text>
                </RouterLink>
                <RouterLink 
                  to="/about-us"
                  hash="root"
                  onClick={() => setOpen(!open)}
                >
                  <Text
                    fontSize={["16px", "16px", "24px", "24px"]}
                    lineHeight={["20px", "20px", "30px", "30px"]}
                    fontWeight="300"
                  >{t("MenuDialog.aboutUs")}
                  </Text>
                </RouterLink>

                <Accordion.Root collapsible>
                  <Accordion.Item value="plain" border="none">

                      <Accordion.ItemTrigger 
                        p="0"
                      >
                        <Text
                          fontSize={["16px", "16px", "24px", "24px"]}
                          lineHeight={["20px", "20px", "30px", "30px"]}
                          fontWeight="300"
                          cursor="pointer"
                        >{t("MenuDialog.shop.title")}
                        </Text>
                      </Accordion.ItemTrigger>

                      <Accordion.ItemContent>
                        <RouterLink
                            to="/shop"
                            search={{ page: 1 }}
                            hash="root"
                            onClick={() => setOpen(!open)}
                          >
                            <Accordion.ItemBody 
                              pt="16px" 
                              pb="0"
                              fontSize={["16px", "16px", "20px", "20px"]}
                              lineHeight="25px"
                              fontWeight="300"
                            >{t("MenuDialog.shop.all")}
                            </Accordion.ItemBody>
                          </RouterLink>
                      </Accordion.ItemContent>

                      <Accordion.ItemContent>
                        <Accordion.ItemBody
                          pt={["12px", "12px", "12px", "16px"]}
                          pb="0"
                        >
                          <Accordion.Root collapsible>
                            <Accordion.Item 
                              value="collections" 
                              border="none"
                            >
                              <Accordion.ItemTrigger 
                                pt="0" 
                                pb="0"
                                w="auto"
                                css={{
                                  borderRadius: '0',
                                  borderBottom: '1px solid transparent',
                                  maxWidth: '133px',
                                  _expanded: {
                                    borderBottom: '1px solid',
                                    borderColor: 'ui.border',
                                  },
                                }}
                                
                                mb={["2px", "2px", 0, 0]}
                              >
                                <Text
                                  fontSize={["16px", "16px", "20px", "20px"]}
                                  lineHeight={["20px", "20px", "25px", "25px"]}
                                  fontWeight="300" 
                                  cursor="pointer"
                                >
                                  {t("MenuDialog.shop.collection")}
                                </Text>
                              </Accordion.ItemTrigger>
                              {collections?.map((collection) => (
                                <Accordion.ItemContent key={collection.id}>
                                  <RouterLink
                                    from="/collections"
                                    to="/collections/$id"
                                    params={{ id: collection.id }}
                                    hash="root"
                                    onClick={() => setOpen(!open)}
                                  >
                                    <Accordion.ItemBody 
                                      pt="10px" 
                                      pb="0"
                                      textTransform="uppercase"
                                    >
                                      <Text
                                        fontSize="16px"
                                        fontWeight="300" 
                                        cursor="pointer">
                                          {collection.title}
                                      </Text>
                                    </Accordion.ItemBody>
                                  </RouterLink>
                                </Accordion.ItemContent>
                              ))}
                            </Accordion.Item>
                          </Accordion.Root>
                        </Accordion.ItemBody>
                      </Accordion.ItemContent>

                      {categories?.map((category) => (
                        <Accordion.ItemContent key={category.id}>
                          <RouterLink
                            to="/shop"
                            search={{ page: 1, category_id: category.id }}
                            hash="root"
                            onClick={() => setOpen(!open)}
                          >
                            <Accordion.ItemBody 
                              pt={["12px", "12px", "16px", "16px"]}
                              pb="0"
                              fontSize={["16px", "16px", "20px", "20px"]}
                              lineHeight={["20px", "20px", "25px", "25px"]}
                              fontWeight="300"
                            >{category[titleKey]}
                            </Accordion.ItemBody>
                          </RouterLink>
                        </Accordion.ItemContent>
                      ))}

                      <Box>
                        <Accordion.ItemContent>
                          <RouterLink
                            to="/gifts"
                            hash="root"
                            onClick={() => setOpen(!open)}
                          >
                            <Accordion.ItemBody 
                              pt="16px" 
                              pb="0"
                              fontSize={["16px", "16px", "20px", "20px"]}
                              lineHeight={["20px", "20px", "25px", "25px"]}
                              fontWeight="300"
                            >{t("MenuDialog.shop.categories.gifts")}
                            </Accordion.ItemBody>
                          </RouterLink>
                        </Accordion.ItemContent>
                      </Box>

                      <Accordion.ItemContent>
                        <Accordion.ItemBody 
                          onClick={() => {
                            setOpen(!open)
                            setIsOpen(true)
                          }}
                          pt="16px" 
                          pb="0"
                          fontSize={["16px", "16px", "24px", "24px"]}
                          textTransform={["uppercase", "uppercase", "unset", "unset"]}
                          lineHeight={["20px", "20px", "30px", "30px"]}
                          fontWeight="300"
                        >{t("MenuDialog.bag")}
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
                  {footerLinks?.map((link, index) => (
                    <RouterLink
                      key={index}
                      className="menu-underline-link" 
                      to={link.to}
                      hash="root"
                      onClick={() => setOpen(!open)}
                    >
                      {link.text}
                    </RouterLink>
                  ))}
                </Flex>
                

                <SwitchLocalizationDivider />
              </Flex>
            </Drawer.Footer>
            
            <Drawer.CloseTrigger
              position="absolute"
              top="24px"
              right="24px"
              cursor="pointer"
            >
              <Image
                src="/assets/icons/menu-remove.svg"
              />
            </Drawer.CloseTrigger>

          </Drawer.Content>
        </Drawer.Positioner>

      </Portal>
    </Drawer.Root>
  )
}

export default MenuDialog