import routes from "../routes"
import Link from "./Link"
import Logo from "./Logo"
import NavSection from "./NavSection"

const Sidebar = () => {
  return (
    <div className="w-[220px] h-screen overflow-y-auto overflow-x-hidden border-r">
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
  )
}

export default Sidebar
