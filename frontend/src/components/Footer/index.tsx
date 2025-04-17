import { Box, Button, Flex, Group, Image, Input, Text } from "@chakra-ui/react";
import { Link as RouterLink, useRouterState } from "@tanstack/react-router";

const Footer = () => {
  const { location } = useRouterState()
  const isHomepage = location.pathname === "/"
  return (
    <Box 
      display={isHomepage ? "none" : "block" }
      as="footer" 
      pb={["78px", "78px", "112px", "112px"]}>
      <Flex justifyContent="center">
        <RouterLink to="/">
          <Image
            src="/assets/images/logo-footer.svg"
            textAlign="center"
            h={["70px", "67px", "150px", "225px", "231px"]}
            mb={["36px", "36px", "66px", "66px"]}
          />
        </RouterLink>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="start"
        flexDirection={{ base: "column", sm: "unset", md: "unset" }}
        gap={{ base: "32px", sm: "20px", md: "unset" }}
        p={["0 16px", "0 16px", "0 46px", " 0 46px"]}
      >
        <Flex
          flexDirection="column"
          gap="16px"
          w={["100%", "100%", "unset", "unset"]}
        >
          <Text
            fontSize="16px"
            fontWeight="400"
            mb={["14px", "14px", "0", "0"]}
          >
            Будь в курсі випусків і спеціальних подій
          </Text>
          <Group attached w={["100%", "100%", "373px", "373px"]}>
            <Input
              css={{ "--error-color": "ui.error" }} //css color for future error 
              placeholder="Email"
              border="0.5px solid #B3B3B3"
              borderRadius="0"
              opacity="80%"
              fontFamily="'Lexend', sans-serif"
              fontWeight="300"
              pl="21px"
              pr="60px"
              position="relative"
            />
            <Button
              variant="plain"
              h="24px"
              p="0"
              position="absolute"
              right="13px"
            >
              <Image 
                opacity="60%" 
                src="/assets/icons/arrow-right.svg" 
              />
            </Button>
          </Group>
        </Flex>
        <Flex
          justifyContent="space-between"
          alignItems="end"
          w={["100%", "60%", "40%", "40%"]}
          flexDirection={{ base: "row", sm: "column", md: "column", lg: "unset" }}
        >
          <Flex
            flexDirection="column"
            alignItems={{ base: "flex-start", sm: "flex-end", md: "flex-end" }}
            gap={["8px", "8px", "12px", "12px"]}
          >
            <RouterLink to="/">
              <Text 
                className="main-footer-link"
                fontSize="16px"
                fontWeight="400"
                lineHeight="20px"
                textAlign="right"
              >
                Політика Конфіденційності
              </Text>
            </RouterLink>
            <RouterLink to="/">
              <Text 
                className="main-footer-link"
                fontSize="16px"
                fontWeight="400"
                lineHeight="20px"
                textAlign="right"
              >
                Оплата і доставка
              </Text>
            </RouterLink>
            <RouterLink to="/">
              <Text 
                className="main-footer-link"
                fontSize="16px"
                fontWeight="400"
                lineHeight="20px"
                textAlign="right"
              >
                Повернення та обмін
              </Text>
            </RouterLink>
            <RouterLink to="/">
              <Text 
                className="main-footer-link"
                fontSize="16px"
                fontWeight="400"
                lineHeight="20px"
                textAlign="right"
              >
                Чат
              </Text>
            </RouterLink>
          </Flex>
          <Flex
            flexDirection={{ base: "column-reverse", sm: "column", md: "column", lg: "column" }}
            gap={{ base: "12px", sm: "24px", md: "24px" }}
            alignItems="flex-end"
          >
            <RouterLink to="/">
              <Text
                fontSize={["14px", "14px", "20px", "20px"]}
                fontWeight={["300", "300", "400", "400"]}
                lineHeight={["15px", "25px", "25px", "25px"]}
              >
                UA/UAH
              </Text>
            </RouterLink>
            <RouterLink 
              to="/"
            >
              <Text
                fontSize={["16px", "16px", "20px", "20px"]}
                fontWeight={["300", "300", "500", "500"]}
                lineHeight={["21px", "25px", "25px", "25px"]}
                textDecoration={["unset", "underline"]}
                transition=".1s"
                _hover={{ 
                  color: "ui.grey", 
                  textDecoration: "none" 
                }}
              >
                INSTAGRAM
              </Text>
            </RouterLink>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
