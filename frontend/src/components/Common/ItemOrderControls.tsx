import {
    Box,
    Text,
    VStack,
  } from "@chakra-ui/react"
  import { FiChevronDown, FiChevronUp } from "react-icons/fi"
  
  import { IconButton } from "@/components/ui/icon-button"
  
  interface Item {
    id: string
    order: number
  }

  interface ItemOrderControlsProps<T extends Item, Payload> {
    item: T
    minOrder: number
    maxOrder: number
    onUpdateOrder: (data: Payload) => void
    getPayload: (item: T, direction: -1 | 1) => Payload
  }
  
  function ItemOrderControls<T extends Item, Payload>({
    item,
    minOrder,
    maxOrder,
    onUpdateOrder,
    getPayload,
  }: ItemOrderControlsProps<T, Payload>) {
    return (
      <VStack>
        <Box boxSize="24px">
          {item.order > minOrder && (
            <IconButton onClick={() => onUpdateOrder(getPayload(item, -1))}>
              <FiChevronUp />
            </IconButton>
          )}
        </Box>
        <Text p={["0 .5rem", ".75rem .5rem"]}>{item.order}</Text>
        <Box boxSize="24px">
          {item.order < maxOrder && (
            <IconButton onClick={() => onUpdateOrder(getPayload(item, 1))}>
              <FiChevronDown />
            </IconButton>
          )}
        </Box>
      </VStack>
    )
  }
  
  export default ItemOrderControls
  