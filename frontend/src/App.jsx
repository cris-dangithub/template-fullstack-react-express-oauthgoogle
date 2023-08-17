// libraries
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";
import { fetcher } from "./lib/utils/fetcher.util";
// pages
import Home from "./pages/Home";
import Error from "./pages/error/Error";
import InfoCard from "./pages/InfoCard";
import CreateUser from "./pages/CreateUser";
// components
import PrimaryLayout from "./Layouts/PrimaryLayout";
// styles
import "./App.scss";
import Login from "./pages/Login";

/**
 * En App se encuentra:
 * - Enrutado de la página
 */
function App() {
  const router = createBrowserRouter([
    {
      element: <PrimaryLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/info-card/:idCard",
          element: <InfoCard />,
        },
        {
          path: "/create-user",
          element: <CreateUser />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <div className="app">
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <RouterProvider router={router} />
      </SWRConfig>
    </div>
  );
}

export default App;
