import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../dashboard/layouts/DashboardLayout";
import TaskHistory from "../components/TaskHistory";
import useTaskDetails from "../hooks/useTaskDetails";

const TaskDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { task, logs, loading } = useTaskDetails(id);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-3xl font-extrabold text-gray-800">Task Details</h1>
        </div>

        {/* TASK DETAILS */}
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-white/40">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{task?.title}</h2>
              <p className="text-gray-600 leading-relaxed">{task?.description}</p>
            </div>
            <span className={`px-4 py-1 rounded-full text-sm font-semibold ${
              task?.status === "Done" || task?.status === "Closed" ? "bg-green-100 text-green-700" :
              task?.status === "In Progress" ? "bg-blue-100 text-blue-700" :
              "bg-gray-100 text-gray-700"
            }`}>
              {task?.status}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
            <div>
              <p className="text-sm text-gray-500 mb-1">Priority</p>
              <p className={`font-semibold ${
                task?.priority === "High" ? "text-red-600" :
                task?.priority === "Medium" ? "text-yellow-600" :
                "text-green-600"
              }`}>{task?.priority}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Assigned To</p>
              <p className="font-semibold text-gray-800">{task?.assignedTo?.name || "Unassigned"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Created By</p>
              <p className="font-semibold text-gray-800">{task?.assignedBy?.name || "Unknown"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Due Date</p>
              <p className="font-semibold text-gray-800">
                {task?.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No date"}
              </p>
            </div>
          </div>
        </div>

        {/* TASK HISTORY */}
        <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 border border-white/40">
          <h2 className="text-xl font-bold mb-6 text-gray-800">Activity History</h2>
          <TaskHistory logs={logs} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TaskDetailsPage;
