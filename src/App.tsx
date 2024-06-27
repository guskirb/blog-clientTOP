import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import Post from "./pages/post/post";
import AllPosts from "./pages/all-posts/all-posts";
import PostByCategory from "./pages/all-posts/post-by-category";
import LogIn from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import LogOut from "./components/auth/logout";
import Layout from "./components/layout/layout";
import Admin from "./components/auth/admin";
import PersistLogin from "./components/auth/persist.login";
import NewPost from "./pages/new-post/new-post";
import EditPost from "./pages/edit-post/edit-post";
import AllDrafts from "./pages/all-posts/all-drafts";
import ScrollToTop from "./components/scroll";

function App() {
  const router = createBrowserRouter([
    {
      element: <PersistLogin />,
      children: [
        {
          element: (
            <>
              <ScrollToTop />
              <Layout />
            </>
          ),
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "/all/page/:page",
              element: <AllPosts />,
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
              element: <Admin />,
              children: [
                {
                  path: "/new-post",
                  element: <NewPost />,
                },
                {
                  path: "/edit-post/:postId",
                  element: <EditPost />,
                },
                {
                  path: "/drafts",
                  element: <AllDrafts />,
                },
              ],
            },
            {
              path: "/:category/page/:page",
              element: <PostByCategory />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
