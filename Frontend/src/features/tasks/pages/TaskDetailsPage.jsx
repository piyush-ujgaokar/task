import { useParams } from "react-router";
import DashboardLayout from "../../dashboard/layouts/DashboardLayout";
import TaskHistory from "../components/TaskHistory";
import useTaskDetails from "../hooks/useTaskDetails";

const TaskDetailsPage = () => {
  const { id } = useParams();
  const { task, logs, loading } = useTaskDetails(id);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <DashboardLayout>
      <div className="space-y-5">
        {/* TASK DETAILS */}

        <div className="border p-5 rounded">
          <h1 className="text-3xl font-bold">{task?.title}</h1>
          <p className="mt-3">{task?.description}</p>
          <p className="mt-3">Status:{task?.status}</p>
          <p>Priority:{task?.priority}</p>
          <p>Assigned To:{task?.assignedTo?.name}</p>
        </div>

        {/* TASK HISTORY */}

        <div>
          <h2 className="text-2xl font-bold mb-3">Task History</h2>
          <TaskHistory logs={logs} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TaskDetailsPage;
