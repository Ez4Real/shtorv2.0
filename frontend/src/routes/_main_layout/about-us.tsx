
import { Breadcrumb, Container } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_main_layout/about-us")({
    component: AboutUs,
})


function AboutUs() {

    return (
        <Container
            pt="120px"
            pb="36px"
        >
            <Breadcrumb.Root>
                <Breadcrumb.List>
                    <Breadcrumb.Item>
                        <Breadcrumb.Link 
                            href="#"
                            fontSize="16px"
                        >HOME/
                        </Breadcrumb.Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Breadcrumb.Link 
                            href="#"
                            fontWeight="500"
                            fontSize="16px"
                        >About us
                        </Breadcrumb.Link>
                    </Breadcrumb.Item>
                </Breadcrumb.List>
            </Breadcrumb.Root>

        </Container>
    )
}