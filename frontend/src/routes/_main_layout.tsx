import { Outlet, createFileRoute } from "@tanstack/react-router"
import { CustomProvider } from "@/components/ui/provider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { main } from "@/theme"
import "../index.css"
import { CurrencyProvider } from "@/contexts/CurrencyContext"
import { CartProvider } from "@/contexts/CartContext"

export const Route = createFileRoute("/_main_layout")({
  component: MainLayout,
})

function MainLayout() { 

  return (
    <CustomProvider theme={main} forcedTheme="light">
      <CurrencyProvider>
        <CartProvider>
          <Header />
          <Outlet />
          <Footer />
        </CartProvider>
      </CurrencyProvider>
    </CustomProvider>
  )
}
