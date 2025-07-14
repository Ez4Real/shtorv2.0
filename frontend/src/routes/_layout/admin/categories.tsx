import { useEffect, useRef } from "react"
import {
    Box,
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

import { CategoriesService } from "@/client"
// import { CategoryActionMenu } from "@/components/Common/Actions/CategoryActionMenu"
// import AddCategory from "@/components/Category/AddProduct"
import PendingCategories from "@/components/Pending/PendingCategories"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination.tsx"
import { setupHorizontalScrollOnOverflow } from "@/utils"
import { useColorModeValue } from "@/components/ui/color-mode"
import { CategoryActionsMenu } from "@/components/Common/Actions/CategoryActionsMenu"
import AddCategory from "@/components/Categories/AddCategory"

const categoriesSearchSchema = z.object({
  page: z.number().catch(1),
})

const PER_PAGE = 8

function getCategoryQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      CategoriesService.readCategories({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["categories", { page }],
  }
}

export const Route = createFileRoute("/_layout/admin/categories")({
  component: Category,
  validateSearch: (search) => categoriesSearchSchema.parse(search),
})

function CategoryTable() {
  const navigate = useNavigate({ from: Route.fullPath })
  const { page } = Route.useSearch()
  const scrollContainerRef = useRef<HTMLTableElement | null>(null)
  const scrollbarColor = useColorModeValue("ui.main", "ui.dim")

  const { data, isLoading, isPlaceholderData } = useQuery({
    ...getCategoryQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const setPage = (page: number) =>
    navigate({
      search: (prev: { [key: string]: number }) => ({ ...prev, page }),
    })

  const categories = data?.data.slice(0, PER_PAGE) ?? []
  const count = data?.count ?? 0
  

  useEffect(() => {
    return setupHorizontalScrollOnOverflow(scrollContainerRef.current)
  }, [isLoading])

  if (isLoading) {
    return <PendingCategories />
  }

  if (categories.length === 0) {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <FiSearch />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>You don't have any categories yet</EmptyState.Title>
            <EmptyState.Description>
              Add a new category to get started
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
        p={0}
      >
        <Table.Root
          size={{ base: "sm", md: "md" }}
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>ID</Table.ColumnHeader>
              <Table.ColumnHeader>Title EN</Table.ColumnHeader>
              <Table.ColumnHeader>Title UA</Table.ColumnHeader>
              <Table.ColumnHeader>Date | Time</Table.ColumnHeader>
              <Table.ColumnHeader></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {categories?.map((category) => (
              <Table.Row key={category.id} opacity={isPlaceholderData ? 0.5 : 1}>
                <Table.Cell>
                  {category.id}
                </Table.Cell>
                <Table.Cell>
                  {category.title_en}
                </Table.Cell>
                <Table.Cell>
                  {category.title_uk}
                </Table.Cell>
                <Table.Cell truncate maxWidth="50%">
                  {new Date(category.created_at as string).toLocaleString()}
                </Table.Cell>
                <Table.Cell
                  p="1rem .25rem !important"
                >
                  <CategoryActionsMenu category={category} />
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

function Category() {
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
        >Category Management
        </Heading>
        <AddCategory />
      </Box>
      <CategoryTable />
    </Container>
  )
}
