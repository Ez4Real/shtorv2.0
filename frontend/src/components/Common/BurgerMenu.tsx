import { Box, Button, Flex } from "@chakra-ui/react"
interface BurgerMenuProps {
    isWhiteTheme?: boolean
    isOpen: boolean
    //   toggleMenu: () => void
}

const BurgerMenu = ({
    isWhiteTheme = false,
    isOpen,
    //   toggleMenu
}: BurgerMenuProps) => {

    // const TranslateTopToBottom = keyframes`
    //   0% { transform: translateY(0); }
    //   100% { transform: translateY(6px); }
    // `;

    // const TranslateTopToBasic = keyframes`
    //   0% { transform: translateY(6px); }
    //   100% { transform: translateY(0); }
    // `;

    // const TranslateBottomToTop = keyframes`
    //   0% { transform: translateY(0); }
    //   100% { transform: translateY(-6px); }
    // `;

    // const TranslateBottomToBasic = keyframes`
    //   0% { transform: translateY(-6px); }
    //   100% { transform: translateY(0); }
    // `;

    const barProps = {
        width: '18px',
        height: '2px',
        backgroundColor: isWhiteTheme ? 'white' : 'black',
        display: 'block',
        mb: '4px',
    };

    return (
        <Flex>
            <Button
                variant="plain"
                p="0"
                h="35px">
                <Box>
                    <Box
                        {...barProps}
                        as="span"
                    // animation={`
                    //     ${isOpen ? TranslateTopToBottom : TranslateTopToBasic}
                    //     0.3s forwards
                    // `}
                    />
                    <Box
                        {...barProps}
                        as="span"
                    />
                    <Box
                        {...barProps}
                        as="span"
                    // animation={`
                    //     ${isOpen ? TranslateBottomToTop : TranslateBottomToBasic}
                    //     0.3s forwards
                    // `}
                    />
                </Box>
            </Button>
        </Flex>
    );
};


export default BurgerMenu;