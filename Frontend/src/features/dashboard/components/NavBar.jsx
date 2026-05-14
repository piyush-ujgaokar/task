import { useAuth } from "../../auth/hooks/useAuth"

const Navbar = () => {
  const {user, handleLogout} = useAuth()

  return (

    <div className="flex justify-between items-center p-5 shadow">
      <h1>Welcome {user?.name}</h1>

      <button onClick={handleLogout} >
        Logout
      </button>
    </div>
  )
}

export default Navbar