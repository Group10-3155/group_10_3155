// import BrowsePage from "./pages/BrowsePage.jsx";
// import ErrorPage from "./pages/ErrorPage.jsx";
// import EventPage from "./pages/EventPage.jsx";
import Home from "./pages/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// React Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // errorElement: <ErrorPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
