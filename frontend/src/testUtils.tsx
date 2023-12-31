/* eslint-disable react-refresh/only-export-components */
import React, { ReactElement } from "react"
import { render, RenderOptions } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import { NotificationProvider } from "./context/NotificationContext"
import { UserProvider } from "./context/UserContext"

// eslint-disable-next-line react-refresh/only-export-components
const Wrappers = ({ children }: { children: React.ReactNode }) => {
  Element.prototype.scrollTo = () => {}

  return (
    <BrowserRouter>
      <NotificationProvider>
        <UserProvider>{children}</UserProvider>
      </NotificationProvider>
    </BrowserRouter>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: Wrappers, ...options })

export * from "@testing-library/react"
export * from "@testing-library/user-event"
export { customRender as render }
