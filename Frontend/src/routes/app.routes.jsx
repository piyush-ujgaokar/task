import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import PrivateRoute from "./private.routes";
import UsersPage from "../features/users/pages/UsersPage";
import CreateUserPage from "../features/users/pages/CreateUserPage";
import CreateTaskPage from "../features/tasks/pages/CreateTaskPage";
import TaskDetailsPage from "../features/tasks/pages/TaskDetailsPage";
import SuperAdminDashboard from "../features/dashboard/pages/SuperAdminDashboard";
import AdminDashboard from "../features/dashboard/pages/AdminDashboard";
import ManagerDashboard from "../features/dashboard/pages/ManagerDashboard";
import EmployeeDashboard from "../features/dashboard/pages/EmployeeDashboard";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/login" replace />
    },
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
    },
    {
        path:"/dashboard/super-admin",
        element:<SuperAdminDashboard />
    },
    {
        path:"/dashboard/admin",
        element:<AdminDashboard />
    },
    {
        path:"/dashboard/manager",
        element:<ManagerDashboard/>
    },
    {
        path:"/dashboard/employee",
        element:<EmployeeDashboard />
    }
])