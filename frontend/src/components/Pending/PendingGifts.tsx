import { Table } from "@chakra-ui/react"
import { SkeletonText } from "../ui/skeleton"

const PendingCollections = () => (
  <Table.Root size={{ base: "sm", md: "md" }}>
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
      {[...Array(5)].map((_, index) => (
        <Table.Row key={index}>
          <Table.Cell>
            <SkeletonText noOfLines={1} />
          </Table.Cell>
          <Table.Cell>
            <SkeletonText noOfLines={1} />
          </Table.Cell>
          <Table.Cell>
            <SkeletonText noOfLines={1} />
          </Table.Cell>
          <Table.Cell>
            <SkeletonText noOfLines={1} />
          </Table.Cell>
          <Table.Cell>
            <SkeletonText noOfLines={1} />
          </Table.Cell>
          <Table.Cell>
            <SkeletonText noOfLines={1} />
          </Table.Cell>
          <Table.Cell>
            <SkeletonText noOfLines={1} />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table.Root>
)

export default PendingCollections


