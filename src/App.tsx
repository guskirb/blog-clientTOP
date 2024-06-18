import { useState } from "react";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import LogIn from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import Layout from "./components/layout/layout";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <LogIn />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
