import { IconButton } from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { MenuContent, MenuRoot, MenuTrigger } from "../../ui/menu"

import type { ProductCategoryPublic } from "@/client"
import DeleteCategory from "@/components/Categories/DeleteCategory"
import EditCategory from "@/components/Categories/EditCategory"

interface CategoryActionsMenuProps {
  category: ProductCategoryPublic
}

export const CategoryActionsMenu = ({ category }: CategoryActionsMenuProps) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton variant="ghost" color="inherit">
          <BsThreeDotsVertical />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <EditCategory category={category} />
        <DeleteCategory id={category.id} />
      </MenuContent>
    </MenuRoot>
  )
}
