import { Link } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

const TaskRow = ({ task, handleDelete }) => {
  const { user } = useAuth()
  return (
    <tr className="hover:bg-indigo-50/50 transition-colors duration-200 group">
      <td className="py-4 px-6">
        <Link to={`/tasks/${task._id}`} className="font-medium text-indigo-600 hover:text-indigo-800 hover:underline">
          {task.title}
        </Link>
      </td>

      <td className="py-4 px-6">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          task.status === "Done" || task.status === "Closed" ? "bg-green-100 text-green-700" :
          task.status === "In Progress" ? "bg-blue-100 text-blue-700" :
          "bg-gray-100 text-gray-700"
        }`}>
          {task.status}
        </span>
      </td>
      
      <td className="py-4 px-6">
        <span className={`px-2 py-1 rounded text-xs font-bold ${
          task.priority === "High" ? "text-red-600 bg-red-50" :
          task.priority === "Medium" ? "text-yellow-600 bg-yellow-50" :
          "text-green-600 bg-green-50"
        }`}>
          {task.priority}
        </span>
      </td>
      
      <td className="py-4 px-6 text-gray-600">{task.assignTo?.name || "Unassigned"}</td>
      
      <td className="py-4 px-6 space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {user?.role !== 'Employee' && (
          <>
            <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">Edit</button>
            <button onClick={() => handleDelete(task._id)} className="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
          </>
        )}
        {user?.role === 'Employee' && (
          <span className="text-sm text-gray-400">No actions</span>
        )}
      </td>
    </tr>
  );
};

export default TaskRow;
