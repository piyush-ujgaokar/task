import { useEffect, useState } from "react"
import useDashboard from "../hooks/useDashboard"
import DashboardLayout from "../layouts/DashboardLayout"
import StatsCard from "../components/StatsCard"
import { getTasks } from "../../tasks/services/tasks.api"
import { Link } from "react-router-dom"

const AdminDashboard = () => {
  const {status, loading} = useDashboard()
  const [tasks, setTasks] = useState([])
  const [tasksLoading, setTasksLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    const fetch = async () => {
      setTasksLoading(true)
      try {
        const res = await getTasks()
        if (mounted) setTasks(res.tasks || [])
      } catch (err) {
        console.error('Error fetching dashboard tasks:', err)
      } finally {
        if (mounted) setTasksLoading(false)
      }
    }

    fetch()
    return () => { mounted = false }
  }, [])

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
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard title="Managers" value={status?.totalManagers || 0} />
          <StatsCard title="Employees" value={status?.totalEmployees || 0} />
          <StatsCard title="Assigned Tasks" value={status?.totalTasks || 0} />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">My Tasks</h2>
          <div className="bg-white rounded-lg shadow p-4">
            {/** show loading / empty / list */}
            {tasksLoading ? (
              <div className="text-center py-8">Loading tasks...</div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-8">No tasks found</div>
            ) : (
              <ul className="space-y-3">
                {tasks.map((t) => (
                  <li key={t._id} className="flex justify-between items-center">
                    <Link to={`/tasks/${t._id}`} className="text-indigo-600 hover:underline">{t.title}</Link>
                    <span className="text-sm text-gray-500">{t.priority} • {new Date(t.dueDate).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard