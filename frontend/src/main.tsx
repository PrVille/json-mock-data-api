import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { BrowserRouter as Router } from "react-router-dom"
import { inject } from "@vercel/analytics"
import { UserProvider } from "./context/UserContext.tsx"
import { NotificationProvider } from "./context/NotificationContext.tsx"

inject()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <NotificationProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </NotificationProvider>
    </Router>
  </React.StrictMode>
)
