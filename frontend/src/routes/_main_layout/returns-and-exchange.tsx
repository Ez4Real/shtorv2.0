import { Container, Link, Text, VStack } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"


export const Route = createFileRoute("/_main_layout/returns-and-exchange")({
  component: ReturnsAndExchanges,
})


function ReturnsAndExchanges() {
  const { t } = useTranslation()


  return (
    <Container
      p={0}
      maxW="100vw"
      mb={["72px", "72px", "115px", "115px"]}
      padding={["0 16px", "0 16px", "0 16px", "0 200px"]}
    >
      <Text
        fontSize={["16px", "16px", "16px", "24px"]}
        lineHeight="30px"
        textTransform="uppercase"
        textAlign="center"
      >
        {t("ReturnsAndExchanges.title")}
      </Text>
      <VStack
        mt={["24px", "24px", "36px", "36px"]}
        alignItems="flex-start"
        lineHeight="20px"
        gapY={0}
        fontSize="16px"
      >
        <Text>
          {t("ReturnsAndExchanges.term")}
        </Text>
        <Text
          mt="16px"
        >
          {t("ReturnsAndExchanges.returnContactAddress")}
            {" "}
            <Link
              href="mailto:info@shtor.com.ua"
              color="#0000FF"
            >info@shtor.com.ua</Link>
        </Text>
        <Text
          mt="16px"
        >
          {t("ReturnsAndExchanges.productCondition")}
        </Text>
        <Text
          mt="16px"
        >
          {t("ReturnsAndExchanges.customOrder")}
        </Text>
        <Text
          mt="16px"
        >
          {t("ReturnsAndExchanges.returnDelivery")}
        </Text>
        <Text
          mt="20px"
        >
          {t("ReturnsAndExchanges.contactAddress")}
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
