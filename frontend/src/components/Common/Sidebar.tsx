import { Box, Flex, IconButton, Text } from "@chakra-ui/react"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { FaBars } from "react-icons/fa"
import { FiLogOut } from "react-icons/fi"

import type { UserPublic } from "@/client"
import useAuth from "@/hooks/useAuth"
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerRoot,
  DrawerTrigger,
} from "../ui/drawer"
import SidebarItems from "./SidebarItems"

const Sidebar = () => {
  const queryClient = useQueryClient()
  const currentUser = queryClient.getQueryData<UserPublic>(["currentUser"])
  const { logout } = useAuth()
  const [openMobile, setOpenMobile] = useState(false)
  const [openDesktop, setOpenDesktop] = useState(false)

  return (
    <>
      {/* Mobile */}
      <DrawerRoot
        placement="start"
        open={openMobile}
        onOpenChange={(e) => setOpenMobile(e.open)}
      >
        <DrawerBackdrop />
        <DrawerTrigger asChild>
          <IconButton
            variant="ghost"
            color="inherit"
            display={{ base: "flex", md: "none" }}
            aria-label="Open Menu"
            position="absolute"
            zIndex="100"
            m={2}
          >
            <FaBars />
          </IconButton>
        </DrawerTrigger>
        <DrawerContent maxW="xs" >
          <DrawerCloseTrigger />
          <DrawerBody>
            <Flex flexDir="column" justify="space-between">
              <Box>
                <SidebarItems
                  isOpen={openMobile}
                  setIsOpen={setOpenMobile}                
                />
                <Flex
                  as="button"
                  onClick={() => {
                    logout()
                  }}
                  alignItems="center"
                  gap={4}
                  px={4}
                  py={2}
                >
                  <FiLogOut />
                  <Text>Log Out</Text>
                </Flex>
              </Box>
              {currentUser?.email && (
                <Text fontSize="sm" p={2} truncate maxW="sm">
                  Logged in as: {currentUser.email}
                </Text>
              )}
            </Flex>
          </DrawerBody>
          <DrawerCloseTrigger />
        </DrawerContent>
      </DrawerRoot>

      {/* Desktop */}
      <Box
        display={{ base: "none", md: "flex" }}
        position="sticky"
        bg="bg.subtle"
        top={0}
        width={openDesktop ? "240px" : "64px"}
        transition="width 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
        h="100vh"
        p={4}
        overflow="hidden"
      >
        <Box w="100%">
          <SidebarItems
            isOpen={openDesktop}
            setIsOpen={setOpenDesktop}
          />
        </Box>
      </Box>
    </>
  )
}

export default Sidebar
