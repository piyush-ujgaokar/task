import { useAuth } from "../../auth/hooks/useAuth"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
  const { user } = useAuth()

  const linkClass = ({ isActive }) =>
    `block px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
      isActive
        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
        : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
    }`

  return (
    <div className="w-72 bg-white/80 backdrop-blur-xl border-r border-gray-100 shadow-xl flex flex-col h-full sticky top-0">
      <div className="p-8 border-b border-gray-100">
        <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          Task System
        </h2>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <NavLink to={`/dashboard/${user?.role?.toLowerCase().replace(" ", "-")}`} className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/tasks" className={linkClass}>
          Tasks
        </NavLink>

        {(user?.role === "Super Admin" || user?.role === "Admin") && (
          <NavLink to="/users" className={linkClass}>
            Manage Users
          </NavLink>
        )}

        {(user?.role !== "Employee") && (
          <NavLink to="/tasks/create" className={linkClass}>
            Create Task
          </NavLink>
        )}

        {user?.role === "Super Admin" && (
          <NavLink to="/users/create" className={linkClass}>
            Create User
          </NavLink>
        )}
      </nav>
      
      <div className="p-4 border-t border-gray-100 text-xs text-gray-400 text-center">
        &copy; 2026 MERN Tasks
      </div>
    </div>
  )
}

export default Sidebar