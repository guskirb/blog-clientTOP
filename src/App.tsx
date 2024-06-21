import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import Post from "./pages/post/post";
import LogIn from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import Layout from "./components/layout/layout";
import Editor from "./pages/editor/Editor";
import RequireAuth from "./components/auth/require.auth";
import PersistLogin from "./components/auth/persist.login";
import LogOut from "./pages/auth/logout";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          element: <PersistLogin />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/post/:postId",
              element: <Post />,
            },
            {
              path: "/login",
              element: <LogIn />,
            },
            {
              path: "/signup",
              element: <SignUp />,
            },
            {
              path: "/logout",
              element: <LogOut />,
            },
            {
              element: <RequireAuth />,
              children: [
                {
                  path: "/admin",
                  element: <Editor />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
