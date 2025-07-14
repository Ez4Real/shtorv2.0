import { IconButton } from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { MenuContent, MenuRoot, MenuTrigger } from "../../ui/menu"

import type { CollectionPublic_Output } from "@/client"
import DeleteCollection from "@/components/Collections/DeleteCollection"
import EditCollection from "@/components/Collections/EditCollection"

interface CollectionActionsMenuProps {
  collection: CollectionPublic_Output
}

export const CollectionActionsMenu = ({ collection }: CollectionActionsMenuProps) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton variant="ghost" color="inherit">
          <BsThreeDotsVertical />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <EditCollection collection={collection} />
        <DeleteCollection id={collection.id} />
      </MenuContent>
    </MenuRoot>
  )
}
