import { useEffect, useState } from "react"
import useDashboard from "../hooks/useDashboard"
import DashboardLayout from "../layouts/DashboardLayout"
import StatsCard from "../components/StatsCard"
import { getTasks, updateTask } from "../../tasks/services/tasks.api"

import { Link } from "react-router-dom"

const EmployeeDashboard = () => {
  const {status, loading} = useDashboard()
  const [numTasks, setNumTasks] = useState(status?.myTasks || 0)
  const [numCompleted, setNumCompleted] = useState(status?.completedTasks || 0)

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
          Employee Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatsCard title={`My Tasks`} value={numTasks ?? (status?.myTasks || 0)} />
          <StatsCard title={`Completed`} value={numCompleted ?? (status?.completedTasks || 0)} />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Assigned Tasks</h2>
          <div className="bg-white rounded-lg shadow p-4">
            <EmployeeTasks onCountsChange={(tasks) => {
              const total = tasks.length
              const completed = tasks.filter(t => t.status === 'Done').length
              setNumTasks(total)
              setNumCompleted(completed)
            }} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default EmployeeDashboard

function EmployeeTasks({ onCountsChange }){
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    let mounted = true
    const fetch = async () => {
      setLoading(true)
      try{
        const res = await getTasks()
        if(mounted) {
          const list = res.tasks || []
          setTasks(list)
          if(onCountsChange) onCountsChange(list)
        }
      }catch(err){
        console.error('Error fetching employee tasks', err)
      }finally{
        if(mounted) setLoading(false)
      }
    }
    fetch()
    return ()=>{ mounted = false }
  },[])

  const changeStatus = async (id, newStatus) => {
    try{
      await updateTask(id, { status: newStatus })
      const res = await getTasks()
      const list = res.tasks || []
      setTasks(list)
      if(onCountsChange) onCountsChange(list)
    }catch(err){
      console.error('Error updating status', err)
    }
  }

  if(loading) return <div className="text-center py-8">Loading tasks...</div>
  if(tasks.length===0) return <div className="text-center py-8">No tasks assigned</div>

  return (
    <ul className="space-y-3">
      {tasks.map(t=> (
        <li key={t._id} className="flex justify-between items-center">
          <div>
            <Link to={`/tasks/${t._id}`} className="text-indigo-600 hover:underline font-medium">{t.title}</Link>
            <div className="text-sm text-gray-500">{t.description}</div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{t.status}</span>
            {t.status !== 'In Progress' && <button onClick={()=>changeStatus(t._id,'In Progress')} className="px-3 py-1 bg-blue-50 text-blue-600 rounded">Start</button>}
            {t.status !== 'Done' && <button onClick={()=>changeStatus(t._id,'Done')} className="px-3 py-1 bg-green-50 text-green-600 rounded">Complete</button>}
          </div>
        </li>
      ))}
    </ul>
  )
}