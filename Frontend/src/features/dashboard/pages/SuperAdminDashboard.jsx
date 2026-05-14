import useDashboard from "../hooks/useDashboard"
import DashboardLayout from "../layouts/DashboardLayout"

const SuperAdminDashboard = () => {

  const {status,loading} = useDashboard()

  if(loading) {
    return <h1>Loading...</h1>
  }

  return (

    <DashboardLayout>
      <h1>
        Super Admin Dashboard
      </h1>

      <h2>
        Total Users:
        {status.totalUsers}
      </h2>

      <h2>
        Total Tasks:
        {status.totalTasks}
      </h2>

    </DashboardLayout>
  )
}

export default SuperAdminDashboard