import {Link} from "react-router-dom"

import { useAuth }from "../../auth/hooks/useAuth"

const Sidebar = () => {
  const { user } = useAuth()

  return (
    <div className="w-64 h-screen bg-black text-white p-5">
      <h1 className="text-2xl font-bold mb-10">
        Dashboard
      </h1>

      {/* ROLE BASED LINKS */}

      {user?.role ==="Super Admin" && (
          <>
            <Link to="/super-admin">Home</Link>
            <br />

            <Link to="/users">Manage Users</Link>
            <br />

            <Link to="/tasks">Manage Tasks</Link>
          </>
        )
      }

      {user?.role === "Manager" && (
          <>
            <Link to="/manager">Team</Link>
            <br />

            <Link to="/tasks">Tasks</Link>
          </>
        )
      }

    </div>
  )
}

export default Sidebar