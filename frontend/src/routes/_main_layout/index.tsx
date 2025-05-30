import { CollectionsService } from "@/client"
import Collection from "@/components/Collection"
import ProductCard from "@/components/Product/Card"
import { Box, Container, Flex, Grid, Spinner, Text, useBreakpointValue } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { Link as RouterLink } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"


export const Route = createFileRoute("/_main_layout/")({
  component: Main,
})

function getCollectionQueryOptions({ order }: { order: number }) {
  return {
    queryFn: () => CollectionsService.readCollectionByOrder({ order }),
    queryKey: ["collections", { order }]
  }
}


function Main() {
  const { t } = useTranslation()
  const collectionOrder = 1
  
  // !!!!!
  const { data: collection, isPending } = useQuery({
    ...getCollectionQueryOptions({ order: collectionOrder }),
  })
  
  const mainBanner = useBreakpointValue({
    base: "url(/assets/images/banner-mobile.svg)", 
    lg: "url(/assets/images/main-banner.svg)",  
  })


  const bannerBreakpoint = useBreakpointValue<"banner_mobile" | "banner_desktop">({
    base: "banner_mobile",
    lg: "banner_desktop",
  })


  return (
    <Container
      p={0}
      maxW="100vw"
      mb="238px"
    >
      <Box
        w="100vw"
        h="100vh"
        backgroundImage={mainBanner}
        backgroundSize="cover"
        backgroundPosition="center top"
        backgroundRepeat="no-repeat"
        position="relative"
        mt="-35px"
      >
        <RouterLink
          to="/about-us"
          from="/"
          hash="root"
        >
          <Box
            className="underline-link"
            position="absolute"
            bottom={["24px", "24px", "75px", "75px"]}
            left={["24px", "24px", "55px", "55px"]}
            fontSize={["24px", "24px", "28px", "28px"]}
            lineHeight={["30px", "30px", "35px", "35px"]}
          >About us
          </Box>
        </RouterLink>
      </Box>

      <Container
        mt="110px"
        mb="110px"
        p="0 46px"
      >
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap="54px"
        >
          <ProductCard title="Bracelet-pendant" price="$125" />
          <ProductCard title="Bracelet-pendant" price="$125" />
          <ProductCard title="Bracelet-pendant" price="$125" />
          <ProductCard title="Bracelet-pendant" price="$125" />
          <ProductCard title="Bracelet-pendant" price="$125" />
          <ProductCard title="Bracelet-pendant" price="$125" />
        </Grid>

        <Box mt="60px">
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
              textAlign="end"
              _hover={{
                color: "ui.grey",
                textDecoration: "none",
              }}
            >
              {t("Homepage.allCollections")}
            </Text>
          </RouterLink>
        </Box>
      </Container>

      {isPending ? (
        <Flex justify="center" align="center" height="100vh">
          <Spinner size="xl" saturate="1s" color="ui.main" />
        </Flex>
      ) : (
        <Collection
          collection={collection!}
          bannerBreakpoint={bannerBreakpoint ?? "banner_mobile"}
        />
      )}

      
    </Container>
  )
}
