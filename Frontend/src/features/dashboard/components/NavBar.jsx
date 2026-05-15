import { useAuth } from "../../auth/hooks/useAuth"

const Navbar = () => {
  const {user, handleLogout} = useAuth()

  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          Welcome, <span className="text-indigo-600">{user?.name || "User"}</span>
        </h1>
        <p className="text-sm text-gray-500">{user?.role || "Role"}</p>
      </div>

      <button 
        onClick={handleLogout} 
        className="px-6 py-2 rounded-xl bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 font-medium transition-all duration-300"
      >
        Logout
      </button>
    </div>
  )
}

export default Navbar