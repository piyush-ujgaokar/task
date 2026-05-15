import { createBrowserRouter } from "react-router";
import Login from "../features/auth/pages/Login";
import PrivateRoute from "./private.routes";
import UsersPage from "../features/users/pages/UsersPage";
import CreateUserPage from "../features/users/pages/CreateUserPage";
import CreateTaskPage from "../features/tasks/pages/CreateTaskPage";
import TaskDetailsPage from "../features/tasks/pages/TaskDetailsPage";


export const router = createBrowserRouter([
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/users',
        element:<PrivateRoute allowedRoles={["Super Admin","Admin","Manager"]}><UsersPage/></PrivateRoute>
    },
    {
        path:'/users/create',
        element:<PrivateRoute allowedRoles={["Super Admin","Admin"]}><CreateUserPage/></PrivateRoute>
    },
    {
        path:'/tasks/create',
        element:<PrivateRoute><CreateTaskPage/></PrivateRoute>
    },
    {
        path:'/tasks/:id',
        element:<PrivateRoute><TaskDetailsPage/></PrivateRoute>
    }
])