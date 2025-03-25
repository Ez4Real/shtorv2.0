import { Box, Button, Flex, Group, Image, Input, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "@tanstack/react-router";

const Footer = () => {
  return (
    <Box pb={["92px", "92px", "112px", "112px"]}>
      <Flex justifyContent="center">
        <RouterLink to="/">
          <Image
            src="/assets/images/logo-footer.svg"
            textAlign="center"
            h={["75px", "67px", "150px", "225px", "245px"]}
            mb={["24px", "24px", "59px", "59px"]}
          />
        </RouterLink>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="start"
        flexDirection={{ base: "column", sm: "unset", md: "unset" }}
        gap={{ base: "42px", sm: "20px", md: "unset" }}
        p={["0 8px", "0 16px", "0 46px", " 0 46px"]}
      >
        <Flex
          flexDirection="column"
          gap="16px"
        >
          <Text
            fontSize="16px"
            fontWeight="400"
          >
            Будь в курсі випусків і спеціальних подій
          </Text>
          <Group attached w={["100%", "100%", "373px", "373px"]}>
            <Input
              placeholder="Email"
              border="0.5px solid #3A3A3A"
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
              <Image src="/assets/icons/arrow-right.svg" />
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
            gap={{ base: "16px", sm: "12px", md: "12px" }}
          >
            <RouterLink to="/">
              <Text
                fontSize="16px"
                fontWeight="400"
                lineHeight="20px"
              >
                Політика Конфіденційності
              </Text>
            </RouterLink>
            <RouterLink to="/">
              <Text
                fontSize="16px"
                fontWeight="400"
                lineHeight="20px"
              >
                Оплата і доставка
              </Text>
            </RouterLink>
            <RouterLink to="/">
              <Text
                fontSize="16px"
                fontWeight="400"
                lineHeight="20px"
              >
                Повернення та обмін
              </Text>
            </RouterLink>
            <RouterLink to="/">
              <Text
                fontSize="16px"
                fontWeight="400"
                lineHeight="20px"
              >
                Чат
              </Text>
            </RouterLink>
          </Flex>
          <Flex
            flexDirection={{ base: "column-reverse", sm: "column", md: "column", lg: "column" }}
            gap={{ base: "16px", sm: "24px", md: "24px" }}
            alignItems="flex-end"
          >
            <RouterLink to="/">
              <Text
                fontSize={["12px", "20px", "20px", "20px"]}
                fontWeight={["500", "400", "400", "400"]}
                lineHeight={["15px", "25px", "25px", "25px"]}
              >
                UA/UAH
              </Text>
            </RouterLink>
            <RouterLink to="/">
              <Text
                fontSize="20px"
                fontWeight="500"
                lineHeight={["21px", "25px", "25px", "25px"]}
                textDecoration="underline"
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
