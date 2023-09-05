import { NavLink } from "react-router-dom"
import Logo from "./Logo"
import { classNames } from "../utils"

const Topbar = ({ showLogo }: { showLogo?: boolean }) => {
  const loggedIn = false

  return (
    <header className="flex px-16 py-5">
      {showLogo && <Logo />}
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
        <NavLink
          to={loggedIn ? "/account" : "/login"}
          className={({ isActive }) =>
            classNames(
              "py-1 pr-1 text-sm font-medium rounded-lg  hover:text-gray-800 transition-all",
              isActive ? "text-gray-800" : "text-indigo-600"
            )
          }
        >
          {loggedIn ? "Account" : "Log In"} &rarr;
        </NavLink>
      </nav>
    </header>
  )
}

export default Topbar
