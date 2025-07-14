import { GiftPublic, GiftsService, ProductPublic, ProductsService } from "@/client"
import Breadcrumbs from "@/components/Common/Breadcrumbs"
import GiftCard from "@/components/Gift/Card"
import ProductCard from "@/components/Product/Card"
import { Container, Flex, Grid, GridItem, Mark, Spinner, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"


export const Route = createFileRoute("/_main_layout/gifts/")({
  component: Gifts,
})

function getGiftsQueryOptions() {
  return {
    queryFn: () => GiftsService.readGifts(),
    queryKey: ["gifts"],
  }
}

function getGiftProductsQueryOptions() {
  return {
    queryFn: () => ProductsService.readProducts({
      isGift: true
    }),
    queryKey: ["products"]
  }
}



function Gifts() {
  const { t } = useTranslation()

  const { data: giftsData, isPending: isPendingGifts } = useQuery({
    ...getGiftsQueryOptions(),
  })

  const { data: productGiftsData, isPending: isPendingProductGifts } = useQuery({
    ...getGiftProductsQueryOptions(),
  })
  const gifts = giftsData?.data
  const productGifts = productGiftsData?.data
  console.log(productGiftsData);
  
  

  return (
    <Container
      p={0}
      maxW="100vw"
      mb={["250px", "250px", "140px", "140px"]}
      px={["16px", "16px", "46px", "46px"]}
    >
      <Breadcrumbs
        items={[
            {name: t("Gifts.title"), path: "/gifts"}
        ]}
      />
      <Flex
        alignItems={["baseline", "baseline", "flex-end", "flex-end"]}
      >
        <Text
          fontSize={["20px", "20px", "46px", "46px"]}
          lineHeight={["25px", "25px", "25px", "58px"]}
        >{t("Gifts.title")}
          <Mark
            mb={["0px", "0px", "12px", "12px"]}
            fontWeight={["300", "300", "400", "400"]}
            fontSize={["14px", "14px", "16px", "16px"]}
            px={["6px", "6px", "12px", "12px"]}
            lineHeight="20px"
          >
            {t("Gifts.description")}
          </Mark>
        </Text>
      </Flex>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)"]}
        gapX={["60px", "60px", "60px", "120px"]}
        gapY="60px"
        mt={["24px", "24px", "24px", "32px"]}
      >
        {isPendingGifts || isPendingProductGifts ? (
          <Flex justify="center" align="center" height="100vh">
            <Spinner size="xl" saturate="1s" color="ui.main" />
          </Flex>
        ) : (
          <>
            {gifts?.map((gift: GiftPublic, index: number) => (
              <GridItem key={index}>
                <GiftCard
                  gift={gift}
                  showPrice={!gift.dynamic_price}
                />
              </GridItem>
            ))}
            
            <GridItem />

            {productGifts?.map((product: ProductPublic, index: number) => (
              <GridItem key={index}>
                <ProductCard
                  product={product}
                />
              </GridItem>
            ))}
          </>
        )}
      </Grid>
    </Container>
  )
}
