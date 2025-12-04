import { CollectionPublic_Output, ProductPublic, ProductsService } from "@/client"
import { Box, Container, Flex, Grid, Spinner, Text, useBreakpointValue } from "@chakra-ui/react"
import { Link as RouterLink } from "@tanstack/react-router"
import { useQuery } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import Collection from "@/components/Collection"
import ProductCard from "@/components/Product/Card"


interface CollectionPreviewProps {
  collection: CollectionPublic_Output
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


const CollectionPreview = ({
    collection,
}: CollectionPreviewProps) => {
  const { t } = useTranslation()
  const bannerBreakpoint = useBreakpointValue<"banner_mobile" | "banner_desktop">({
    base: "banner_mobile",
    lg: "banner_desktop",
  })

  const { data: productsData, isPending: isProductsPending } = useQuery({
    ...getProductsQueryOptions({ collection_id: collection?.id ?? "" }),
    enabled: !!collection?.id,
  })
  
  const products = productsData?.data
  
  return (
    <>
      <Container
        my={["90px", "90px", "90px", "110px"]}
        p={["0px 16px", "0px 16px ", "0px 16px", "0 46px"]}
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

      <Collection
        collection={collection!}
        bannerBreakpoint={bannerBreakpoint ?? "banner_mobile"}
      />
      
    </>
  )
}

export default CollectionPreview