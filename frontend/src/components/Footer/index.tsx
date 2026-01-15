import { Box, Button, Flex, Group, Image, Input, Text, Link, useBreakpointValue } from "@chakra-ui/react"
import { Link as RouterLink } from "@tanstack/react-router"
import SwitchLocalizationSlash from "../Common/SwitchLocalization/LanguageCurrencyViaSlash"
import { useTranslation } from "react-i18next"

const Footer = () => {
  const { t } = useTranslation()

  const footerLinks = [
    { to: "/privacy-policy", text: t("Footer.privacyPolicy")},
    { to: "/payment-and-delivery", text: t("Footer.paymentAndDelivery")},
    { to: "/returns-and-exchange", text: t("Footer.returns")},
    { to: "/public-offer-agreement", text: t("Footer.publicOfferAgreement")},
    { to: "https://t.me/galashtor", text: t("Footer.chat")},
    { to: "/size-guide", text: t("Footer.sizeGuide")},
  ]

  const logo = useBreakpointValue({
    base: "logo-footer.png",
    md: "logo-footer.svg"
  })
  
  return (
    <Box 
      as="footer" 
      pb={["48px", "48px", "82px", "82px"]}
      px={["16px", "16px", "46px", "46px"]}
      >
      <Flex justifyContent="center">
        <RouterLink to="/">
          <Image
            src={`/assets/images/${logo}`}
            textAlign="center"
            // h={["75px", "67px", "150px", "225px", "235px"]}
            h="100%"
            w="100%"
            objectFit="cover"
            // mb={["24px", "24px", "59px", "59px"]}
          />
        </RouterLink>
      </Flex>
      <Flex
        justifyContent="space-between"
        alignItems="start"
        mt={["24px", "24px", "70px", "70px"]}
        flexDirection={{ base: "column", sm: "unset", md: "unset" }}
        gap={{ base: "42px", sm: "20px", md: "unset" }}
        // p={["0 8px", "0 16px", "0 46px", " 0 46px"]}
      >
        <Flex
          flexDirection="column"
          gap={["16px", "16px", "12px", "12px"]}
          w={["100%", "100%", "unset", "unset"]}
        >
          <Text
            fontSize={["14px", "14px", "16px", "16px"]}
            fontWeight="300"
          >
            {t("Footer.newsletterLabel")}
          </Text>
          <Group attached w={["100%", "100%", "373px", "373px"]}>
            <Input
              css={{ "--error-color": "ui.error" }} //css color for future error 
              placeholder="Email"
              border="0.5px solid #B3B3B3"
              borderColor={["#B3B3B3", "#B3B3B3", "#3A3A3A", "#3A3A3A"]}
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
                opacity={["60%", "#60%", "unset", "unset"]}
                src="/assets/icons/arrow-right.svg" 
              />
            </Button>
          </Group>
        </Flex>
        <Flex
          justifyContent="space-between"
          alignItems="flex-start"
          w={["100%", "60%", "40%", "40%"]}
          flexDirection={{ base: "row", sm: "column", md: "column", lg: "unset" }}
        >
          <Flex
            flexDirection="column"
            w="200px"
            alignItems={{ base: "flex-start", sm: "flex-end", md: "flex-end" }}
            gap={["8px", "8px", "12px", "12px"]}
          >
            {footerLinks?.map((link, index) => (
              <RouterLink
                to={link.to}
                key={index}
                hash="root"
              >
                <Text 
                  className="main-footer-link"
                  fontSize="16px"
                  fontWeight="300"
                  lineHeight="20px"
                  textAlign="right"
                >
                  {link.text}
                </Text>
              </RouterLink>
            ))}
          </Flex>
          <Flex
            flexDirection={{ base: "column-reverse", sm: "column", md: "column", lg: "column" }}
            gap={{ base: "8px", sm: "12px", md: "12px" }}
            alignItems="flex-end"
          >
            <SwitchLocalizationSlash />
            <Link 
              href="https://www.instagram.com/shtorsstore/"
              target="_blank"
              rel="noopener noreferrer"
              outline="none"
            >
              <Text
                fontSize={["16px", "16px", "20px", "20px"]}
                fontWeight={["300", "300", "500", "500"]}
                lineHeight={["20px", "25px", "25px", "25px"]}
                textDecoration={["unset", "underline"]}
                transition=".1s"
                _hover={{ 
                  color: "ui.grey", 
                  textDecoration: "none" 
                }}
              >
                INSTAGRAM
              </Text>
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
