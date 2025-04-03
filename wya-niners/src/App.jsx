import Browse from "./pages/Browse.jsx";
import Error from "./pages/Error.jsx";
import Event from "./pages/Event.jsx";
import Home from "./pages/Home.jsx";
import Notification from "./pages/Notification.jsx";
import Login from "./pages/Login.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// React Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/events",
    element: <Event />,
  },
  {
    path: "/events/:eventId",
    element: <Event />,
  },
  {
    path: "/notifications",
    element: <Notification />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
