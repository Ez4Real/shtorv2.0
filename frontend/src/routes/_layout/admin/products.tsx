import { useEffect, useRef } from "react"
import {
  Box,
  Container,
  EmptyState,
  Flex,
  Heading,
  HStack,
  Image,
  Table,
  VStack,
} from "@chakra-ui/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { FiSearch } from "react-icons/fi"
import { z } from "zod"

import { ApiError, OpenAPI, ProductsService, ProductsUpdateProductOrderData } from "@/client"
import { ProductActionsMenu } from "@/components/Common/Actions/ProductActionsMenu"
import AddProduct from "@/components/Products/AddProduct"
import PendingProducts from "@/components/Pending/PendingProducts"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination.tsx"
import { handleError, setupHorizontalScrollOnOverflow } from "@/utils"
import { useColorModeValue } from "@/components/ui/color-mode"
import ItemOrderControls from "@/components/Common/ItemOrderControls"
import { SubmitHandler, useForm } from "react-hook-form"

const productsSearchSchema = z.object({
  page: z.number().catch(1),
})

const PER_PAGE = 5

function getProductsQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      ProductsService.readProducts({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["products", { page }],
  }
}

export const Route = createFileRoute("/_layout/admin/products")({
  component: Products,
  validateSearch: (search) => productsSearchSchema.parse(search),
})

function ProductsTable() {
  const navigate = useNavigate({ from: Route.fullPath })
  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const scrollContainerRef = useRef<HTMLTableElement | null>(null)
  const scrollbarColor = useColorModeValue("ui.main", "ui.dim")

  const { data, isLoading, isPlaceholderData } = useQuery({
    ...getProductsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const methods = useForm<ProductsUpdateProductOrderData>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      id: "",
      formData: { order_shift: 0 }
    }
  })

  const setPage = (page: number) =>
    navigate({
      search: (prev: { [key: string]: number }) => ({ ...prev, page }),
    })

  const products = data?.data.slice(0, PER_PAGE) ?? []
  const count = data?.count ?? 0
  const minOrder = data?.min_order ?? 0
  const maxOrder = data?.max_order ?? 0

  const { reset } = methods

  const mutation = useMutation({
    mutationFn: (data: ProductsUpdateProductOrderData) =>
      ProductsService.updateProductOrder(data),
    onSuccess: () => {
      reset()
    },
    onError: (err: ApiError) => handleError(err),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })

  const onUpdateOrder: SubmitHandler<ProductsUpdateProductOrderData> = (data) => {
    mutation.mutate(data)
  }

  useEffect(() => {
    return setupHorizontalScrollOnOverflow(scrollContainerRef.current)
  }, [isLoading])

  if (isLoading) {
    return <PendingProducts />
  }

  if (products.length === 0) {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <FiSearch />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>You don't have any products yet</EmptyState.Title>
            <EmptyState.Description>
              Add a new product to get started
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    )
  }

  return (
    <>
      <Container
        ref={scrollContainerRef}
        css={{
          "&::-webkit-scrollbar-thumb": {
            background: scrollbarColor,
          }
        }}
        overflow="auto hidden"
        maxW="100%"
        whiteSpace="nowrap"
        display="block"
        paddingInline={0}
      >
        <Table.Root
          size={{ base: "sm", md: "md" }}
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>№</Table.ColumnHeader>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>Title</Table.ColumnHeader>
              <Table.ColumnHeader>Description</Table.ColumnHeader>
              <Table.ColumnHeader>Price</Table.ColumnHeader>
              <Table.ColumnHeader>Date | Time</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Images
              </Table.ColumnHeader>
              <Table.ColumnHeader></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {products?.map((product) => (
              <Table.Row key={product.id} opacity={isPlaceholderData ? 0.5 : 1}>
                <Table.Cell
                  p={0}
                  fontWeight="bold"
                >
                  <ItemOrderControls
                    item={product}
                    minOrder={minOrder}
                    maxOrder={maxOrder}
                    onUpdateOrder={onUpdateOrder}
                    getPayload={(item, direction) => ({
                      id: item.id,
                      formData: { order_shift: direction },
                    })}
                  />
                </Table.Cell>
                <Table.Cell>
                  {product.id}
                </Table.Cell>
                <Table.Cell>
                  {product.title_en}
                </Table.Cell>
                <Table.Cell
                  truncate 
                  maxW="xs"
                  whiteSpace="pre-line"
                >
                  <Box
                    maxH="100px"
                    overflow="hidden"
                    css={{
                      WebkitLineClamp: 5,
                      WebkitBoxOrient: "vertical",
                      display: "-webkit-box",
                    }}
                  >
                  {product.description_en}
                  </Box>
                </Table.Cell>
                <Table.Cell
                  truncate 
                  minW="100px"
                  whiteSpace="pre-line"
                >
                  <Box
                    maxH="100px"
                    overflow="hidden"
                    whiteSpace="pre-line"
                    fontFamily="inherit"
                    fontSize="sm"
                  >
                    UAH - {product.price_uah} {"\n"}
                    USD - {product.price_usd} {"\n"}
                    EUR - {product.price_eur}
                  </Box>
                </Table.Cell>
                <Table.Cell>
                  {new Date(product.created_at as string).toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  <HStack gap={1}>
                    {product.images && product.images.length > 0
                      ? product.images.slice(0, 4).map((img, index) => (
                          <Box key={index}>
                            <Image
                              src={`${OpenAPI.BASE}/media/${img.url}`}
                              boxSize="100px"
                              minW="100px"
                              objectFit="cover"
                              borderRadius="md"
                            />
                          </Box>
                        ))
                      : "N/A"}
                  </HStack>
                </Table.Cell>

                <Table.Cell p="1rem .25rem !important">
                  <ProductActionsMenu product={product} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Container>
      <Flex justifyContent="flex-end" mt={4}>
        <PaginationRoot
          count={count}
          pageSize={PER_PAGE}
          onPageChange={({ page }) => setPage(page)}
        >
          <Flex>
            <PaginationPrevTrigger />
            <PaginationItems />
            <PaginationNextTrigger />
          </Flex>
        </PaginationRoot>
      </Flex>
    </>
  )
}

function Products() {
  return (
    <Container
      p={0}
      maxW="full"
    >
      <Box
        paddingInline="2rem"
      >
        <Heading
          size="lg"
          pt={2}
          textAlign={["center", "center", "start", "start"]}
        >Products Management
        </Heading>
        <AddProduct />
      </Box>
      <ProductsTable />
    </Container>
  )
}
