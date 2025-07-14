import { useEffect, useRef } from "react"
import {
  Box,
  Container,
  EmptyState,
  Flex,
  Heading,
  Image,
  Table,
  VStack,
} from "@chakra-ui/react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { FiSearch } from "react-icons/fi"
import { z } from "zod"

import { ApiError, GiftsService, GiftsUpdateGiftOrderData, OpenAPI } from "@/client"
import { GiftActionsMenu } from '@/components/Common/Actions/GiftActionsMenu'
import AddGift from "@/components/Gifts/AddGift"

import PendingGift from "@/components/Pending/PendingGifts"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination.tsx"
import { handleError, setupHorizontalScrollOnOverflow } from "@/utils"
import { useColorModeValue } from "@/components/ui/color-mode"
import { SubmitHandler, useForm } from "react-hook-form"
import ItemOrderControls from "@/components/Common/ItemOrderControls"
import { useTranslation } from 'react-i18next';
import { TranslatableTitle } from "@/components/Common/SwitchLocalization"

const giftsSearchSchema = z.object({
  page: z.number().catch(1),
})

const PER_PAGE = 5

function getGiftQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      GiftsService.readGifts({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["gifts", { page }],
  }
}

export const Route = createFileRoute("/_layout/admin/gifts")({
  component: Gifts,
  validateSearch: (search) => giftsSearchSchema.parse(search),
})

function GiftsTable() {
  const { i18n } = useTranslation()
  const navigate = useNavigate({ from: Route.fullPath })
  const queryClient = useQueryClient()
  const { page } = Route.useSearch()
  const scrollContainerRef = useRef<HTMLTableElement | null>(null)
  const scrollbarColor = useColorModeValue("ui.main", "ui.dim")
  const titleKey = `title_${i18n.language}` as TranslatableTitle;

  const { data, isLoading, isPlaceholderData } = useQuery({
    ...getGiftQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const methods = useForm<GiftsUpdateGiftOrderData>({
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

  const gifts = data?.data.slice(0, PER_PAGE) ?? []
  const count = data?.count ?? 0
  const minOrder = data?.min_order ?? 0
  const maxOrder = data?.max_order ?? 0

  const { reset } = methods

  const mutation = useMutation({
    mutationFn: (data: GiftsUpdateGiftOrderData) =>
      GiftsService.updateGiftOrder(data),
    onSuccess: () => {
      reset()
    },
    onError: (err: ApiError) => handleError(err),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["gifts"] })
    },
  })

  const onUpdateOrder: SubmitHandler<GiftsUpdateGiftOrderData> = (data) => {
    mutation.mutate(data)
  }

  useEffect(() => {
    return setupHorizontalScrollOnOverflow(scrollContainerRef.current)
  }, [isLoading])

  if (isLoading) {
    return <PendingGift />
  }

  if (gifts.length === 0) {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <FiSearch />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>You don't have any gifts yet</EmptyState.Title>
            <EmptyState.Description>
              Add a new gift to get started
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
              <Table.ColumnHeader>Date | Time</Table.ColumnHeader>
              <Table.ColumnHeader>Price</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="center">
                Banners
              </Table.ColumnHeader>
              <Table.ColumnHeader></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {gifts?.map((gift) => (
              <Table.Row key={gift.id} opacity={isPlaceholderData ? 0.5 : 1}>
                <Table.Cell
                  p={0}
                  fontWeight="bold"
                >
                  <ItemOrderControls
                    item={gift}
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
                  {gift.id}
                </Table.Cell>
                <Table.Cell>
                  {gift[titleKey]}
                </Table.Cell>
                <Table.Cell>
                  {new Date(gift.created_at as string).toLocaleString()}
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
                    UAH - {gift.price_uah} {"\n"}
                    USD - {gift.price_usd} {"\n"}
                    EUR - {gift.price_eur}
                  </Box>
                </Table.Cell>

                <Table.Cell
                  px={["1.5rem", ".75rem", ".75rem", ".75rem"]}
                >
                  <Image
                    src={`${OpenAPI.BASE}/media/${gift.image.url}`}
                    fit="cover"
                    justifySelf="center"
                    rounded={"4px"}
                    boxSize="100px"
                    minW="100px"
                  />
                </Table.Cell>

                <Table.Cell p="1rem .25rem !important">
                  <GiftActionsMenu gift={gift} />
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

function Gifts() {
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
        >Gifts Management
        </Heading>
        <AddGift />
      </Box>
      <GiftsTable />
    </Container>
  )
}
