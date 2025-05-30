import { Box, Button, Flex } from "@chakra-ui/react"

interface BurgerMenuProps {
    isWhiteTheme?: boolean
    isOpen: boolean
}

const BurgerMenu = ({
    isWhiteTheme = false,
    isOpen
}: BurgerMenuProps) => {
    const barProps = {
      width: '24px',
      border: "1px solid black",
      backgroundColor: 'ui.main',
      display: 'block',
    }

    return (
      <Flex>
        <Button
          variant="plain"
          p="0"
          h="35px"
        > 
          <Box>
            <Box
              {...barProps}
              mb="8px"
              animation={isOpen ? "translateTopToBottom" : "translateTopToBasic"}
            />
            <Box
              {...barProps}
              mb="8px"
            />
            <Box
              {...barProps}
              animation={isOpen ? "translateBottomToTop" : "translateBottomToBasic"}
            />
          </Box>
        </Button>
      </Flex>
    )
}


export default BurgerMenu