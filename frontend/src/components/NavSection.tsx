import { useState } from "react"
import { classNames } from "../utils"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { ApiRoute } from "../routes"
import Link from "./Link"

const NavSection = ({ route }: { route: ApiRoute }) => {
  const [open, setOpen] = useState(true)

  return (
    <div className="select-none">
      <h5
        className="cursor-pointer pt-4 pb-2 pl-4 flex items-center justify-between"
        onClick={() => setOpen(!open)}
      >
        <span className="uppercase text-gray-800 text-xs font-semibold tracking-wide">
          {route.name}
        </span>
        <ChevronDownIcon
          className={classNames(
            "h-3 w-3 text-gray-500 transition-all",
            open ? "rotate-180" : "rotate-0"
          )}
        />
      </h5>
      {open && (
        <ul className="flex flex-col mt-1">
          <Link name={route.name} url={route.path} />
          {route.routes.map((childRoute, index) => (
            <Link
              key={index}
              name={childRoute.name}
              url={route.path + "/" + childRoute.path}
              badge={childRoute.badge}
              indent
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default NavSection
