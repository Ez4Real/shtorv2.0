import { useEffect, useRef } from "react"
import {
  Container,
  EmptyState,
  Flex,
  Heading,
  Table,
  VStack,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { FiSearch } from "react-icons/fi"
import { z } from "zod"

import { ProductsService } from "@/client"
import { ProductActionsMenu } from "@/components/Common/Actions/ProductActionsMenu"
import AddProduct from "@/components/Products/AddProduct"
import PendingProducts from "@/components/Pending/PendingProducts"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination.tsx"
import { setupHorizontalScrollOnOverflow } from "@/utils"
import { useColorModeValue } from "@/components/ui/color-mode"

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
  const { page } = Route.useSearch()
  const scrollContainerRef = useRef<HTMLTableElement | null>(null)
  const scrollbarColor = useColorModeValue("ui.main", "ui.dim")

  const { data, isLoading, isPlaceholderData } = useQuery({
    ...getProductsQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const setPage = (page: number) =>
    navigate({
      // search: (prev: { [key: string]: string }) => ({ ...prev, page }),
      search: (prev: { [key: string]: number }) => ({ ...prev, page }),
    })

  const products = data?.data.slice(0, PER_PAGE) ?? []
  const count = data?.count ?? 0

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
      >
        <Table.Root
          size={{ base: "sm", md: "md" }}
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader w="sm">ID</Table.ColumnHeader>
              <Table.ColumnHeader w="sm">Title</Table.ColumnHeader>
              <Table.ColumnHeader w="sm">Description</Table.ColumnHeader>
              <Table.ColumnHeader w="sm">Actions</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {products?.map((product) => (
              <Table.Row key={product.id} opacity={isPlaceholderData ? 0.5 : 1}>
                <Table.Cell truncate maxW="sm">
                  {product.id}
                </Table.Cell>
                <Table.Cell truncate maxW="sm">
                  {product.title}
                </Table.Cell>
                <Table.Cell
                  color={!product.description ? "gray" : "inherit"}
                  truncate
                  maxW="30%"
                >
                  {product.description || "N/A"}
                </Table.Cell>
                <Table.Cell>
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
    <Container maxW="full">
      <Heading
        size="lg"
        pt={2}
        textAlign={["center", "center", "start", "start"]}
      >
        Products Management
      </Heading>
      <AddProduct />
      <ProductsTable />
    </Container>
  )
}
