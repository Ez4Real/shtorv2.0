import { CollectionsService, OpenAPI } from "@/client";
import Collection from "@/components/Collection"
import { Box, Container, useBreakpointValue } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Link as RouterLink } from "@tanstack/react-router"


export const Route = createFileRoute("/_main_layout/")({
  component: Main,
})


function getCollectionsQueryOptions() {
  return {
    queryFn: () => CollectionsService.readCollections(),
    queryKey: ["collections"],
  }
}


function Main() {
  const mainBanner = useBreakpointValue({
    base: "url(/assets/images/banner-mobile.svg)", 
    lg: "url(/assets/images/main-banner.svg)",  
  });

  const { data: collections, isPending } = useQuery({
    ...getCollectionsQueryOptions(),
  })

  const bannerBreakpoint = useBreakpointValue<"banner_mobile" | "banner_desktop">({
    base: "banner_mobile",
    lg: "banner_desktop",
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
        backgroundPosition="center top"
        backgroundRepeat="no-repeat"
        position="relative"
        mt="-35px"
      >
        <RouterLink
          to="/about-us"
          from="/"
          hash="root"
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

      {collections?.data.map((collection) => {
        const banner = collection[bannerBreakpoint ?? "banner_mobile"]

        return (
          <Collection
            key={collection.id}
            title={collection.title}
            bannerImagePath={`${OpenAPI.BASE}/media/${banner.url}`}
          />
        );
      })}
      
    </Container>
  )
}
