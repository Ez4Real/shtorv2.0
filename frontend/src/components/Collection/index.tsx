import { CollectionPublic, OpenAPI } from "@/client"
import { Box } from "@chakra-ui/react"
import { Link as RouterLink } from "@tanstack/react-router"


interface CollectionProps {
  collection: CollectionPublic
  bannerBreakpoint: "banner_mobile" | "banner_desktop"
}

const Collection = ({
    collection,
    bannerBreakpoint
}: CollectionProps) => {
  const bannerURL = collection[bannerBreakpoint].url
  
  return (
    <Box
      w="100%"
      h="100vh"
      backgroundImage={`url(${OpenAPI.BASE}/media/${bannerURL})`}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      position="relative"
      // zIndex="1"
    >
      <RouterLink
        from="/collections"
        to="/collections/$id"
        params={{ id: collection.id }}
        hash="root"
      >
        <Box
          className="underline-link"
          position="absolute"
          bottom={["24px", "24px", "46px", "46px"]}
          left={["24px", "24px", "55px", "55px"]}
          fontSize={["24px", "24px", "28px", "28px"]}
          lineHeight={["30px", "30px", "35px", "35px"]}
        >{ collection.title }
        </Box>
      </RouterLink>
    </Box>
  )
}

export default Collection