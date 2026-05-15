import { useEffect, useState } from "react"
import useDashboard from "../hooks/useDashboard"
import DashboardLayout from "../layouts/DashboardLayout"
import StatsCard from "../components/StatsCard"
import { getUsers } from "../../users/services/users.api"
import { Link } from "react-router-dom"

const ManagerDashboard = () => {
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
          Manager Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatsCard title="Team Members" value={status?.teamMembers || 0} />
          <StatsCard title="Active Tasks" value={status?.activeTasks || 0} />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">My Team</h2>
          <div className="bg-white rounded-lg shadow p-4">
            <TeamList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManagerDashboard

function TeamList(){
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    const fetch = async ()=>{
      setLoading(true)
      try{
        const res = await getUsers()
        if(mounted) setUsers(res.users || [])
      }catch(err){
        console.error('Error fetching team members', err)
      }finally{ if(mounted) setLoading(false) }
    }
    fetch()
    return ()=> mounted = false
  },[])

  if(loading) return <div className="text-center py-6">Loading team...</div>
  if(users.length===0) return <div className="text-center py-6">No team members found</div>

  return (
    <ul className="space-y-3">
      {users.map(u=> (
        <li key={u._id} className="flex justify-between items-center">
          <div>
            <div className="font-medium">{u.name}</div>
            <div className="text-sm text-gray-500">{u.email}</div>
          </div>
          <div>
            <Link to={`/tasks/create?assignedTo=${u._id}`} className="px-3 py-1 bg-indigo-600 text-white rounded">Assign Task</Link>
          </div>
        </li>
      ))}
    </ul>
  )
}