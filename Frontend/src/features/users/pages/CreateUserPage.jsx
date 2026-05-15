import DashboardLayout from "../../dashboard/layouts/DashboardLayout";
import CreateUserForm from "../components/CreateUserForm";

const CreateUserPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto animate-fadeIn">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">Create New User</h1>
          <p className="text-gray-500 mt-2">Add a new user to your organization hierarchy</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-8 border border-white/40">
          <CreateUserForm />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateUserPage;
