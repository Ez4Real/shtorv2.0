import { Outlet, createFileRoute } from "@tanstack/react-router"
import { CustomProvider } from "@/components/ui/provider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { main } from "@/theme"
import "../index.css"

export const Route = createFileRoute("/_main_layout")({
  component: MainLayout,
})

function MainLayout() {

  return (
    <CustomProvider theme={main}>
      <Header />
      <Outlet />
      <Footer />
    </CustomProvider>
  )
}
