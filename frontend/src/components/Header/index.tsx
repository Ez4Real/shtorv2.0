import { Box, Flex, Image } from "@chakra-ui/react"
import BurgerMenu from "../Common/BurgerMenu"
import { Link as RouterLink, useRouterState } from "@tanstack/react-router"

const Header = () => {
    const { location } = useRouterState()
    const isHomepage = location.pathname === "/"

    return (
      <>
        <Box
          as="header"
          h="35px"
          position="relative"
          top={["61px", "61px", "46px", "46px"]}
          p={["0 16px", "0 16px", "0 46px", "0 46px"]}
          zIndex="1"
        >
          <Flex
            justifyContent="space-between"
            alignItems="center"
          >
            <BurgerMenu isOpen={false} isWhiteTheme={isHomepage} />

            <RouterLink 
              to="/"
              hash="root"
            >
              <Image
                src={`/assets/images/${
                  isHomepage ? "logo-white.svg" : "logo-black.svg"
                }`}
              />
            </RouterLink>

            <Flex
              alignItems="center"
              gap="16px"
              fontWeight="300"
            >
              <Box
                fontSize="20px"
                fontWeight="300"
                lineHeight="25px"
                display={["none", "none", "block", "block"]}
                color={isHomepage ? "ui.white": "ui.black"}
              >EN
              </Box>
              <Image src={`/assets/icons/${
                isHomepage ? "cart-header-white.svg" : "cart-header-black.svg"
                }`} />
            </Flex>
          </Flex>
        </Box>
      </>
    )
}

export default Header