import DashboardLayout from "../../dashboard/layouts/DashboardLayout";

import CreateUserForm from "../components/CreateUserForm";

const CreateUserPage = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl mb-5">Create User</h1>

      <CreateUserForm />
    </DashboardLayout>
  );
};

export default CreateUserPage;
