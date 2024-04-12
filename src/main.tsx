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

queryClient.setQueryData<IPropertyDetails>("propertyDetails", {
  _id: "abc",
  user_id: 1,
  property_id: 1,
  title: "Name of the property",
  address: "Address of the property",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui sed nunc vestibulum ultricies. Nullam auctor, nunc id ultricies ultricies, nunc urna tincidunt erat, nec ultricies nunc nisl nec nunc. Sed auctor, nunc id ultricies ultricies, nunc urna tincidunt erat, nec ultricies nunc nisl nec nunc. Sed auctor, nunc id ultricies ultricies, nunc urna tincidunt erat, nec ultricies nunc nisl nec nunc. Sed auctor, nunc id ultricies ultricies, nunc urna tincidunt erat, nec ultricies nunc nisl nec nunc. Sed auctor, nunc id ultricies ultricies, nunc urna tincidunt erat, nec ultricies nunc nisl nec nunc.",
  number_guests: 4,
  square_meters: 500,
  price_per_night: 50,
  bedrooms: {
    "1": {
      number_beds: 1,
      type: ["Single"],
    },
    "2": {
      number_beds: 2,
      type: ["Single", "King Size"],
    },
  },
  bathrooms: new Map([
    ["1", ["Shower", "Toilet"]],
    ["2", ["Shower", "Toilet"]],
  ]),
  amenities: ["Wifi", "TV", "Air Conditioning"],
  house_rules: {
    check_in: {
      begin_time: "15:00H",
      end_time: "17:00H",
    },
    check_out: {
      begin_time: "08:30H",
      end_time: "11:00H",
    },
    smoking: false,
    parties: false,
    pets: true,
  },
  notes:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui sed nunc vestibulum ultricies.",
  contact: [
    {
      id: 1,
      name: "John Doe",
      phone: 123456789,
      email: "john@gmai.com",
    },
  ],
  cancellation_policy: "Free cancellation up to 24 hours before check-in.",
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
