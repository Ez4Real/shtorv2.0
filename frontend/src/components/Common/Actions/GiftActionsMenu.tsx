import { IconButton } from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { MenuContent, MenuRoot, MenuTrigger } from "../../ui/menu"

import type { GiftPublic } from "@/client"
import DeleteGift from "@/components/Gifts/DeleteGift"
import EditGift from "@/components/Gifts/EditGift"

interface GiftActionsMenuProps {
  gift: GiftPublic
}

export const GiftActionsMenu = ({ gift }: GiftActionsMenuProps) => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton variant="ghost" color="inherit">
          <BsThreeDotsVertical />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <EditGift gift={gift} />
        <DeleteGift id={gift.id} />
      </MenuContent>
    </MenuRoot>
  )
}
