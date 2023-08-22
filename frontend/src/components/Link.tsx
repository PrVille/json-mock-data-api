import { NavLink } from "react-router-dom"
import { classNames } from "../utils"

const Link = ({
  url,
  name,
  badge,
  indent,
}: {
  url: string
  name: string
  badge?: string
  indent?: boolean
}) => {
  return (
    <NavLink
      to={"/docs/" + url}
      className={({ isActive }) =>
        classNames(
          "py-1 pr-1 text-sm font-medium rounded-lg transition-all flex items-center justify-between",
          isActive
            ? "bg-indigo-50 text-indigo-600"
            : "bg-inherit text-gray-500 hover:text-gray-800",
          indent ? "pl-7" : "pl-4"
        )
      }
      end
    >
      <span>{name}</span>
      {badge !== undefined && <span className="text-xs">{badge}</span>}
    </NavLink>
  )
}

export default Link
