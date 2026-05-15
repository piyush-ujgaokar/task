import DashboardLayout from "../../dashboard/layouts/DashboardLayout";

import CreateTaskForm from "../components/CreateTaskForm";

const CreateTaskPage = () => {
  return (
    <DashboardLayout>
      <div className="mb-5">
        <h1 className="text-3xl font-bold">Create Task</h1>
      </div>

      <CreateTaskForm />
    </DashboardLayout>
  );
};

export default CreateTaskPage;
