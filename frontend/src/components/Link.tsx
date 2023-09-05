import { NavLink } from "react-router-dom"
import { classNames } from "../utils"
import { methodColorMap } from "../constants"
import { Method } from "../typings/enums"

const Link = ({
  url,
  name,
  method,
  indent,
}: {
  url: string
  name: string
  method?: Method
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

      {method !== undefined && (
        <span className={classNames("text-[10px]", methodColorMap[method])}>
          {method}
        </span>
      )}
    </NavLink>
  )
}

export default Link
