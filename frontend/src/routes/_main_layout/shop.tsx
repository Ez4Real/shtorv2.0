import { ProductPublic, ProductsService } from "@/client"
import ProductCard from "@/components/Product/Card"
import { AspectRatio, Button, Center, Container, Flex, Grid, Image, Spinner } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { z } from "zod"

const productsSearchSchema = z.object({
  page: z.number().catch(1),
  category_id: z.string().optional(),
  collection_id: z.string().optional(),
})

export const Route = createFileRoute("/_main_layout/shop")({
  component: Shop,
  validateSearch: (search) => productsSearchSchema.parse(search),
})

const PER_PAGE = 6   

function getProductsQueryOptions({ page, category_id, collection_id }: {
  page: number,
  category_id: string | undefined,
  collection_id: string | undefined
}) {
  return {
    queryFn: () =>
      ProductsService.readProducts({
        limit: PER_PAGE * page,
        categoryId: category_id,
        collectionId: collection_id
      }),
    queryKey: ["products", { page, category_id, collection_id }],
  }
}

// function getGiftsQueryOptions({}: {
//   page: number,
//   category_id: string | undefined,
//   collection_id: string | undefined
// }) {
//   return {
//     queryFn: () =>
//       GiftsService.readGifts(),
//     queryKey: ["gifts"],
//   }
// }


function Shop() {
  const navigate = useNavigate({ from: Route.fullPath })
  const { page, category_id, collection_id } = Route.useSearch()
  const [seeMoreSpin, setSeeMoreSpin] = useState<boolean>(false)

  const { data: productsData, isPending: isProductsPending } = useQuery({
    ...getProductsQueryOptions({
      page, category_id, collection_id
    }),
    placeholderData: (prevData) => prevData,
  })
  // const { data: giftsData, isPending: isGiftsPending } = useQuery({
  //   ...getProductsQueryOptions({
  //     page, category_id, collection_id
  //   }),
  //   placeholderData: (prevData) => prevData,
  // })

  const products = productsData?.data
  // const gifts = productsData?.data

  const setPage = (page: number) => {
    setSeeMoreSpin(true)
    navigate({
      search: (prev) => ({ ...prev, page })
    })
  }


  return (
    <Container
      maxW="100vw"
      mb="238px"
      p="0 46px"
    >
      {isProductsPending ? (
        <Flex justify="center" align="center" height="100vh">
          <Spinner size="xl" saturate="1s" color="ui.main" />
        </Flex>
      ) : products && products.length > 0 ? (
        <>
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
            ]}
            gap={["60px", "60px", "24px", "54px"]}
          >
            {products.map((product: ProductPublic) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
          <Center mt="280px">
            <Button
              variant="ghost"
              onClick={() => setPage(page + 1)}
              display="flex"
              flexDirection="column"
              gapY="9px"
              fontSize="16px"
              fontWeight="400"
              onAnimationEnd={() => setSeeMoreSpin(false)}
              outline="none"
              bg="none"
            >
              <AspectRatio ratio={27 / 19}>
                <Image
                  src="/assets/icons/see-more.svg"
                  animation={seeMoreSpin ? "spin 1.5s ease-in-out" : undefined}
                  alt="See more icon"
                  objectFit="contain"
                />
              </AspectRatio>
            </Button>
          </Center>
        </>
      ) : null}
      
    </Container>
  )
}
