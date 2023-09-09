import { NavLink, useNavigate } from "react-router-dom"
import Logo from "./Logo"
import { classNames } from "../utils"
import { useUser } from "../hooks/useUser"
import storage from "../services/storage"

const Topbar = ({
  showLogo,
  onAccountPage,
}: {
  showLogo: boolean
  onAccountPage: boolean
}) => {
  const { user, clearUser } = useUser()
  const navigate = useNavigate()
  const loggedIn = user !== null

  return (
    <header className="flex px-16 py-5">
      {(showLogo || onAccountPage) && <Logo />}
      <nav className="flex-1 flex justify-end gap-5">
        <NavLink
          to="/"
          className={({ isActive }) =>
            classNames(
              "py-1 pr-1 text-sm font-medium rounded-lg  hover:text-gray-800 transition-all",
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
              "py-1 pr-1 text-sm font-medium rounded-lg  hover:text-gray-800 transition-all",
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
          className="py-1 pr-1 text-sm font-medium rounded-lg text-indigo-600 hover:text-gray-800 transition-all"
        >
          GitHub
        </a>
        {onAccountPage ? (
          <button
            onClick={() => {
              clearUser()
              storage.removeUser()
              navigate("/signin")
            }}
            className="py-1 pr-1 text-sm font-medium rounded-lg text-indigo-600 hover:text-gray-800 transition-all"
          >
            Sign out
          </button>
        ) : (
          <NavLink
            to={loggedIn ? "/account" : "/signin"}
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
