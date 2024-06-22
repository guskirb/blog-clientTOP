import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import Post from "./pages/post/post";
import LogIn from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import Layout from "./components/layout/layout";
import RequireAuth from "./components/auth/require.auth";
import PersistLogin from "./components/auth/persist.login";
import NewPost from "./pages/new-post/new-post";
import EditPost from "./pages/edit-post/edit-post";

function App() {
  const router = createBrowserRouter([
    {
      element: <PersistLogin />,
      children: [
        {
          element: <Layout />,
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
              element: <RequireAuth />,
              children: [
                {
                  path: "/new-post",
                  element: <NewPost />,
                },
                {
                  path: "/edit-post/:postId",
                  element: <EditPost />,
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
