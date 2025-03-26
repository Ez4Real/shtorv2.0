import { Box } from "@chakra-ui/react"
import { Link as RouterLink } from "@tanstack/react-router"


interface CollectionProps {
  title: string
  bannerImagePath: string
}

const Collection = ({
    bannerImagePath,
    title
}: CollectionProps) => {
  return (
    <>
      <Box
        w="100%"
        h="100vh"
        backgroundImage={`url(${bannerImagePath})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        position="relative"
        zIndex="1"
      >
        <RouterLink to="/">
          <Box
            className="underline-link"
            position="absolute"
            bottom={["24px", "24px", "75px", "75px"]}
            left={["24px", "24px", "55px", "55px"]}
            fontSize={["24px", "24px", "28px", "28px"]}
            lineHeight={["30px", "30px", "35px", "35px"]}
          >{ title }
          </Box>
        </RouterLink>
      </Box>
    </>
  )
}

export default Collection