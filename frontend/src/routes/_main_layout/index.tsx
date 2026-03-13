import { CollectionsService } from "@/client"
import CollectionPreview from "@/components/Collection/preview"
import { chakra } from "@chakra-ui/react"
import { Box, Container } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
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
  const { data: collectionsData, isPending } = useQuery({
    ...getCollectionsQueryOptions(),
  })

  const collections = collectionsData?.data ?? []
  const firstCollection = collections[0]  
 
 const Video = chakra("video")

  return (
    <Container
      maxW="100vw"
      mb="238px"
      p={0}
    >
      <Box
        p={0}
        // p={["0px 16px", "0px 16px", "0px 16px", "0px"]}
        m={0}
      >
        <Box
          w={["100%", "100%", "100%", "100vw"]}
          h={["100%", "100%", "100%", "100vh"]}
          position={["initial", "initial", "relative", "relative"]}
          overflow="hidden"
          mt={["44px", "44px", "44px", 0]}
        >
          <Video
            src="/assets/videos/banner_preview.mov"
            autoPlay
            muted
            loop
            playsInline
            objectFit="cover"
            w="100%"
            h="100%"
            position={["static", "static", "static", "absolute"]}
            top={0}
            left={0}
            zIndex={-1}
          />

          { firstCollection?.id && (
            <RouterLink
              to="/collections/$id"
              params={{ id: firstCollection.id }}
              from="/"
              hash="root"
            >
              <Box
                padding={["0 16px", "0 16px", "0 16px", "0"]}
                className="underline-link"
                position={["static", "static", "static", "absolute"]}
                color="black"
                mt={["16px", "16px", "16px", "0"]}
                bottom="46px"
                left="46px"
                fontSize={["16px", "16px", "20px", "20px"]}
                fontWeight={["300", "300", "400", "400"]}
                textDecoration="underline"
                textDecorationThickness="0"
                textUnderlineOffset="2px"
              >
                {firstCollection?.title}
              </Box>
            </RouterLink>
          )}
        </Box>
      </Box>
      
      {!isPending && collections.map((collection) => (
        <CollectionPreview
          key={collection.id}
          collection={collection}
        />
      ))}      

    </Container>
  )
}
