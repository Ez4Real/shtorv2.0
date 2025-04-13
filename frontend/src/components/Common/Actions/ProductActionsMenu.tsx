import { IconButton } from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { MenuContent, MenuRoot, MenuTrigger } from "../../ui/menu"

import type { ProductPublic } from "@/client"
import DeleteProduct from "@/components/Products/DeleteProduct"
import EditProduct from "@/components/Products/EditProduct"

interface ProductActionsMenuProps {
  product: ProductPublic
}

export const ProductActionsMenu = ({ product }: ProductActionsMenuProps) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton variant="ghost" color="inherit">
          <BsThreeDotsVertical />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <EditProduct product={product} />
        <DeleteProduct id={product.id} />
      </MenuContent>
    </MenuRoot>
  )
}
