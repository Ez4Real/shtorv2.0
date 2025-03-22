import Collection from "@/components/Collection"
import { Box, Container, useBreakpointValue } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router";
import { Link as RouterLink } from "@tanstack/react-router"


export const Route = createFileRoute("/_main_layout/")({
  component: Main,
})


function Main() {
  const mainBanner = useBreakpointValue({
    base: "url(/assets/images/banner-mobile.svg)",  // для мобильных
    lg: "url(/assets/images/main-banner.svg)",  // для десктопов
  });

  return (
    <Container
      p={0}
      maxW="100vw"
    >
      <Box
        w="100vw"
        h="100vh"
        backgroundImage={mainBanner}
        backgroundSize="cover"
        backgroundPosition="top center"
        backgroundRepeat="no-repeat"
        position="relative"
        mt="-35px"
        zIndex="1"
      >
        <RouterLink
          to="/about-us"
        >
          <Box
            className="underline-link"
            position="absolute"
            bottom={["24px", "24px", "75px", "75px"]}
            left={["24px", "24px", "55px", "55px"]}
            fontSize={["24px", "24px", "28px", "28px"]}
            lineHeight={["30px", "30px", "35px", "35px"]}
          >About us
          </Box>
        </RouterLink>
      </Box>

      <Collection />
    </Container>
  )
}
