import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import Dashboard from './routes/Dashboard';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

const myRouter = createBrowserRouter([
  {
     path: '/',
     element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  }
 ]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={myRouter} />
    </QueryClientProvider>
  </React.StrictMode>,
)
