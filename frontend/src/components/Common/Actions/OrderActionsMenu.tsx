import { Button, IconButton } from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { MenuContent, MenuRoot, MenuTrigger } from "../../ui/menu"
import { Link as RouterLink } from "@tanstack/react-router"
import { TbListDetails } from "react-icons/tb";

import type { OrderPublic } from "@/client"
import DeleteOrder from "@/components/Orders/DeleteOrder"

interface OrderActionsMenuProps {
  order: OrderPublic
}

export const OrderActionsMenu = ({ order }: OrderActionsMenuProps) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton variant="ghost" color="inherit">
          <BsThreeDotsVertical />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <RouterLink
          from="/admin/orders"
          to="/admin/orders/$id"
          params={{ id: order.id }}
          hash="root"
        >
          <Button variant="ghost" size="sm">
            <TbListDetails fontSize="16px" />
            Order Details
          </Button>
        </RouterLink>
        <DeleteOrder id={order.id} />
      </MenuContent>
    </MenuRoot>
  )
}
