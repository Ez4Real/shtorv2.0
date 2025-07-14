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
import { FiCheck, FiSearch } from "react-icons/fi"
import { z } from "zod"

import { Currency, OrdersService } from "@/client"
// import PendingOrders from "@/components/Pending/PendingOrders"
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination.tsx"
import { setupHorizontalScrollOnOverflow } from "@/utils"
import { useColorModeValue } from "@/components/ui/color-mode"
import { OrderActionsMenu } from "@/components/Common/Actions/OrderActionsMenu"
import { currencyList } from '../../../../contexts/CurrencyContext';
import { t } from "i18next"

const ordersSearchSchema = z.object({
  page: z.number().catch(1),
})

const PER_PAGE = 8

function getOrdersQueryOptions({ page }: { page: number }) {
  return {
    queryFn: () =>
      OrdersService.readOrders({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
    queryKey: ["orders", { page }],
  }
}

export const Route = createFileRoute("/_layout/admin/orders/")({
  component: Category,
  validateSearch: (search) => ordersSearchSchema.parse(search),
})

function CategoryTable() {
  const navigate = useNavigate({ from: Route.fullPath })
  const { page } = Route.useSearch()
  const scrollContainerRef = useRef<HTMLTableElement | null>(null)
  const scrollbarColor = useColorModeValue("ui.main", "ui.dim")

  const { data, isLoading, isPlaceholderData } = useQuery({
    ...getOrdersQueryOptions({ page }),
    placeholderData: (prevData) => prevData,
  })

  const setPage = (page: number) =>
    navigate({
      search: (prev: { [key: string]: number }) => ({ ...prev, page }),
    })

  const orders = data?.data.slice(0, PER_PAGE) ?? []
  const count = data?.count ?? 0
  

  useEffect(() => {
    return setupHorizontalScrollOnOverflow(scrollContainerRef.current)
  }, [isLoading])

//   if (isLoading) {
//     return <PendingOrders />
//   }

  if (orders.length === 0) {
    return (
      <EmptyState.Root>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <FiSearch />
          </EmptyState.Indicator>
          <VStack textAlign="center">
            <EmptyState.Title>You don't have any orders yet</EmptyState.Title>
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
              <Table.ColumnHeader></Table.ColumnHeader>
              <Table.ColumnHeader>Order ID</Table.ColumnHeader>
              <Table.ColumnHeader>Invoice ID</Table.ColumnHeader>
              <Table.ColumnHeader>Amount</Table.ColumnHeader>
              <Table.ColumnHeader>Date | Time</Table.ColumnHeader>
              <Table.ColumnHeader>Status</Table.ColumnHeader>
              <Table.ColumnHeader>Shipping Method</Table.ColumnHeader>
              <Table.ColumnHeader>Mailing</Table.ColumnHeader>
              <Table.ColumnHeader></Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {orders?.map((order) => (
              <Table.Row key={order.id} opacity={isPlaceholderData ? 0.5 : 1}>
                <Table.Cell
                  p="1rem .25rem !important"
                >
                  <OrderActionsMenu order={order} />
                </Table.Cell>
                <Table.Cell>
                  {order.id}
                </Table.Cell>
                <Table.Cell>
                  {order.invoiceId}
                </Table.Cell>
                <Table.Cell>
                  {order.currency.toUpperCase()} - {currencyList[order.currency as Currency].symbol}{order.amount}
                </Table.Cell>
                <Table.Cell truncate maxWidth="50%">
                  {new Date(order.created_at as string).toLocaleString()}
                </Table.Cell>
                <Table.Cell truncate maxWidth="150px">
                  <Flex
                    gap={2} 
                    textTransform="capitalize"
                    lineHeight="16px"
                  >
                    <Box
                      w="2"
                      h="2"
                      borderRadius="50%"
                      bg={`paymentStatus.${order.payment_status}`}
                      alignSelf="center"
                    />
                    {order.payment_status}
                  </Flex>
                </Table.Cell>
                <Table.Cell>
                  {t(`Orders.shipping-method.${order.shipping_method}`)}
                </Table.Cell>
                
                <Table.Cell placeItems="center">
                  { order.mailing && (
                    <FiCheck color="#009688" size="24px"/>
                  )}
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
        >Orders Management
        </Heading>
      </Box>
      <CategoryTable />
    </Container>
  )
}
