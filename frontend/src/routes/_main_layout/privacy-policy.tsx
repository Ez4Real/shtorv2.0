import { Box, Container, Text, VStack } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"


export const Route = createFileRoute("/_main_layout/privacy-policy")({
  component: PrivacyPolicy,
})


function PrivacyPolicy() {
  const { t } = useTranslation()


  return (
    <Container
      p={0}
      maxW="100vw"
      mb={["125px", "125px", "200px", "200px"]}
      padding={["0 16px", "0 16px", "0 16px", "0 200px"]}
    >
      <VStack
        gap={0}
        // fontWeight={["300", "300", "400", "400"]}
        fontWeight="300"
      >
        <Text
          fontSize={["16px", "16px", "16px", "24px"]}
          lineHeight="30px"
          textTransform="uppercase"
        >
          {t("PrivacyPolicy.title")}
        </Text>

        <VStack
          mt={["24px", "24px", "36px", "36px"]}
          alignItems="flex-start"
          lineHeight="20px"
          gapY={0}
        >
          <Text
            fontSize="16px"
          >
            {t("PrivacyPolicy.description")}
          </Text>
          <Text
            fontWeight={["300", "300", "500", "500"]}
            fontSize="16px"
            mt={["16px", "16px", "24px", "24px"]}
            
          >
            1. {t("PrivacyPolicy.dataCOllection")}
          </Text>


          <Text
            fontSize="16px"
            mt={["24px", "24px", "12px", "12px"]}
          >
            <Box
              as="span"
              fontWeight={["300", "300", "500", "500"]}
            >
              {t("PrivacyPolicy.contactDetails.title")} 
            </Box>
            {t("PrivacyPolicy.contactDetails.text")}
          </Text> 
          <Box
            as="ul" 
            listStyleType="disc"
            _marker={{
              color: "red",
              fill: "black",
            }}
            fontSize="16px"
            mt={["16px", "16px", "24px", "24px"]}
            spaceY="24px"
            paddingInline="24px"
        
          >
            <li>{t("PrivacyPolicy.contactDetails.1")}</li>
            <li>{t("PrivacyPolicy.contactDetails.2")}</li>
          </Box>

          <Text fontSize="16px" mt="24px">
            <Box
              as="span"
              fontWeight={["300", "300", "500", "500"]}
            >
              {t("PrivacyPolicy.creditCardDetails.title")} 
            </Box>
            {t("PrivacyPolicy.creditCardDetails.text")}
          </Text> 

          <Box
            as="li"
            mt={["24px", "24px", "16px", "16px"]}
            fontWeight={["300", "300", "500", "500"]}
            fontSize="16px"
          >{t("PrivacyPolicy.newsletter.title")} </Box>

          <Text
            fontSize="16px"
            mt="16px"
          >
            {t("PrivacyPolicy.newsletter.text")}
          </Text>

        </VStack>
      </VStack>
    </Container>
  )
}
