import { Route, Routes, useLocation } from "react-router-dom"
import routes from "./routes"
import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import Topbar from "./components/Topbar"
import DocsHome from "./pages/DocsHome"

const App = () => {
  const location = useLocation()
  const onHomePage = location.pathname === "/"

  return (
    <>
      <div className="min-h-screen flex">
        {!onHomePage && <Sidebar />}

        <div className="relative flex-1 overflow-y-auto h-screen">
          {/* Content */}
          <Topbar showLogo={onHomePage} />

          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/docs">
              <Route index Component={DocsHome} />
              {routes.general.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  Component={route.component}
                />
              ))}

              {routes.api.map((route, index) => (
                <Route key={index} path={route.path}>
                  <Route index Component={route.component} />
                  {route.routes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      Component={route.component}
                    />
                  ))}
                </Route>
              ))}
            </Route>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
