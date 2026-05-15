import DashboardLayout from "../../dashboard/layouts/DashboardLayout";
import useTasks from "../hooks/useTasks";
import TaskTable from "../components/TaskTable";

const TasksPage = () => {
  const { tasks, loading, handleDelete } = useTasks();

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
      <div className="animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Tasks</h1>

        <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-white/40 overflow-hidden">
          <TaskTable tasks={tasks} handleDelete={handleDelete} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TasksPage;
