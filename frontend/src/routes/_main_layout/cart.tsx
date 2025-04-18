import { Box, Button, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from 'react';

export const Route = createFileRoute("/_main_layout/cart")({
  component: Cart,
})

function Cart() {
    const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  return (
    <Box
      pt="81px"
      pb="74px"
      pr={["16px", "16px", "48px", "48px"]}
      pl={["16px", "16px", "48px", "48px"]}
    >
        <Flex
            textAlign="center"
            fontSize="32px"
            fontWeight="400"
            justifyContent="center"
            mr="25px"
            mb="56px"
        >
            Cart
        </Flex>
        <Flex
          gap="24px"
        >
            <Flex
              
            >
                <Image src="/assets/images/test-category.svg"/>
            </Flex>
            <Flex 
              flexDirection="column"
              w="40%"
            >
                <Flex
                  maxW="360px"
                  justifyContent="space-between"
                >
                    <Text
                      fontSize="16px"
                      fontWeight="400"
                      lineHeight="20px"
                      mb="16px"
                    >
                      GOLDEN RATIO/Spiral earrings
                    </Text>

                    <Image src="/assets/icons/close-btn.svg" w="24px" h="24px"/>
                </Flex>
                <Text
                  fontSize="16px"
                  fontWeight="400"
                  lineHeight="20px"
                  mb="12px"
                >
                  Silver
                </Text>
                <Text
                  fontSize="16px"
                  fontWeight="400"
                  lineHeight="20px"
                  mb="81px"
                >
                  Medium/5,5x2,5cm
                </Text>
                <Flex
                  justifyContent="space-between"
                  maxW="210px"
                >  
                    <HStack gap={0} h="20px">
                        <Button
                          onClick={handleDecrease}
                          variant="plain"
                          fontSize="16px"
                          fontWeight="400"
                          pl="0"
                          pr="10px"
                          border="none"
                        >
                            -
                        </Button>
                        <Text
                          fontSize="16px"
                          fontWeight="400"
                          w="20px"
                        >
                            {quantity}
                        </Text>
                        <Button 
                          onClick={handleIncrease}
                          variant="plain"
                          fontSize="16px"
                          fontWeight="400"
                          pl="10px"
                          border="none"
                        >
                            +
                        </Button>
                    </HStack>
                    
                    <Text
                      fontSize="18px"
                      lineHeight="23px"
                      fontWeight="400"
                    >
                        $90
                    </Text>
                </Flex>
            </Flex>
            <Flex
              flexDirection="column"
              w="363px"
              pl="40px"
            >
                <Text
                  fontSize="16px"
                  fontWeight="400"
                  lineHeight="20px"
                  mb="145px"
                >
                    Subtotal
                </Text>
                <Flex justifyContent="space-between" w="100%">
                    <Text
                      fontSize="16px"
                      fontWeight="400"
                      lineHeight="20px"
                    >
                        Total
                    </Text>
                    <Text
                      fontSize="18px"
                      lineHeight="23px"
                      fontWeight="400"
                    >
                        $90
                    </Text>
                </Flex>
                <Button
                  w="100%"
                  marginTop="24px"
                  color="ui.main"
                  backgroundColor="ui.white"
                  borderColor="ui.main"
                  borderRadius="0"
                  h="32px"
                >
                    Check Out
                </Button>
            </Flex>
        </Flex>
    </Box>
  )
}
