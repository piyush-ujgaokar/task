import useDashboard from "../hooks/useDashboard"
import DashboardLayout from "../layouts/DashboardLayout"
import StatsCard from "../components/StatsCard"

const SuperAdminDashboard = () => {
  const {status, loading} = useDashboard()

  if(loading) {
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
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Super Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard title="Total Users" value={status?.totalUsers || 0} />
          <StatsCard title="Total Tasks" value={status?.totalTasks || 0} />
          <StatsCard title="Completed Tasks" value={status?.completedTasks || 0} />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default SuperAdminDashboard