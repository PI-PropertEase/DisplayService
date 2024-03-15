import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import SignIn from './routes/SignIn';

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
    path: '/signin',
    element: <SignIn />,
  }
 ]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode >
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={myRouter} />
    </QueryClientProvider>
  </React.StrictMode>,
)
