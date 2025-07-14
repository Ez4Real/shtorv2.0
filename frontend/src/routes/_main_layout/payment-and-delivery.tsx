import { Box, Container, Text, VStack } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"


export const Route = createFileRoute("/_main_layout/payment-and-delivery")({
  component: PaymentAndDelivery,
})


function PaymentAndDelivery() {
  const { t } = useTranslation()


  return (
    <Container
      p={0}
      maxW="100vw"
      mb={["60px", "60px", "72px", "72px"]}
      padding={["0 16px", "0 16px", "0 16px", "0 200px"]}
    >
      <VStack
        gap={0}
        fontWeight="300"
      >
        <Text
          fontSize={["16px", "16px", "16px", "24px"]}
          lineHeight="30px"
          textTransform="uppercase"
        >
          {t("PaymentAndDelivery.title")}
        </Text>

        <VStack
          mt={["24px", "24px", "36px", "36px"]}
          alignItems="flex-start"
          lineHeight="20px"
          gapY={0}
          fontSize="16px"
        >
          <Text
            fontWeight="400"
          >
            {t("PaymentAndDelivery.appeal")},
          </Text>
          <Text
            mt="16px"
          >
            {t("PaymentAndDelivery.general")}
          </Text>
          <Text
            mt="12px"
          >
            {t("PaymentAndDelivery.taxesInfo")}
          </Text>
          <Text
            as="li"
            ml="8px"
            mt="16px"
            fontWeight="400"
          >
            {t("PaymentAndDelivery.excludedCountries")}
          </Text>
          <Box
            mt="24px"
          >
            <Text fontWeight="500">
                {t("PaymentAndDelivery.internationalOrders.title")}
            </Text>
            <Text
              mt="16px"
            >
                {t("PaymentAndDelivery.internationalOrders.info")}
            </Text>
            <Text
              as="li"
              ml="8px"
              mt="12px"
            >
                {t("PaymentAndDelivery.internationalOrders.deliveryCost")}
            </Text>
          </Box>
          <Box
            mt="24px"
          >
            <Text fontWeight="500">
                {t("PaymentAndDelivery.ukraine.name")}
            </Text>
            <Text
              mt="16px"
            >
                {t("PaymentAndDelivery.ukraine.info")}
            </Text>
            <Text
              mt="16px"
              fontSize="18px"
            >
                {t("PaymentAndDelivery.ukraine.free")}
            </Text>
          </Box>

        </VStack>
      </VStack>
    </Container>
  )
}
