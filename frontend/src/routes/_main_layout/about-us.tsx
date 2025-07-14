
import Breadcrumbs from "@/components/Common/Breadcrumbs"
import { Box, Flex, Image, Text, useBreakpointValue, VStack } from "@chakra-ui/react"
import { Link as RouterLink, createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"
import 'swiper/css'
import 'swiper/css/navigation'

export const Route = createFileRoute("/_main_layout/about-us")({
  component: AboutUs,
})


function AboutUs() {
  const { t } = useTranslation()

  const bannerSrc = useBreakpointValue({
    base: "assets/images/main-banner-mobile.svg",
    md: "assets/images/main-banner.svg",
  });

  return (
    <Box
      pb={["155px", "155px", "120px", "120px"]}
    >
        <Box 
          position="relative"
          pl={["16px", "16px", "48px", "48px"]}
          pr={["16px", "16px", "48px", "48px"]}
        >
          <Breadcrumbs
            items={[
              {name: t("AboutUs.title"), path: "/about-us"}
            ]}
          />
          <Image
            w="100vw"
            h="100%" 
            src={bannerSrc}
            backgroundSize="cover"
            backgroundPosition="center top"
            backgroundRepeat="no-repeat"
          />
          <Text 
            w="100%"
            mt={["24px", "24px", "60px", "60px"]}
            bottom={["14px", "14px", "5px", "5px"]}
            fontSize={["18px", "18px", "24px", "24px"]}
            fontWeight={["300", "300", "400", "400"]}
            textAlign={["center"]}
            textTransform="uppercase"
            >
            { t("AboutUs.ode") }
          </Text>
        </Box>
        <Box 
          mt={["16px", "16px", "24px", "24px"]} 
          mb={["16px", "16px", "60px", "60px"]} 
          pr={["16px", "16px", "46px", "46px"]}
          pl={["16px", "16px", "46px", "46px"]}
        >
          <Flex
            alignItems="flex-end"
            flexDirection={["column", "column", "unset", "unset"]}
            // pt={["46px", "46px", "60px", "60px"]}
            gap={["0", "0", "120px", "120px"]}
          >
            <Text
              flex={1}
              color="ui.main"
              fontWeight="300"
              fontSize={["14px", "14px", "16px", "16px"]}
            >
              {t("AboutUs.ludmila.1")}
            </Text>
            <Box flex={1}></Box>
          </Flex>
          <Flex
            mt={["12px", "12px", "24px", "24px"]}
            flexDirection={["column-reverse", "column-reverse", "unset", "unset"]}
            // pt={["46px", "46px", "60px", "60px"]}
            pb={["46px", "46px", "72px", "72px"]}
            gap={["24px", "24px", "120px", "120px"]}
            alignItems="flex-end"
          >
            <Image
                src="assets/images/about-us1.svg"
              />
            <Text
              color="ui.main" 
              fontWeight="300" 
              fontSize={["14px", "14px", "16px", "16px"]}
            >
              {t("AboutUs.ludmila.2")}
            </Text>
          </Flex>

          <Flex
            flexDirection={["column", "column", "unset", "unset"]}
          >
            <Flex
              flexDirection="column"
              gap={["46px", "46px", "60px", "60px"]}
              w={["100%", "100%", "50%", "50%"]}
            >
              <Flex
                flexDirection="column"
                gap={["32px", "32px", "12px", "12px"]}
              >
                <Image
                  display={["block", "block", "none", "none"]}
                  src="assets/images/about-us3.svg"
                  mb="4px"
                />
                <VStack
                  gap={["8px", "8px", "12px", "12px"]}
                >
                  <Text 
                    color="ui.main" 
                    fontWeight="300" 
                    fontSize={["14px", "14px", "16px", "16px"]}
                  >
                    {t("AboutUs.firstSteps.1")}
                  </Text>
                  <Text 
                    color="ui.main" 
                    fontWeight="300" 
                    fontSize={["14px", "14px", "16px", "16px"]}
                  >
                    {t("AboutUs.firstSteps.2")}
                  </Text>
                  <Text
                    color="ui.main"  
                    fontWeight="300" 
                    fontSize={["14px", "14px", "16px", "16px"]}
                  >
                    {t("AboutUs.firstSteps.3")}
                  </Text>
                </VStack>
              </Flex>

              <Image 
                src="assets/images/about-us2.svg"
              />
            </Flex>

            <Flex
              flexDirection="column"
              w={["100%", "100%", "50%", "50%"]}
              gap="60px"
              ml="59px"
            >
              <Image
                display={["none", "none", "block", "block"]}
                src="assets/images/about-us3.svg"
              />
              <Image src="assets/images/about-us4.svg"/>
            </Flex>
          </Flex>
        </Box>

        <Flex
          flexDirection={["column-reverse", "column-reverse", "column", "column"]}
        >
          <Image
            w="100vw"
            h="100%" 
            src="assets/images/about-us5.svg"
            backgroundSize="cover"
            backgroundPosition="center top"
            backgroundRepeat="no-repeat"
            mb={["46px", "46px", "60px", "60px"]}
            pr={["16px", "16px", "0", "0"]}
            pl={["16px", "16px", "0", "0"]}
          />

          <Box
            pr={["16px", "16px", "46px", "46px"]}
            pl={["16px", "16px", "46px", "46px"]}
          >
            <Flex
              flexDirection="column"
              gap="12px"
              w={["100%", "100%", "50%", "50%"]}
            >
              <Text 
                color="ui.main" 
                fontWeight="300" 
                fontSize={["14px", "14px", "16px", "16px"]}
              >
                {t("AboutUs.logoSymbol.1")}
              </Text>
              <Text 
                color="ui.main" 
                fontWeight="300" 
                fontSize={["14px", "14px", "16px", "16px"]}
              >
                {t("AboutUs.logoSymbol.2")}
              </Text>
              <Text
                color="ui.main"  
                fontWeight="300" 
                fontSize={["14px", "14px", "16px", "16px"]}
              >
                {t("AboutUs.logoSymbol.3")}
              </Text>
            </Flex>      
          </Box>
        </Flex>

        <Text 
          mt={["46px", "46px", "60px", "60px"]}
          w="100%"
          top={["0", "0", "36px", "36px"]}
          fontSize={["18px", "18px", "24px", "24px"]}
          textTransform="uppercase"
          textAlign={["left", "left", "center", "center"]}
          pl={["16px", "16px", "0", "0"]}
          >{t("AboutUs.manifest")}
        </Text>

        <Image
          mt={["32px", "32px", "46px", "46px"]} 
          w="100vw"
          h="100%" 
          src="assets/images/about-us6.svg"
          backgroundSize="cover"
          backgroundPosition="center top"
          backgroundRepeat="no-repeat"
          pr={["16px", "16px", "0", "0"]}
          pl={["16px", "16px", "0", "0"]}
          pt={["62px", "62px", "0", "0"]}
        />

        <Box 
          pr={["16px", "16px", "46px", "46px"]}
          pl={["16px", "16px", "46px", "46px"]}
          pt={["16px", "16px", "60px", "60px"]}
          pb={["46px", "46px", "60px", "60px"]}
        >
          <Flex 
            gap={["16px", "16px", "60px", "60px"]}
            flexDirection={["column", "column", "unset", "unset"]}
          >
            <Flex
              w={["100%", "100%", "50%", "50%"]}
            >
              <Image h="419px" src="assets/images/about-us7.svg"/>
            </Flex>

            <Flex
              flexDirection="column"
              w={["100%", "100%", "50%", "50%"]}
              gap={["16px", "16px", "60px", "60px"]}
            >
              <Image src="assets/images/about-us8.svg"/>
              <Image src="assets/images/about-us9.svg"/>
            </Flex>
          </Flex>
        </Box>

        <Text
          display={["block", "block", "none", "none"]}
          textAlign={["center", "center", "initial", "initial"]}
          fontSize="18px"
          fontWeight="300"
          textTransform="uppercase"
          lineHeight="30px"
          mb="46px"
          pl="16px"
          pr="16px"
        >
          {t("AboutUs.values.1")}
        </Text>

        <Image
          w="100vw"
          h="100%" 
          src="assets/images/about-us10.svg"
          backgroundSize="cover"
          backgroundPosition="center top"
          backgroundRepeat="no-repeat"
          mb={["16px", "16px", "103px", "103px"]}
          pr={["16px", "16px", "0", "0"]}
          pl={["16px", "16px", "0", "0"]}
        />

        <Box 
          pr={["16px", "16px", "46px", "46px"]}
          pl={["16px", "16px", "46px", "46px"]}
        >
          <Flex gap="120px">
            <Image 
              src="assets/images/about-us11.svg"
              mb={["16px", "16px", "0", "0"]}
            />
            <Flex
              flexDirection="column"
              w="50%"
              gap="60px"
              fontSize="24px"
              // fontWeight="300"
            >
              <Text
                display={["none", "none", "block", "block"]}
                fontSize="24px"
                // fontWeight="300"
                textTransform="uppercase"
                lineHeight="30px"
              >
                {t("AboutUs.values.1")}
              </Text>
            </Flex>
          </Flex>

          <Flex
            justifyContent="end"
          >
            <Image src="assets/images/about-us12.svg"/>
          </Flex>

          <Flex
            pt={["46px", "46px", "60px", "60px"]}
            flexDirection="column"
            justifyContent="center"
            alignItems={["right", "right", "center", "center"]}
          >
            <Text
              color="ui.main"  
              fontWeight={["300", "300", "400", "400"]}
              fontSize={["18px", "18px", "24px", "24px"]}
              mb={["46px", "46px", "24px", "24px"]}
              textTransform="uppercase"
            >
              {t("AboutUs.values.2")}
            </Text>
            <Image src="assets/images/about-us13.svg"/>
            <Text
              color="ui.main"  
              fontWeight={["300", "300", "400", "400"]}
              fontSize={["18px", "18px", "24px", "24px"]}
              mt={["16px", "16px", "24px", "24px"]}
              textTransform="uppercase"
            >
              {t("AboutUs.values.3")}
            </Text>
            <Box
              ml="auto"
              mt={["60px", "60px", "164px", "164px"]}
            >
              <RouterLink
                from="/"
                to="/collections/"
                hash="root"
              >
                <Text
                  textDecoration="underline"
                  fontWeight="300"
                  fontSize="18px"
                  lineHeight="22px"
                  transition=".1s"
                  textTransform="uppercase"
                  _hover={{
                    color: "ui.grey",
                    textDecoration: "none",
                  }}
                >
                  {t("AboutUs.collectionsLink")}
                </Text>
              </RouterLink>
            </Box>

          </Flex>
        </Box>
        
    </Box>
  )
}