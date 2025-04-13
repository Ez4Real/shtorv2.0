import { Box, Flex, Icon, Text } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { Link as RouterLink } from "@tanstack/react-router"
import { FiBriefcase, FiHome, FiSettings, FiUsers, FiAirplay, FiLayers } from "react-icons/fi"
import type { IconType } from "react-icons/lib"
import type { UserPublic } from "@/client"


const items = [
  { icon: FiAirplay, title: "Go to Website", path: "/" },
  { icon: FiHome, title: "Dashboard", path: "/admin" },
  { icon: FiLayers, title: "Collections", path: "/admin/collections" },
  { icon: FiBriefcase, title: "Products", path: "/admin/products" },
  { icon: FiSettings, title: "User Settings", path: "/admin/settings" },
]

interface SidebarItemsProps {
  onClose?: () => void
}

interface Item {
  icon: IconType
  title: string
  path: string
}

const SidebarItems = ({ onClose }: SidebarItemsProps) => {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])

  const finalItems: Item[] = currentUser?.is_superuser
    ? [...items, { icon: FiUsers, title: "Users", path: "/admin/users" }]
    : items

  const listItems = finalItems.map(({ icon, title, path }) => (
    <RouterLink key={title} to={path} onClick={onClose}>
      <Flex
        gap={4}
        px={4}
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
        <Text ml={2}>{title}</Text>
      </Flex>
    </RouterLink>
  ))

  return (
    <>
      <Text fontSize="xs" px={4} py={2} fontWeight="bold">
        Menu
      </Text>
      <Box>{listItems}</Box>
    </>
  )
}

export default SidebarItems
