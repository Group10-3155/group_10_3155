import Browse from "./pages/Browse.jsx";
import Error from "./pages/Error.jsx";
import Event from "./pages/Event.jsx";
import Home from "./pages/Home.jsx";
import Notification from "./pages/Notification.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import CreateEvent from "./pages/CreateEvent.jsx";
import Register from "./pages/Register.jsx";

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
  {
    path: "/register",
    element: <RegisterAndLogout />,
  },
  {
    path: "/create-event",
    element: (
      <ProtectedRoute>
        <CreateEvent />
      </ProtectedRoute>
    ),
  },
]);

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

export default function App() {
  return <RouterProvider router={router} />;
}
