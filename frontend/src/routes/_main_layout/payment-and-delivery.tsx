import { Container, Link, Text, VStack } from "@chakra-ui/react"
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
      <Text
        fontSize={["16px", "16px", "16px", "24px"]}
        lineHeight="30px"
        textTransform="uppercase"
        textAlign="center"
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
        <Text>
          {t("PaymentAndDelivery.policyTitle")}
        </Text>
        <Text
          mt="20px"
        >
          {t("PaymentAndDelivery.appeal")}!
        </Text>
        <Text
          mt="16px"
        >
          {t("PaymentAndDelivery.storageInfo")}
        </Text>
        <Text
          mt="16px"
        >
          {t("PaymentAndDelivery.ukraine")}
        </Text>
        <Text
          mt="16px"
        >
          {t("PaymentAndDelivery.international")}
        </Text>
        <Text
          mt="16px"
        >
          {t("PaymentAndDelivery.excludedCountries")}
        </Text>
        <Text
          mt="16px"
        >
          {t("PaymentAndDelivery.preorder")}
        </Text>
        <Text
          mt="20px"
        >
          {t("PaymentAndDelivery.contactAddress")}
            {" "}
            <Link
              href="mailto:info@shtor.com.ua"
              color="#0000FF"
            >info@shtor.com.ua</Link>
        </Text>
      </VStack>
    </Container>
  )
}
