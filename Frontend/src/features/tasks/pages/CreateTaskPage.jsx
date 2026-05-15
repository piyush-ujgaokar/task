import DashboardLayout from "../../dashboard/layouts/DashboardLayout";
import CreateTaskForm from "../components/CreateTaskForm";

const CreateTaskPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto animate-fadeIn">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">Create New Task</h1>
          <p className="text-gray-500 mt-2">Fill in the details below to assign a new task</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/40">
          <CreateTaskForm />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTaskPage;
