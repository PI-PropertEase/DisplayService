import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Dashboard from "./routes/Dashboard";
import PropertyListPage from "./routes/PropertyListPage";
import PropertyDetails from "./routes/PropertyDetails";
import Calendar from "./routes/Calendar";
import { PropertyContextProvider } from "./context/PropertyContext";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import Integrations from "./routes/Integrations";

export interface IPropertyDetails {
  _id: string;
  user_id: number;
  property_id: number;
  title: string;
  address: string;
  description: string;
  number_guests: number;
  square_meters: number;
  price_per_night: number;
  bedrooms: Record<
    string,
    {
      number_beds: number;
      type: string[];
    }
  >;
  bathrooms: Map<string, string[]>;
  amenities: string[];
  house_rules: {
    check_in: {
      begin_time: string;
      end_time: string;
    };
    check_out: {
      begin_time: string;
      end_time: string;
    };
    smoking: boolean;
    parties: boolean;
    pets: boolean;
    [key: string]: boolean | { begin_time: string; end_time: string };
  };
  notes: string;
  contact: {
    id: number;
    name: string;
    phone: number;
    email: string;
  }[];
  cancellation_policy: string;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});


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
          <Dashboard />
        </PropertyContextProvider>
      </RequireAuth>
    ),
  },
  {
    path: "/properties",
    element: (
      <RequireAuth fallbackPath="/">
        <PropertyListPage />
      </RequireAuth>
    ),
  },
  {
    path: "/property/:id",
    element: (
      <RequireAuth fallbackPath="/">
        <PropertyDetails />
      </RequireAuth>
    ),
  },
  {
    path: "/calendar",
    element: (
      <RequireAuth fallbackPath="/">
        <Calendar />
      </RequireAuth>
    ),
  },
  {
    path: "/integrations",
    element: <Integrations />,
  }
]);

const store = createStore({
  authName: "_auth_propertease",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
  //refresh: refresh,
  debug: true,
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={myRouter} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
