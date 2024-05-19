import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { QueryClient, QueryClientProvider } from "react-query"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./routes/Home"
import SignIn from "./routes/SignIn"
import SignUp from "./routes/SignUp"
import Dashboard from "./routes/Dashboard"
import PropertyListPage from "./routes/PropertyListPage"
import PropertyDetails from "./routes/PropertyDetails"
import Calendar from "./routes/Calendar"
import { PropertyContextProvider } from "./context/PropertyContext"
import AuthProvider from "react-auth-kit"
import createStore from "react-auth-kit/createStore"
import RequireAuth from "@auth-kit/react-router/RequireAuth"
import Integrations from "./routes/Integrations"
import { ReservationContextProvider } from "./context/ReservationContext"
import { EventModalContextProvider } from "./context/EventModalContext"
import { ManagementContextProvider } from "./context/ManagementContext"
import { EventContextProvider } from "./context/EventContext"
import { PropertyDetailsToastContextProvider } from "./context/PropertyDetailsToastContext"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
})

const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: (
      <RequireAuth fallbackPath="/">
        <PropertyContextProvider>
          <ReservationContextProvider>
            <EventContextProvider>
              <Dashboard />
            </EventContextProvider>
          </ReservationContextProvider>
        </PropertyContextProvider>
      </RequireAuth>
    ),
  },
  {
    path: "/properties",
    element: (
      <RequireAuth fallbackPath="/">
        <PropertyContextProvider>
          <ReservationContextProvider>
            <PropertyListPage />
          </ReservationContextProvider>
        </PropertyContextProvider>
      </RequireAuth>
    ),
  },
  {
    path: "/property/:id",
    element: (
      <RequireAuth fallbackPath="/">
        <PropertyContextProvider>
          <PropertyDetailsToastContextProvider>
            <ReservationContextProvider>
              <EventModalContextProvider>
                <ManagementContextProvider>
                  <PropertyDetails />
                </ManagementContextProvider>
              </EventModalContextProvider>
            </ReservationContextProvider>
          </PropertyDetailsToastContextProvider>
        </PropertyContextProvider>
      </RequireAuth>
    ),
  },
  {
    path: "/calendar",
    element: (
      <RequireAuth fallbackPath="/">
        <ReservationContextProvider>
          <EventContextProvider>
            <PropertyContextProvider>
              <Calendar />
            </PropertyContextProvider>
          </EventContextProvider>
        </ReservationContextProvider>
      </RequireAuth>
    ),
  },
  {
    path: "/integrations",
    element: (
      <RequireAuth fallbackPath="/">
        <Integrations />
      </RequireAuth>
    ),
  },
])

const store = createStore({
  authName: "_auth_propertease",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
  //refresh: refresh,
  debug: true,
})

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={myRouter} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)
