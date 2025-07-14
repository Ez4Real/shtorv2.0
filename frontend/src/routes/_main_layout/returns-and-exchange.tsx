import { Box, Container, Flex, Text, VStack } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"


export const Route = createFileRoute("/_main_layout/returns-and-exchange")({
  component: ReturnsAndExchange,
})


function ReturnsAndExchange() {
  const { t } = useTranslation()


  return (
    <Container
      p={0}
      maxW="100vw"
      mb={["72px", "72px", "115px", "115px"]}
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
          {t("ReturnsAndExchange.title")}
        </Text>

        <VStack
          mt={["24px", "24px", "36px", "36px"]}
          alignItems="flex-start"
          lineHeight="20px"
          gapY={0}
          fontSize="16px"
        >

          <Text
            fontWeight={["300", "300", "500", "500"]}
          >{t("ReturnsAndExchange.general")}</Text>
          <Text
            mt="24px
          ">{t("ReturnsAndExchange.itemCondition")}</Text>
          <Flex as="li" align="start" mt="16px">
            <Box
                as="span"
                mt="8px"
                mr="12px" 
                w="4px"
                h="4px"
                bg="ui.main"
                borderRadius="full"
                flexShrink={0}
                marginInline="10px"
            />
            <Text>
                {t("ReturnsAndExchange.noExchange")}
            </Text>
            </Flex>
          {/* <Box
            as="li"
            mt="16px"
            listStylePosition="inside"
          >{t("ReturnsAndExchange.noExchange")}</Box> */}
          <Text
            mt="24px"
          >{t("ReturnsAndExchange.returnDelivery")}</Text>
          <Text
            mt="24px"
          >{t("ReturnsAndExchange.returnDeliverydetails")}</Text>
          <Text
            mt="24px"
          >{t("ReturnsAndExchange.fallUnderPolicy")}</Text>
          

        </VStack>
      </VStack>
    </Container>
  )
}
