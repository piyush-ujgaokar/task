import { useEffect, useState } from "react"
import useDashboard from "../hooks/useDashboard"
import DashboardLayout from "../layouts/DashboardLayout"
import StatsCard from "../components/StatsCard"
import { getUsers } from "../../users/services/users.api"

import { Link } from "react-router-dom"

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

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Organization Chart</h2>
          <div className="bg-white rounded-lg shadow p-4">
            <OrgChart />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default SuperAdminDashboard

function OrgChart(){
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
        console.error('Error fetching users for org chart', err)
      }finally{ if(mounted) setLoading(false) }
    }
    fetch()
    return ()=> mounted = false
  },[])

  if(loading) return <div className="text-center py-6">Loading org chart...</div>

  // build map
  const byId = new Map(users.map(u=>[u._id, u]))
  const admins = users.filter(u=>u.role==='Admin')

  return (
    <div>
      {admins.map(admin=> (
        <div key={admin._id} className="mb-4">
          <div className="font-semibold">Admin: {admin.name} ({admin.email})</div>
          <div className="ml-4 mt-2">
            {users.filter(u=>u.reportsTo===admin._id).map(manager=> (
              <div key={manager._id} className="mb-2">
                <div className="font-medium">Manager: {manager.name}</div>
                <div className="ml-4 text-sm text-gray-600">
                  {users.filter(u=>u.reportsTo===manager._id).map(emp=> (
                    <div key={emp._id}>{emp.name} — {emp.role}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-4">
        <Link to="/users" className="text-indigo-600 hover:underline">Manage users</Link>
      </div>
    </div>
  )
}