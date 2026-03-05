import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { Link as RouterLink } from "@tanstack/react-router"
import { FiBriefcase, FiHome, FiSettings, FiUsers, FiAirplay, FiLayers, FiGift, FiChevronRight } from "react-icons/fi"
import { LuShoppingCart } from "react-icons/lu";
import { BiCategory } from "react-icons/bi";
import type { IconType } from "react-icons/lib"
import type { UserPublic } from "@/client"


const items = [
  { icon: FiAirplay, title: "Go to Website", path: "/" },
  { icon: FiHome, title: "Dashboard", path: "/admin" },
  { icon: LuShoppingCart, title: "Orders", path: "/admin/orders" },
  { icon: BiCategory, title: "Categories", path: "/admin/categories" },
  { icon: FiLayers, title: "Collections", path: "/admin/collections" },
  { icon: FiBriefcase, title: "Products", path: "/admin/products" },
  { icon: FiGift, title: "Gifts", path: "/admin/gifts" },
  { icon: FiSettings, title: "User Settings", path: "/admin/settings" },
]

interface SidebarItemsProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  onClose?: () => void
}

interface Item {
  icon: IconType
  title: string
  path: string
}

const SidebarItems = ({ isOpen, setIsOpen, onClose }: SidebarItemsProps) => {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])

  const finalItems: Item[] = currentUser?.is_superuser
    ? [...items, { icon: FiUsers, title: "Users", path: "/admin/users" }]
    : items

  const listItems = finalItems.map(({ icon, title, path }) => (
    <RouterLink key={title} to={path} onClick={onClose}>
      <Flex
        gap={4}
        px={isOpen ? 4 : 2}
        py={2}
        _hover={{
          background: "ui.main",
          color: "gray.subtle"
        }}
        alignItems="center"
        fontSize="sm"
        borderRadius="md"
      >
        <Icon as={icon} alignSelf="center" />
        <Text
          display={isOpen ? "static" : "none"}
          ml={2}
        >{title}</Text>
      </Flex>
    </RouterLink>
  ))

  return (
    <>
      <Flex
        p={isOpen ? "8px 16px" : "8px"}
        gap="1rem"
      >
        <Icon
          display={{ base: "none", md: "flex" }}
          as={FiChevronRight}
          transform={isOpen ? "rotate(-180deg)" : "rotate(0deg)"}
          transition="transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
          onClick={() => setIsOpen(!isOpen)}
          alignSelf="center"
          cursor="pointer"
        />
        <Text
          display={isOpen ? "static" : "none"}
          fontSize="xs"
          py={2} 
          fontWeight="bold"
        >
          Menu
        </Text>
      </Flex>
      <Box>{listItems}</Box>
    </>
  )
}

export default SidebarItems
