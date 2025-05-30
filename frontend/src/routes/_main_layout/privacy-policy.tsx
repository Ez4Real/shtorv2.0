import { CollectionsService } from "@/client"
import { Box, Container, Flex, Grid, Spinner, Text, useBreakpointValue } from "@chakra-ui/react"
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
    >

    </Container>
  )
}
