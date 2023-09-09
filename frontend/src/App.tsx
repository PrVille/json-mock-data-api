import { useEffect } from "react"
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

const App = () => {
  const { setUser } = useUser()
  const location = useLocation()
  const onHomePage = location.pathname === "/"
  const onSignInPage = location.pathname === "/signin"
  const onSignUpPage = location.pathname === "/signup"

  useEffect(() => {
    const storedUser = storage.loadUser()
    setUser(storedUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className="min-h-screen flex">
        {!(onHomePage || onSignInPage || onSignUpPage) && <Sidebar />}

        <div className="relative flex-1 overflow-y-auto h-screen">
          {/* Content */}
          {!(onSignInPage || onSignUpPage) && <Topbar showLogo={onHomePage} />}

          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/signin" Component={SignIn} />
            <Route path="/signup" Component={SignUp} />
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
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
