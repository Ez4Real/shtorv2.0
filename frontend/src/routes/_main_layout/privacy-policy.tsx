import { CollectionsService } from "@/client"
import { Box, Container, Flex, Grid, Spinner, Text, useBreakpointValue, VStack } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { Link as RouterLink } from "@tanstack/react-router"
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
      mb="238px"
      padding={["0 16px", "0 16px", "0 16px", "0 200px"]}
    >
      <VStack
        gap={0}
        fontWeight="300"
      >
        <Text
          fontSize="24px"
          lineHeight="30px"
          textTransform="uppercase"
        >
          {t("PrivacyPolicy.title")}
        </Text>

        <VStack
          mt={["24px", "24px", "36px", "36px"]}
          alignItems="flex-start"
          lineHeight="20px"
        >
          <Text
            fontSize="16px"
          >
            {t("PrivacyPolicy.description")}
          </Text>
          <Text
            fontWeight="500"
            fontSize="16px"
            mt={["16px", "16px", "24px", "24px"]}
            
          >
            1. {t("PrivacyPolicy.dataCOllection")}
          </Text>


          <Text>
            <Box as="span" >
              {t("PrivacyPolicy.contactDetails.title")}
            </Box>
            {t("PrivacyPolicy.contactDetails.text")}
          </Text> 
        </VStack>

      </VStack>

    </Container>
  )
}
