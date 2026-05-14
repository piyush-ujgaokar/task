import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import PrivateRoute from "./private.routes";
import UsersPage from "../features/users/pages/UsersPage";


export const router = createBrowserRouter([
    {
        path:'/login',
        element:<Login></Login>
    }
    {
        path:'/users',
        element:<PrivateRoute allowedRoles={["Super Admin","Admin","Manager"]}><UsersPage/></PrivateRoute>
    }
])