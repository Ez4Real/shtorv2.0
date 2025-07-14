import { Center, Container, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main_layout/thank-you")({
  component: SizeGuide,
})

function SizeGuide() {

  return (
    <Container
      p={0}
      maxW="100vw"
      mb={["250px", "250px", "140px", "140px"]}
      px={["16px", "16px", "46px", "46px"]}
    >
      <Center
        flexDirection="column"
        minH="70vh"
      >
        <Text
          fontSize="24px"
          fontWeight="bold"
        >
          Thank you for ordering ❤️
        </Text>
        <Text
          fontSize="16px"
          my="16px"
        >
          Wait for email with tracking number.
        </Text>
      </Center>
    </Container>
  )
}
