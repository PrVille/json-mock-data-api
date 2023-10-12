import { NavLink, useLocation, useNavigate } from "react-router-dom"
import Logo from "./Logo"
import { classNames } from "../utils"
import { useUser } from "../hooks/useUser"
import storage from "../services/storage"
import { Dispatch } from "react"
import { Bars3Icon } from "@heroicons/react/24/outline"

const Topbar = ({
  showLogo,
  onAccountPage,
  sidebarOpen,
  setSidebarOpen,
}: {
  showLogo: boolean
  onAccountPage: boolean
  sidebarOpen: boolean
  setSidebarOpen: Dispatch<boolean>
}) => {
  const { user, clearUser } = useUser()
  const navigate = useNavigate()
  const location = useLocation()
  const loggedIn = user !== null

  return (
    <header className="flex px-8 md:px-16 py-5">
      {showLogo && <Logo />}

      {!showLogo && <div className="flex lg:hidden items-center">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Bars3Icon className="h-6 w-6 text-gray-600" />
        </button>
      </div>}

      <nav className="flex-1 flex justify-end gap-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            classNames(
              "hidden md:block py-1 pr-1 text-sm font-medium rounded-lg  hover:text-gray-800 transition-all",
              isActive ? "text-gray-800" : "text-indigo-600"
            )
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/docs"
          className={({ isActive }) =>
            classNames(
              "hidden md:block py-1 pr-1 text-sm font-medium rounded-lg  hover:text-gray-800 transition-all",
              isActive ? "text-gray-800" : "text-indigo-600"
            )
          }
        >
          Docs
        </NavLink>
        <a
          href="https://github.com/PrVille/json-mock-data-api"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block py-1 pr-1 text-sm font-medium rounded-lg text-indigo-600 hover:text-gray-800 transition-all"
        >
          GitHub
        </a>

        {onAccountPage ? (
          <button
            onClick={() => {
              clearUser()
              storage.removeUser()
              navigate("/signin", { state: { prevUrl: location.pathname } })
            }}
            className="py-1 pr-1 text-sm font-medium rounded-lg text-indigo-600 hover:text-gray-800 transition-all"
          >
            Sign out &rarr;
          </button>
        ) : (
          <NavLink
            to={loggedIn ? "/account" : "/signin"}
            state={{ prevUrl: location.pathname }}
            className={({ isActive }) =>
              classNames(
                "py-1 pr-1 text-sm font-medium rounded-lg  hover:text-gray-800 transition-all",
                isActive ? "text-gray-800" : "text-indigo-600"
              )
            }
          >
            {loggedIn ? "Account" : "Sign In"} &rarr;
          </NavLink>
        )}
      </nav>
    </header>
  )
}

export default Topbar
