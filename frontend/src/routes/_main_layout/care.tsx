import { Box, Container, Text, VStack } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"


export const Route = createFileRoute("/_main_layout/care")({
  component: Care,
})


function Care() {
  const { t } = useTranslation()


  return (
    <Container
      p={0}
      maxW="100vw"
      mb={["85px", "85px", "50px", "50px"]}
      padding={["0 16px", "0 16px", "0 16px", "0 46px"]}
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
          {t("Care.title")}
        </Text>

        <VStack
          mt={["24px", "24px", "36px", "36px"]}
          alignItems="flex-start"
          lineHeight="20px"
          gapY={0}
        >
          
          <Text
            fontSize="18px"
            lineHeight="22px"
          >
            {t("Care.jewelry.title")}
          </Text>
          <Box
            as="ul"
            listStyleType="disc"
            _marker={{
              color: "red",
              fill: "black",
            }}
            fontSize="16px"
            paddingInline="24px"
            mt="16px"
          >
            <li>{t("Care.jewelry.1")}</li>
            <li>{t("Care.jewelry.2")}</li>
            <li>{t("Care.jewelry.3")}</li>
            <li>{t("Care.jewelry.4")}</li>
            <li>{t("Care.jewelry.5")}</li>
            <li>{t("Care.jewelry.6")}</li>
            <li>{t("Care.jewelry.7")}</li>
            <li>{t("Care.jewelry.8")}</li>
            <li>{t("Care.jewelry.9")}</li>
          </Box>

        <Text
          fontSize="18px"
          lineHeight="22px"
          mt="24px"
        >
          {t("Care.clothes.title")}
        </Text>
        <Box
          as="ul"
          listStyleType="disc"
          _marker={{
            color: "red",
            fill: "black",
          }}
          fontSize="16px"
          paddingInline="24px"
          mt="16px"
        >
          <li>{t("Care.clothes.1")}</li>
          <li>{t("Care.clothes.2")}</li>
          <li>{t("Care.clothes.3")}</li>
          <li>{t("Care.clothes.4")}</li>
        </Box>


        </VStack>
      </VStack>
    </Container>
  )
}
