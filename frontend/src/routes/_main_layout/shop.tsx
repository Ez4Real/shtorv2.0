import { ProductPublic, ProductsService } from "@/client"
import ProductCard from "@/components/Product/Card"
import { Box, Button, Center, Container, Flex, Grid, Image, Spinner, Text } from "@chakra-ui/react"
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
  // const logo = useBreakpointValue({
  //   base: "logo-black.png",
  //   md: "logo-black.svg"
  // })


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
      p={["0 16px", "0 16px", "0 46px", "0 46px"]}
    >
      {isProductsPending ? (
        <Flex justify="center" align="center" height="100vh">
          <Spinner size="xl" saturate="1s" color="ui.main" />
        </Flex>
      ) : products && products.length > 0 ? (
        <>
          <Grid
            templateColumns={[
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
            ]}
            gapX={["24px", "24px", "54px", "54px"]}
            gapY={["32px", "32px", "46px", "46px"]}
          >
            {products.map((product: ProductPublic) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
          <Center
            mt={["100px", "100px", "150px", "150px"]}
          >
            <Box
              onClick={() => setPage(page + 1)}
              gapY="9px"
              fontWeight="400"
              onAnimationEnd={() => setSeeMoreSpin(false)}
            >
              <Image
                src="/assets/icons/see-more.svg"
                animation={seeMoreSpin ? "spin 1.5s ease-in-out" : undefined}
                alt="See more icon"
                m="auto"
                // objectFit="contain"
                // w="100%"
              />
              <Text mt="16px">See More</Text>
            </Box>
          </Center>

          <Center
            mt={["100px", "100px", "150px", "150px"]}
          >
            <Box
              onClick={() => setPage(page + 1)}
              gapY="9px"
              fontWeight="400"
              onAnimationEnd={() => setSeeMoreSpin(false)}
            >
              <Image
                src="/assets/icons/see-more.png"
                animation={seeMoreSpin ? "spin 1.5s ease-in-out" : undefined}
                alt="See more icon"
                m="auto"
                // objectFit="contain"
                // w="100%"
              />
              <Text mt="16px">See More</Text>
            </Box>
          </Center>
        </>
      ) : null}
      
    </Container>
  )
}
