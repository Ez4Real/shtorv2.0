import { Box, Flex, Image } from "@chakra-ui/react"
import BurgerMenu from "../Common/BurgerMenu"
import { Link as RouterLink } from "@tanstack/react-router"

const Header = () => {
    return (
      <>
        <Box
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
            <BurgerMenu isOpen={false} isWhiteTheme={true} />
            <RouterLink to="/">
              <Image
                h={["19px", "19px", "32px", "32px"]}
                src="/assets/images/logo-white.svg"
              />
            </RouterLink>
            <Flex
              alignItems="center"
              gap="16px"
              fontWeight="300"
            >
              <Box
                color="ui.white"
                fontSize="20px"
                fontWeight="300"
                lineHeight="25px"
                display={["none", "none", "block", "block"]}
              >EN</Box>
              <Image src="/assets/icons/cart-header-white.svg" />
            </Flex>
          </Flex>
        </Box>
      </>
    )
}

export default Header