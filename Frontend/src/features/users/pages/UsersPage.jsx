import DashboardLayout from "../../dashboard/layouts/DashboardLayout";
import useUsers from "../hooks/useUsers";
import UserTable from "../components/UserTable";

const UsersPage = () => {
  const { users, loading, handleDelete } = useUsers();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">Users</h1>
      </div>

      <UserTable users={users} handleDelete={handleDelete} />
    </DashboardLayout>
  );
};

export default UsersPage;
