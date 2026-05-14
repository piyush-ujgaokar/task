import {useEffect,useState} from "react"

import {getDashboardStatus} from "../services/dashboard.api"

const useDashboard = () => {

  const [status, setStatus] =useState(null)
  const [loading, setLoading] =useState(true)

  useEffect(() => {

    const fetchStatus =async () => {

        try {
          const data =await getDashboardStatus()
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