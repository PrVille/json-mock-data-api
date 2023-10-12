import { useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import routes from "./routes"
import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import Topbar from "./components/Topbar"
import Introduction from "./pages/Introduction"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { useUser } from "./hooks/useUser"
import storage from "./services/storage"
import Account from "./pages/Account/Account"
import Notification from "./components/Notification"
import NotFound from "./pages/NotFound"

const App = () => {
  const { setUser } = useUser()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const onHomePage = location.pathname === "/"
  const onSignInPage = location.pathname === "/signin"
  const onSignUpPage = location.pathname === "/signup"
  const onAccountPage = location.pathname === "/account"

  useEffect(() => {
    const storedUser = storage.loadUser()
    setUser(storedUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.querySelector("main")?.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <Notification />

      <div className="min-h-screen flex">
        {!(onHomePage || onSignInPage || onSignUpPage || onAccountPage) && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}

        <main className="relative flex-1 overflow-y-auto h-screen">
          {/* Content */}
          {!(onSignInPage || onSignUpPage) && (
            <Topbar
              showLogo={onHomePage || onAccountPage}
              onAccountPage={onAccountPage}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          )}

          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/signin" Component={SignIn} />
            <Route path="/signup" Component={SignUp} />
            <Route path="/account" Component={Account} />
            <Route path="/docs">
              <Route index Component={Introduction} />
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
            <Route path="*" Component={NotFound} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
