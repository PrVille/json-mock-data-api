import { Dispatch, Fragment, useEffect } from "react"
import routes from "../routes"
import Link from "./Link"
import Logo from "./Logo"
import NavSection from "./NavSection"
import { Transition } from "@headlessui/react"
import { useLocation } from "react-router-dom"

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean
  setSidebarOpen: Dispatch<boolean>
}) => {
  const location = useLocation()

  useEffect(() => {
    setSidebarOpen(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <>
      <div className="hidden lg:block w-[260px] h-screen overflow-y-auto overflow-x-hidden border-r">
        <header className="pl-4 py-3 pr-3">
          <Logo url="/docs" />
        </header>

        <div className="border-t" />

        <div className="py-3 pr-3">
          <ul className="flex flex-col">
            {routes.general.map((route, index) => (
              <Link key={index} name={route.name} url={route.path} />
            ))}
          </ul>
        </div>

        <div className="border-t" />

        <div className="py-3 pr-3">
          {routes.api.map((route, index) => (
            <NavSection key={index} route={route} />
          ))}
        </div>
      </div>

      {/* Mobile */}
      <Transition.Root show={sidebarOpen}>
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="lg:hidden fixed z-50 inset-0 top-16 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={() => setSidebarOpen(false)}
          />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-150"
          enterFrom="opacity-0 transform -translate-x-20"
          enterTo="opacity-100"
          leave="transition ease-in-out duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0 transform -translate-x-20"
        >
          <aside className="fixed inset-y-0 z-50 flex-shrink-0 w-[260px] mt-16 overflow-y-auto overflow-x-hidden border-r bg-white lg:hidden">
            <header className="pl-4 py-3 pr-3">
              <Logo url="/docs" />
            </header>

            <div className="border-t" />

            <div className="py-3 pr-3">
              <ul className="flex flex-col">
                {routes.general.map((route, index) => (
                  <Link key={index} name={route.name} url={route.path} />
                ))}
              </ul>
            </div>

            <div className="border-t" />

            <div className="py-3 pr-3">
              {routes.api.map((route, index) => (
                <NavSection key={index} route={route} />
              ))}
            </div>
          </aside>
        </Transition.Child>
      </Transition.Root>
    </>
  )
}

export default Sidebar
