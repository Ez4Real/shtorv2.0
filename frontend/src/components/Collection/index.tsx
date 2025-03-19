import { Box } from "@chakra-ui/react"

const Collection = () => {
    const CollectionBanner1 = "/assets/images/collect-banner.svg"
    return (
        <>

            <Box
                w="100%"
                h="100vh"
                backgroundImage={`url(${CollectionBanner1})`}
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                position="relative"
                zIndex="-1"
            ><Box className="underline-link"
                position="absolute"
                bottom="75px"
                left="55px"
            >
                    About us
                </Box>
            </Box>
        </>
    )
}

export default Collection