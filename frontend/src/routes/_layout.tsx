import { Flex } from "@chakra-ui/react"
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

import Navbar from "@/components/Common/Navbar"
import Sidebar from "@/components/Common/Sidebar"
import { isLoggedIn } from "@/hooks/useAuth"
import { CustomProvider } from "@/components/ui/provider"
import { system } from "@/theme"

export const Route = createFileRoute("/_layout")({
  component: Layout,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: "/login",
      })
    }
  },
})

function Layout() {
  return (
    <CustomProvider theme={system}>
      <Flex direction="column" h="100vh">
        <Navbar />
        <Flex flex="1" overflow="hidden">
          <Sidebar />
          <Flex flex="1" direction="column" p={4} overflowY="auto">
            <Outlet />
          </Flex>
        </Flex>
      </Flex>
    </CustomProvider>
  )
}

export default Layout
