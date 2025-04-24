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
  Text,
  VStack,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi"
import { z } from "zod"

import { CollectionsService, OpenAPI } from "@/client"
import { CollectionActionsMenu } from '@/components/Common/Actions/CollectionActionsMenu'
import AddCollection from "@/components/Collections/AddCollection"

import PendingCollection from "@/components/Pending/PendingCollections"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination.tsx"
import { setupHorizontalScrollOnOverflow } from "@/utils"
import { useColorModeValue } from "@/components/ui/color-mode"
import { IconButton } from "@/components/ui/icon-button"

const collectionsSearchSchema = z.object({
  page: z.number().catch(1),
})

const PER_PAGE = 5

function getCollectionQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      CollectionsService.readCollections({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["collections", { page }],
  }
}

export const Route = createFileRoute("/_layout/admin/collections")({
  component: Collections,
  validateSearch: (search) => collectionsSearchSchema.parse(search),
})

function CollectionsTable() {
  const navigate = useNavigate({ from: Route.fullPath })
  const { page } = Route.useSearch()
  const scrollContainerRef = useRef<HTMLTableElement | null>(null)
  const scrollbarColor = useColorModeValue("ui.main", "ui.dim")

  const { data, isLoading, isPlaceholderData } = useQuery({
    ...getCollectionQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const setPage = (page: number) =>
    navigate({
      search: (prev: { [key: string]: number }) => ({ ...prev, page }),
    })

  const collections = data?.data.slice(0, PER_PAGE) ?? []
  const count = data?.count ?? 0

  useEffect(() => {
    return setupHorizontalScrollOnOverflow(scrollContainerRef.current)
  }, [isLoading])

  if (isLoading) {
    return <PendingCollection />
  }

  if (collections.length === 0) {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <FiSearch />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>You don't have any collections yet</EmptyState.Title>
            <EmptyState.Description>
              Add a new collection to get started
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
              <Table.ColumnHeader></Table.ColumnHeader>
              <Table.ColumnHeader w="sm">ID</Table.ColumnHeader>
              <Table.ColumnHeader w="sm">Title</Table.ColumnHeader>
              <Table.ColumnHeader w="sm">Date | Time</Table.ColumnHeader>
              <Table.ColumnHeader
                w="sm"
                textAlign="center"
              >Banners</Table.ColumnHeader>
              <Table.ColumnHeader w="sm"></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {collections?.map((collection) => (
              <Table.Row key={collection.id} opacity={isPlaceholderData ? 0.5 : 1}>
                <Table.Cell
                  truncate
                  p={0}
                  maxW="sm"
                  fontWeight="bold"
                  placeItems="center"
                >
                  <IconButton>
                    <FiChevronUp/>
                  </IconButton>
                  <Text p=".75rem .5rem">{collection.order}</Text>
                  <IconButton>
                    <FiChevronDown/>
                  </IconButton>
                </Table.Cell>
                <Table.Cell truncate maxW="sm">
                  {collection.id}
                </Table.Cell>
                <Table.Cell truncate maxW="sm">
                  {collection.title}
                </Table.Cell>
                <Table.Cell truncate maxWidth="50%">
                  {new Date(collection.created_at as string).toLocaleString()}
                </Table.Cell>

                <Table.Cell
                  px={["1.5rem", ".75rem", ".75rem", ".75rem"]}
                >
                  <HStack>
                    <Image
                      src={`${OpenAPI.BASE}/media/${collection.banner_desktop.url}`}
                      fit="cover"
                      justifySelf="center"
                      rounded={"4px"}
                      h={["100px", "140px", "140px", "140px"]}
                      minW={["150px", "215px", "215px", "215px"]}
                    />
                    <Image
                      src={`${OpenAPI.BASE}/media/${collection.banner_mobile.url}`}
                      fit="cover"
                      justifySelf="center"
                      rounded={"4px"}
                      h={["100px", "140px", "140px", "140px"]}
                      minW={["60px", "75px", "75px", "75px"]}
                    />
                  </HStack>
                </Table.Cell>

                <Table.Cell p="1rem .25rem !important">
                  <CollectionActionsMenu collection={collection} />
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

function Collections() {
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
        >Collections Management
        </Heading>
        <AddCollection />
      </Box>
      <CollectionsTable />
    </Container>
  )
}
