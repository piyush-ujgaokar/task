import { Link } from "react-router-dom"

const UserRow = ({user, handleDelete}) => {
  return (
    <tr className="hover:bg-indigo-50/50 transition-colors duration-200 group">
      <td className="py-4 px-6 font-medium text-gray-900">{user.name}</td>
      <td className="py-4 px-6 text-gray-500">{user.email}</td>
      <td className="py-4 px-6">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          user.role === "Super Admin" ? "bg-purple-100 text-purple-700" :
          user.role === "Admin" ? "bg-blue-100 text-blue-700" :
          user.role === "Manager" ? "bg-green-100 text-green-700" :
          "bg-gray-100 text-gray-700"
        }`}>
          {user.role}
        </span>
      </td>
      <td className="py-4 px-6 space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Link to={`/users/edit/${user._id}`} className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
          Edit
        </Link>
        <button 
          onClick={() => handleDelete(user._id)} 
          className="text-red-500 hover:text-red-700 font-medium text-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  )
}

export default UserRow