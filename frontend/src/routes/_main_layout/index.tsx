import { CollectionsService, ProductPublic, ProductsService } from "@/client"
import Collection from "@/components/Collection"
import ProductCard from "@/components/Product/Card"
import { chakra } from "@chakra-ui/react"
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

const PER_PAGE = 6

function getProductsQueryOptions({ collection_id }: { collection_id: string }) {
  return {
    queryFn: () => ProductsService.readProductsByCollection({
      id: collection_id,
      skip: 0,
      limit: PER_PAGE
    }),
    queryKey: ["products", { collection_id }]
  }
}


function Main() {
  const { t } = useTranslation()
    const bannerBreakpoint = useBreakpointValue<"banner_mobile" | "banner_desktop">({
    base: "banner_mobile",
    lg: "banner_desktop",
  })
  const collectionOrder = 1
  
  const { data: collection, isPending: isCollectionPending } = useQuery({
    ...getCollectionQueryOptions({ order: collectionOrder }),
  })

  const { data: productsData, isPending: isProductsPending } = useQuery({
    ...getProductsQueryOptions({ collection_id: collection?.id ?? "" }),
    enabled: !!collection?.id,
 })
  
 const products = productsData?.data
 
 const Video = chakra("video")

  return (
    <Container
      maxW="100vw"
      mb="238px"
      p={0}
    >
      <Box
        p={["0px 16px", "0px 16px", "0px 16px", "0px"]}
        m={0}
      >
        <Box
          w={["100%", "100%", "100%", "100vw"]}
          h={["100%", "100%", "100%", "100vh"]}
          position={["initial", "initial", "relative", "relative"]}
          overflow="hidden"
          mt={["44px", "44px", "44px", 0]}
        >
          <Video
            src="/assets/videos/banner_preview.mov"
            autoPlay
            muted
            loop
            playsInline
            objectFit="cover"
            w="100%"
            h="100%"
            position={["static", "static", "static", "absolute"]}
            top={0}
            left={0}
            zIndex={-1}
          />

          { collection?.id && (
            <RouterLink
              to="/collections/$id"
              params={{ id: collection.id }}
              from="/"
              hash="root"
            >
              <Box
                className="underline-link"
                position={["static", "static", "static", "absolute"]}
                color={["black", "black", "black", "white"]}
                mt={["16px", "16px", "16px", "0"]}
                bottom="46px"
                left="46px"
                fontSize="16px"
                textDecoration="underline"
                textDecorationThickness="0"
                textUnderlineOffset="2px"
              >
                {collection?.title}
              </Box>
            </RouterLink>
          )}
        </Box>

        <Container
          my={["90px", "90px", "90px", "110px"]}
          p={["0", "0", "0", "0 46px"]}
        >
          
          {isProductsPending ? (
            <Flex justify="center" align="center" height="100vh">
              <Spinner size="xl" saturate="1s" color="ui.main" />
            </Flex>
          ) : (
            <Grid
              templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
              gapX={["24px", "24px", "54px", "54px"]}
              gapY={["32px", "32px", "46px", "46px"]}
            >
              {products?.map((product: ProductPublic, index: number) => (
                <ProductCard key={index} product={product}/>
              ))}
            </Grid>
          )}

          <Box
            mt={["46px", "46px", "46px", "60px"]}
          >
            <RouterLink
              from="/"
              to="/collections/"
              hash="root"
            >
              <Text
                textDecoration="underline"
                fontWeight="300"
                fontSize={["16px", "16px", "18px", "18px"]}
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
      </Box>

      {isCollectionPending ? (
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
