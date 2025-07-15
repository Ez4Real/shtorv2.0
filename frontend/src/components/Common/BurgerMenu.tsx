import { Box, Flex } from "@chakra-ui/react"

interface BurgerMenuProps {
    isOpen: boolean
}

const BurgerMenu = ({
    isOpen
}: BurgerMenuProps) => {
    
    const barProps = {
      width: '24px',
      border: "1px solid black",
      backgroundColor: 'ui.main',
      display: 'block',
    }

    return (
      <Flex cursor="pointer">
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
      </Flex>
    )
}


export default BurgerMenu