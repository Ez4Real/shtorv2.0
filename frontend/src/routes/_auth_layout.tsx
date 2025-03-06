import { Outlet, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_auth_layout")({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    // <Provider theme={system}>
    <>
      <Outlet />
    </>
    // </Provider>
  )
}
