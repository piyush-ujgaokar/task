import {useEffect,useState} from "react"

import {getDashboardData} from "../services/dashboard.api"

const useDashboard = () => {

  const [status, setStatus] =useState(null)
  const [loading, setLoading] =useState(true)

  useEffect(() => {

    const fetchStatus =async () => {

        try {
          const data =await getDashboardData()
          setStatus(data)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
        }
      }

    fetchStatus()

  }, [])

  return {status,loading}
}

export default useDashboard