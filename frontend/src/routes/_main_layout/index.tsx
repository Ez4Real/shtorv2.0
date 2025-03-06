import { Container } from "@chakra-ui/react"
  import { createFileRoute } from "@tanstack/react-router"
  
  export const Route = createFileRoute("/_main_layout/")({
    component: Main,
  })


  function Main() {
  
    return (
      <Container>
        Main page
      </Container>
    )
  }
  