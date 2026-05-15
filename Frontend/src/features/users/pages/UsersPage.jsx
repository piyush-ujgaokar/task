import DashboardLayout from "../../dashboard/layouts/DashboardLayout";
import useUsers from "../hooks/useUsers";
import UserTable from "../components/UserTable";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const { users, loading, handleDelete } = useUsers();

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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Users</h1>
          <Link to="/users/create" className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300">
            + New User
          </Link>
        </div>

        <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl border border-white/40 overflow-hidden">
          <UserTable users={users} handleDelete={handleDelete} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UsersPage;
