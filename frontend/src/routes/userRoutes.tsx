import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import App from "../App";
import Protect from "./Protect";
import Error from "../components/Error";
import DashBoard from "../pages/DashBoard";
import UserList from "../pages/UserList";
import PropertiesList from "../pages/PropertiesList";
import AddProperty from "../pages/AddPropert";
import PropertyDetails from "../pages/PropertyDetails";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protect>
        <App />
      </Protect>
    ),
    errorElement: <Error message="something went wrong, oops" />,
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/user-list",
        element: <UserList />,
      },
      {
        path: "/properties",
        element: <PropertiesList />,
      },
      {
        path: "/add-property",
        element: <AddProperty />,
      },
      {
        path: "/property-details/:id",
        element: <PropertyDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

export default appRouter;
