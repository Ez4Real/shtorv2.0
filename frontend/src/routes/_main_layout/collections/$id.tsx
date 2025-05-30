// import { CollectionsService } from "@/client"
import BuilderComponent from "@/components/PageBuilder"
import { Container } from "@chakra-ui/react"
// import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main_layout/collections/$id")({
  component: Collection,
})

// function getCollectionQueryOptions({ id }: { id: string }) {
//   return {
//     queryFn: () => CollectionsService.readCollection({ id }),
//     queryKey: ["collections", { id }],
//   }
// }

function Collection() {
  // const { id } = Route.useParams<{ id: string }>()
  
  // const { data: collection, isPending } = useQuery({
  //   ...getCollectionQueryOptions({ id }),
  // })

  return (
    <Container>
      <BuilderComponent />
    </Container>
  )
}