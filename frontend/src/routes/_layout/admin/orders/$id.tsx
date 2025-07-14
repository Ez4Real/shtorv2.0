import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next";
import { Currency, OrdersService } from "@/client";
import { useQuery } from "@tanstack/react-query";
import { currencyList } from "@/contexts/CurrencyContext";
import { Badge, Box, Container, Flex, Grid, GridItem, Image, Spinner, Text, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { getItemPrice } from "@/utils";
import { TranslatableTitle } from "@/components/Common/SwitchLocalization";
export const Route = createFileRoute("/_layout/admin/orders/$id")({
  component: Order,
})


function getOrderQueryOptions({ id }: { id: string }) {
  return {
    queryFn: () => OrdersService.readOrder({ id }),
    queryKey: ["orders", { id }]
  }
}



function Order() {
  const { id } = Route.useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const scrollbarColor = useColorModeValue("ui.main", "ui.dim")
  const titleKey = `title_${i18n.language}` as TranslatableTitle

  const { data: order, isPending } = useQuery({
    ...getOrderQueryOptions({ id: id }),
  })

  if (!order) return null

  return (
    <Container maxW="full">
      {isPending ? (
        <Flex justify="center" align="center" height="100vh">
          <Spinner size="xl" saturate="1s" color="ui.main" />
        </Flex>
      ) : (
        <>
          <Flex justify="space-between" align="center" mt={2}>
            <Text
              fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
              fontSize="12px"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="0.05em"
              color="#A0AEC0"
            >
              Order ID: {order.id}
            </Text>
            <Badge
              bg="#8c9baeba"
              color={`paymentStatus.${order.payment_status}`}
              borderRadius="8px"
              fontSize="1em"
            >
              {order.payment_status?.toUpperCase()}
            </Badge>
          </Flex>
          <Flex justify="space-between" align="center" mt={2}>
            <Text
              fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
              fontSize="12px"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="0.05em"
              color="#A0AEC0"
            >
              Invoice ID: {order.invoiceId}
            </Text>
            <Text color="gray.500">
              Created: {new Date(order.created_at).toLocaleString()}
            </Text>
          </Flex>

          <Box border="1px solid" borderRadius="12px" mt="1rem">
            <Grid
              display={["flex", "grid"]}
              flexDirection={["column", "row"]}
              templateColumns={`1fr 1fr${order.billing_address ? " 1fr" : ""}`}
            >


              {/* Customer Info */}
              <GridItem>
                <VStack align="start" p="1rem" gapY={2}>
                  <Text fontSize="lg" fontWeight="bold">
                    Customer Info:
                  </Text>
                  <Flex w="100%" alignItems="center" justifyContent="space-between">
                    <Text
                      fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                      fontSize="12px"
                      fontWeight="700"
                      textTransform="uppercase"
                      letterSpacing="0.05em"
                      color="#A0AEC0"
                    >
                      Name:
                    </Text>
                    <Text>
                      {order.delivery_address.first_name} {order.delivery_address.last_name}
                    </Text>
                  </Flex>
                  <Flex w="100%" alignItems="center" justifyContent="space-between">
                    <Text
                      fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                      fontSize="12px"
                      fontWeight="700"
                      textTransform="uppercase"
                      letterSpacing="0.05em"
                      color="#A0AEC0"
                    >
                      Email:
                    </Text>
                    <Text>{order.email}</Text>
                  </Flex>
                  <Flex w="100%" alignItems="center" justifyContent="space-between">
                    <Text
                      fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                      fontSize="12px"
                      fontWeight="700"
                      textTransform="uppercase"
                      letterSpacing="0.05em"
                      color="#A0AEC0"
                    >
                      Phone:
                    </Text>
                    <Text>{order.delivery_address.phone}</Text>
                  </Flex>
                  <Flex w="100%" alignItems="center" justifyContent="space-between">
                    <Text
                      fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                      fontSize="12px"
                      fontWeight="700"
                      textTransform="uppercase"
                      letterSpacing="0.05em"
                      color="#A0AEC0"
                    >
                      Mailing:
                    </Text>
                    <Flex gap={2}>
                      <Box
                        w="2"
                        h="2"
                        borderRadius="50%"
                        bg={order.mailing ? "ui.success" : "ui.danger"}
                        alignSelf="center"
                      />
                      {order.mailing ? "Active" : "Inactive"}
                    </Flex>
                  </Flex>
                </VStack>
              </GridItem>
              {/* Delivery Info */}
              <GridItem>
                <VStack align="start" p="1rem" gapY={2}>
                  <Text fontSize="lg" fontWeight="bold">
                    Delivery Address:
                  </Text>
                  <Flex w="100%" alignItems="center" justifyContent="space-between">
                    <Text
                      fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                      fontSize="12px"
                      fontWeight="700"
                      textTransform="uppercase"
                      letterSpacing="0.05em"
                      color="#A0AEC0"
                    >
                      Shipping Method: 
                    </Text>
                    <Text>
                      {t(`Orders.shipping-method.${order.shipping_method}`)}
                    </Text>
                  </Flex>
                  <Flex w="100%" alignItems="center" justifyContent="space-between">
                    <Text
                      fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                      fontSize="12px"
                      fontWeight="700"
                      textTransform="uppercase"
                      letterSpacing="0.05em"
                      color="#A0AEC0"
                    >
                      Country:
                    </Text>
                    <Text>{order.delivery_address.country}</Text>
                  </Flex>
                  <Flex w="100%" alignItems="center" justifyContent="space-between">
                    <Text
                      fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                      fontSize="12px"
                      fontWeight="700"
                      textTransform="uppercase"
                      letterSpacing="0.05em"
                      color="#A0AEC0"
                    >
                      City:
                    </Text>
                    <Text>{order.delivery_address.city}</Text>
                  </Flex>
                  <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text
                      fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                      fontSize="12px"
                      fontWeight="700"
                      textTransform="uppercase"
                      letterSpacing="0.05em"
                      color="#A0AEC0"
                    >
                      Street Adress:
                    </Text>
                    <Text>{order.delivery_address.address}</Text>
                  </Flex>
                  { order.delivery_address.additional && (
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text
                        fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                        fontSize="12px"
                        fontWeight="700"
                        textTransform="uppercase"
                        letterSpacing="0.05em"
                        color="#A0AEC0"
                      >
                        {t("Checkout.delivery.suite")}
                      </Text>
                      <Text>{order.delivery_address.additional}</Text>
                    </Flex>
                  )}
                  <Flex
                    w="100%"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Text
                      fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                      fontSize="12px"
                      fontWeight="700"
                      textTransform="uppercase"
                      letterSpacing="0.05em"
                      color="#A0AEC0"
                    >
                      Postal Code:
                    </Text>
                    <Text>{order.delivery_address.postal_code}</Text>
                  </Flex>
                </VStack>
              </GridItem>
              {/* Delivery Info */}
              {order.billing_address && (
                <GridItem>
                  <VStack align="start" p="1rem" gapY={2}>
                    <Text fontSize="lg" fontWeight="bold">
                      Billing Address:
                    </Text>
                    <Flex w="100%" alignItems="center" justifyContent="space-between">
                      <Text
                        fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                        fontSize="12px"
                        fontWeight="700"
                        textTransform="uppercase"
                        letterSpacing="0.05em"
                        color="#A0AEC0"
                      >
                        Country:
                      </Text>
                      <Text>{order.billing_address.country}</Text>
                    </Flex>
                    <Flex w="100%" alignItems="center" justifyContent="space-between">
                      <Text
                        fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                        fontSize="12px"
                        fontWeight="700"
                        textTransform="uppercase"
                        letterSpacing="0.05em"
                        color="#A0AEC0"
                      >
                        City:
                      </Text>
                      <Text>{order.billing_address.city}</Text>
                    </Flex>
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text
                        fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                        fontSize="12px"
                        fontWeight="700"
                        textTransform="uppercase"
                        letterSpacing="0.05em"
                        color="#A0AEC0"
                      >
                        Street Adress:
                      </Text>
                      <Text>{order.billing_address.address}</Text>
                    </Flex>
                    { order.billing_address.additional && (
                      <Flex
                        w="100%"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Text
                          fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                          fontSize="12px"
                          fontWeight="700"
                          textTransform="uppercase"
                          letterSpacing="0.05em"
                          color="#A0AEC0"
                        >
                          {t("Checkout.delivery.suite")}
                        </Text>
                        <Text>{order.billing_address.additional}</Text>
                      </Flex>
                    )}
                    <Flex
                      w="100%"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Text
                        fontFamily='-apple-system, BlinkMacSystemFont, "Segoe UI"'
                        fontSize="12px"
                        fontWeight="700"
                        textTransform="uppercase"
                        letterSpacing="0.05em"
                        color="#A0AEC0"
                      >
                        Postal Code:
                      </Text>
                      <Text>{order.billing_address.postal_code}</Text>
                    </Flex>
                  </VStack>
                </GridItem>
              )}
            </Grid>
            <Flex
              w="100%"
              alignItems="center"
              justifyContent="space-between"
              p="0 1rem 1rem"
            >
              <Text fontSize="lg" fontWeight="bold">
                Total Amount:
              </Text>
              <Text fontSize="xl" fontWeight="bold">
                {order.currency.toUpperCase()} - {currencyList[order.currency as Currency].symbol}{order.amount}
              </Text>
            </Flex>
          </Box>

          {order.comment && (
            <Text mt={4}>
              <Text
                as="span"
                fontSize="lg"
                fontWeight="bold"
                mr="1rem"
              >
                Comment: 
              </Text>{order.comment}
            </Text>
          )}

          {/* Order Items */}
          <Text fontSize="lg" fontWeight="bold" mt={4}>
            Products:
          </Text>
          <Grid
            gridTemplateColumns={["1fr", "1fr 1fr 1fr"]}
            gap={4}
            py=".5rem"
            css={{
              "::-webkit-scrollbar-thumb": {
                background: scrollbarColor,
              },
            }}
          >
            {order.basketOrder.map((item, index) => (
              <Flex
                key={index}
                borderWidth="1px"
                borderRadius="md"
                w="100%"
                align="center"
              >
                <Box boxSize="140px" minW="90px">
                  <Image
                    w="100%"
                    h="100%"
                    src={item.icon}
                    objectFit="cover"
                    borderRadius="md"
                  />
                </Box>
                <Box p=".5rem 1rem" maxW="350px">
                  <Text fontWeight="bold">{item.data[titleKey]}</Text>
                  <Text>
                    Price: {currencyList[order.currency].symbol}{getItemPrice(item.data, currencyList[order.currency])}
                  </Text>
                  <Text>
                    Qty: {item.qty} {item.unit}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Grid>
        </>
      )}
    </Container>
  )
}