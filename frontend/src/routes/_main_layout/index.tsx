import Collection from "@/components/Collection"
import { Box, Container, Image } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main_layout/")({
  component: Main,
})


function Main() {
  const mainBanner = "/assets/images/main-banner.svg"

  return (
    <Container
      p={0}
    >
      <Box
        w="100%"
        h="100vh"
        backgroundImage={`url(${mainBanner})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        position="relative"
        mt="-35px"
        zIndex="-1"
      ><Box className="underline-link"
        position="absolute"
        bottom="75px"
        left="55px"
      >
          About us
        </Box>
      </Box>

      <Collection />
    </Container>
  )
}
