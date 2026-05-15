import DashboardLayout from "../../dashboard/layouts/DashboardLayout";
import useTasks from "../hooks/useTasks";
import TaskTable from "../components/TaskTable";

const TasksPage = () => {
  const { tasks, loading, handleDelete } = useTasks();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl mb-5">Tasks</h1>

      <TaskTable tasks={tasks} handleDelete={handleDelete} />
    </DashboardLayout>
  );
};

export default TasksPage;
