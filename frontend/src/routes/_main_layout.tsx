import { Outlet, createFileRoute } from "@tanstack/react-router"
import "../index.css"

export const Route = createFileRoute("/_main_layout")({
  component: MainLayout,
})

function MainLayout() {

  return (
    // <div className="main-layout">
    <>
      <>Header Component comes here</>
      <Outlet />
      <>Footer Component comes here</>
    </>
    // </div>
  )
}
