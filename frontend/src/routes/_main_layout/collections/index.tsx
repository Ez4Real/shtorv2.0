import { CollectionsService } from "@/client"
import Collection from "@/components/Collection"
import { Container, Flex, Spinner, useBreakpointValue } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"


export const Route = createFileRoute("/_main_layout/collections/")({
  component: Collections,
})


function getCollectionsQueryOptions() {
  return {
    queryFn: () => CollectionsService.readCollections(),
    queryKey: ["collections"],
  }
}


function Collections() {
  const { data: collections, isPending } = useQuery({
    ...getCollectionsQueryOptions(),
  })

  const bannerBreakpoint = useBreakpointValue<"banner_mobile" | "banner_desktop">({
    base: "banner_mobile",
    lg: "banner_desktop",
  })

  return (
    <Container
      p={0}
      maxW="100vw"
      mb="132px"
    >
      {isPending ? (
        <Flex justify="center" align="center" height="100vh">
          <Spinner size="xl" saturate="1s" color="ui.main" />
        </Flex>
      ) : (
        collections?.data.map((collection, index) => (
          <Collection
            key={index}
            collection={collection}
            bannerBreakpoint={bannerBreakpoint ?? "banner_mobile"}
          />
        ))
      )}
    </Container>
  )
}
