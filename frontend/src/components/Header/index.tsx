import { Box, Flex, HStack, Image } from "@chakra-ui/react"

import { Link as RouterLink, useRouterState } from "@tanstack/react-router"
import SwitchLocalizationMini from "../Common/SwitchLocalization/LanguageMini"
import MenuDialog from "../MenuDialog"
import CartDialog from "../CartDialog"

const Header = () => {
    const { location } = useRouterState()

    const absoluteHeaderPaths = ['/', '/collections/']
    const isHeaderAbsolute = absoluteHeaderPaths.includes(location.pathname)
    return (
      <>
        <Box
          as="header"
          position={isHeaderAbsolute ? ["relative", "relative", "relative", "absolute"] : "relative"}
          zIndex={isHeaderAbsolute ? "1" : "0" }
          w="full"
          p={["46px 16px", "46px", "46px", "46px"]}
        >
          <Flex
            h={["24px", "24px", "35px", "35px"]}
            alignItems="center"
            justifyContent="space-between"
          >
            <HStack>
              <MenuDialog />
            </HStack>

            <Flex
              position="absolute"
              inset={0}
              justify="center"
              align="center"
            >
              <Box w={["100px", "100px", "180px", "180px"]}>
                <RouterLink to="/" hash="root">
                  <Image
                    src="/assets/images/logo-black.svg"
                    w="100%"
                    h="auto"
                    alt="Shtor Logo"
                  />
                </RouterLink>
              </Box>
            </Flex>

            <Flex
              alignItems="center"
              gap="16px"
              fontWeight="300"
            >
              <SwitchLocalizationMini />
              <CartDialog />
            </Flex>

            
          </Flex>
        </Box>
      </>
    )
}

export default Header