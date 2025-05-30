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
            fontSize={["24px", "24px", "32px", "32px"]}
            fontWeight="400"
            justifyContent="center"
            mr={["0", "0", "25px", "25px"]}
            ml={["14px", "14px", "0", "0"]}
            mb={["32px", "32px", "56px", "56px"]}
        >
            Cart
        </Flex>
        <Flex
          justifyContent="space-between"
          flexDirection={["column", "column", "column", "unset"]}
        >
            <Flex 
              justifyContent={["unset", "unset", "unset", "unset"]}
              gap={["16px", "16px", "24px", "24px"]}
            >
              <Image 
                src="/assets/images/test-category.svg" 
                w={["142px", "142px", "280px", "280px"]}
              />
              <Flex 
                flexDirection="column"
              >
                  <Flex
                    w={["100%", "100%", "100%", "360px"]}
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

                      <Image 
                        src="/assets/icons/close-btn.svg" 
                        w="24px" 
                        h="24px" 
                      />
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
                    maxW={["100%", "210px", "210px", "210px"]}
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
            </Flex>
            <Flex
              flexDirection="column"
              w={["100%", "100%", "100%", "363px"]}
              pl={["0", "0", "0", "40px"]}
              mt={["60px", "60px", "60px", "0"]}
            >
                <Text
                  fontSize="16px"
                  fontWeight="400"
                  lineHeight="20px"
                  mb={["24px", "24px", "24px", "145px"]}
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
