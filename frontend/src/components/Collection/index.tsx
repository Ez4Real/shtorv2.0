import { Box, useBreakpointValue } from "@chakra-ui/react"
import { Link as RouterLink } from "@tanstack/react-router"


// !!!!!
// To REWRITE and REFACTOR
// Define Collection interface
// Passing params in interface:
//   1. 1 dynamic image url for mobile and desktop
//   2. Title 


const Collection = () => {
    const CollectionBanner1 = useBreakpointValue({
        base: "url(/assets/images/collect-mobile.svg)",  // для мобильных  
        lg: "url(/assets/images/collect-banner.svg)",  // для десктопов
    });

    return (
        <>
            <Box
                w="100%"
                h="100vh"
                backgroundImage={CollectionBanner1}
                backgroundSize="cover"
                backgroundPosition="top center"
                backgroundRepeat="no-repeat"
                position="relative"
                zIndex="1"
            >
                <RouterLink
                    to="/"
                >
                    <Box
                        className="underline-link"
                        position="absolute"
                        bottom={["24px", "24px", "75px", "75px"]}
                        left={["24px", "24px", "55px", "55px"]}
                        fontSize={["24px", "24px", "28px", "28px"]}
                        lineHeight={["30px", "30px", "35px", "35px"]}
                    >NATURE
                    </Box>
                </RouterLink>
            </Box>
        </>
    )
}

export default Collection