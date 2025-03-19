import { Box, Flex, Image } from "@chakra-ui/react"
import BurgerMenu from "../Common/BurgerMenu"

const Header = () => {
    const logo = "/assets/images/logo-white.svg"
    const cartIcon = "/assets/icons/cart-header-white.svg"
    return (
        <>
            <Box
                h="35px"
                position="relative"
                top="46px"
                p="0 46px"
            >
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <BurgerMenu isOpen={false} isWhiteTheme={true} />
                    <Box>
                        <Image
                            src={logo}
                        />
                    </Box>
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
                        >EN</Box>
                        <Image
                            src={cartIcon}
                        />
                    </Flex>
                </Flex>
            </Box>
        </>
    )
}

export default Header